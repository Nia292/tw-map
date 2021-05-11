const fs = require('fs');

const datafilePath = "./../public/data.json"
const markdownFilePath = "./bossloot.md"
const additionalItemsFilePath = "./additional-items.json"


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
function parseMarkdown(markdownContent ) {
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

/**
 * Reads a markdown file and merges it's loot data into the datafile path
 */
function reBuildItemDatabase() {
    const datafile = fs.readFileSync(datafilePath);
    const database = JSON.parse(datafile.toString("UTF-8"));

    // First initialize database with additional-items.json
    database.items = JSON.parse(fs.readFileSync(additionalItemsFilePath).toString("UTF-8"));

    // Read the bossloot.md
    const markdownFileContent = fs.readFileSync(markdownFilePath).toString("UTF-8");
    const bossToLoot = parseMarkdown(markdownFileContent);

    // Now iterate through the loot table to add it to the data file
    const keys = Object.keys(bossToLoot);
    keys.forEach(boss => mergeAllBossLootIntoDatafile(database.items, boss, bossToLoot[boss]))

    const databaseJSON = JSON.stringify(database);
    fs.writeFileSync(datafilePath, databaseJSON, {encoding: "UTF-8"});

}

reBuildItemDatabase();
