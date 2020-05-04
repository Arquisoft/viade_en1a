import {cleanup} from "react-testing-library";
import {getFriendGroups, addFriendToGroup, inflateGroups, deleteFriendToGroup} from "../modules/groupsHandler";
import {start} from "molid";
import "jest-dom/extend-expect";

afterAll(cleanup);
describe.only("Using molid", () => {
    let molid;
    beforeAll(async () => {
        molid = await start({
            dataDir: "./.molid",
        });
    });

    afterAll(async () => {
        await molid.stop();
    });

    test("test getFriendGroups", () => {
        getFriendGroups().then((r) => expect(r.length()).toBe(0));
    });

    test("test addFriendToGroup", () => {
        addFriendToGroup("https://uo236405.inrupt.net/profile/card#me").then(
            inflateGroups().then((r) => {
                expect(r["default"].length).toBe(1);
            })
        );
    });

    test("test deleteFriendToGroup", () => {
        deleteFriendToGroup("https://uo236405.inrupt.net/profile/card#me").then(
            inflateGroups().then((r) => {
                expect(r["default"].length).toBe(0);
            })
        );
    });

    test("test inflateGroups", () => {
        inflateGroups().then((r) => {
            expect(r["default"].length).toBe(0);
        });
    });

});