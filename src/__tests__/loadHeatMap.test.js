import loadHeatMap from "../modules/loadHeatMap";

test("test loadHeatMap.js", () => {
    const heatMapData = loadHeatMap();
    expect(heatMapData.length).toBe(537);
});