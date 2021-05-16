const fs = require('fs');

const datafilePath = "./../public/data.json"
const markdownFilePath = "./bossloot.md"
const additionalItemsFilePath = "./additional-items.json"
const craftDataFilePath = "./craft_data.xml"


/**
 * Makes sure that an array contains the defined item, adding it if neccessary
 * @param arrayOrUndefined {Array<any> | undefined}
 * @param item {any}
 */
function ensureArrayContains(arrayOrUndefined, item) {
    if (!arrayOrUndefined) {
        return [item]
    }
    const containsItem = arrayOrUndefined.indexOf(item) >= 0;
    if (!containsItem) {
        return [...arrayOrUndefined, item];
    }
    return arrayOrUndefined;
}

/**
 * @param{string} line
 */
function getBoss(line) {
    if (line.trim().startsWith("#")) {
        return line.substr(1, line.length).trim();
    }
    return undefined;
}

/**
 * @param{string} markdownContent
 */
function parseMarkdown(markdownContent) {
    const resObj = {};
    const lines = markdownContent.split("\n")
        .map(value => value.trim())
        .filter(value => value !== "")
    console.log(lines)
    let currentBoss = "";
    for (const line of lines) {
        console.log(line);
        const bossName = getBoss(line);
        if (bossName) {
            // Initialize the result array.
            resObj[bossName] = [];
            currentBoss = bossName;
        } else if (currentBoss) {
            resObj[currentBoss].push(line.trim());
        }
    }
    return resObj;
}

/**
 *
 * @param data {Array<Object<{name: string, source: Array<string>, sourceBoss: Array<string>, sourceText: string}>>}
 * @param boss {string}
 * @param item {string}
 */
function mergeOneItemIntoDatafile(data, boss, item) {
    // Find item in data list
    const lootItem = data.find(value => value.name === item);
    if (lootItem) {
        // Item exists
        // Make sure the arrays exists
        if (!lootItem.source) {
            lootItem.source = [];
        }
        if (!lootItem.sourceBoss) {
            lootItem.sourceBoss = [];
        }
        // Make sure source contains BOSS_LOOT
        const containsBossLoot = lootItem.source.indexOf("BOSS_LOOT") >= 0;
        if (!containsBossLoot) {
            lootItem.source.push("BOSS_LOOT")
        }
        // Make sure the boss is in the sourceBoss area
        const containsBoss = lootItem.sourceBoss.indexOf(boss) >= 0;
        if (!containsBoss) {
            lootItem.sourceBoss.push(boss)
        }
    } else {
        data.push({
            name: item,
            source: ["BOSS_LOOT"],
            sourceBoss: [boss],
            sourceText: "Can be looted from the boss(es) mentioned above."
        })
    }
}

/**
 *
 * @param data {Array<Object<{name: string, source: Array<string>, sourceBoss: Array<string>, sourceText: string}>>}
 * @param boss {string}
 * @param loot {Array<string>}
 */
function mergeAllBossLootIntoDatafile(data, boss, loot) {
    loot.forEach(value => mergeOneItemIntoDatafile(data, boss, value));
}

const thrallNameToId = {
    'Gabriela': 'Gabriela the Alchemist',
    'Ivar the crafty one': 'Ivar the Crafty One'
}

const stationToStationName = {
    'cauldron': 'Firebowl Cauldron',
    'blacksmith': 'Blacksmith Bench',
}

/**
 *
 * @param data {Array<{name: string, source: Array<string>, sourceThrall: Array<string>, sourceText: string}>}
 * @param item {{itemName: string, thrallName: string, stationName: string}}
 */
function mergeCraftItemIntoData(data, item) {
    // Find item in data list
    const dataItem = data.find(value => value.name === item.itemName);
    console.log("item", item.stationName);
    if (dataItem) {
        dataItem.source = ensureArrayContains(dataItem.source, "THRALL_CRAFT");
        dataItem.sourceThrall = ensureArrayContains(dataItem.sourceThrall, item.thrallName);
    } else {
        // Simplest case. Item was not yet added, create a new one!
        data.push({
            name: item.itemName,
            source: ["THRALL_CRAFT"],
            sourceThrall: [item.thrallName],
            sourceText: "This item can be crafted by one of the Thrall Wars thralls.",
            sourceStation: stationToStationName[item.stationName]
        })
    }
}


/**
 *
 * @param data {Array<{name: string, source: Array<string>, sourceThrall: Array<string>, sourceText: string}>}
 * @param craftItems {Array<{itemName: string, thrallName: string, stationName: string}>}
 */
function mergeCraftItemsIntoData(data, craftItems) {
    return craftItems.forEach(value => mergeCraftItemIntoData(data, value))
}

async function parseCraftData() {
    const xmlContent = fs.readFileSync(craftDataFilePath).toString("UTF-8");
    const data = await require('xml2js').parseStringPromise(xmlContent);

    const translateNameToId = (name) => {
        const id = thrallNameToId[name];
        if (!id) {
            throw new Error('No ID found for ' + name);
        }
        return id;
    }

    // The XML -> JSON conversion isn't perfect. To maje the object easier to handle, we'll remove redundant information
    // return is an array of flattened objects: [{thrallName, itemName, stationName}]
    return data.data.thrall.map(thrallEntry => {
        const thrallName = translateNameToId(thrallEntry.$.name);
        // station is an array of crafting stations.
        const stations = thrallEntry.station;
        return stations.map(stationEntry => {
            const stationName = stationEntry.$.name;
            return stationEntry.Item
                .map(itemEntry => itemEntry.$.name)
                .map(itemName => ({itemName, thrallName, stationName}));
        })
            .reduce((prev, curr) => [...prev, ...curr], [])
            .filter(entry => entry.itemName !== undefined)
    })
        .reduce((prev, curr) => [...prev, ...curr], [])
}

/**
 * Reads a markdown file and merges it's loot data into the datafile path
 */
async function reBuildItemDatabase() {
    const datafile = fs.readFileSync(datafilePath);
    const database = JSON.parse(datafile.toString("UTF-8"));

    // First initialize database with additional-items.json
    database.items = JSON.parse(fs.readFileSync(additionalItemsFilePath).toString("UTF-8"));

    // Read the bossloot.md
    const markdownFileContent = fs.readFileSync(markdownFilePath).toString("UTF-8");
    const bossToLoot = parseMarkdown(markdownFileContent);

    // Now iterate through the loot table to add it to the data file
    const keys = Object.keys(bossToLoot);
    keys.forEach(boss => mergeAllBossLootIntoDatafile(database.items, boss, bossToLoot[boss]));

    // Add craftable stuff to the database
    const craftData = await parseCraftData();
    mergeCraftItemsIntoData(database.items, craftData);

    const databaseJSON = JSON.stringify(database, 2, 2);
    fs.writeFileSync(datafilePath, databaseJSON, {encoding: "UTF-8"});

}

reBuildItemDatabase();
