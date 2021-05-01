export type MapItemSource = 'CUSTOM_LOOT' | 'MINE' | 'BOSS_LOOT' | 'THRALL_CRAFT' | 'TW_MERCHANT';

export interface MapItem {
    name: string;
    source: MapItemSource[];
}
