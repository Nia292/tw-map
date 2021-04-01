/**
 * A Conan Exiles coordinate.
 *
 * If converting from // TeleportPlayer, the coordinates are x, y and z.
 * So:
 * // TeleportPlayer x y z
 */
export interface ThrallLocation {
    x: number;
    y: number;
    z: number;
    // Spawns in place of which thrall type?
    spawnSpot?: string;
    // Name of the general area
    location?: string;
}
