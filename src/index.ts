import {Grade, Student} from "./classes";

import {mainMenu} from "./menus";
import { populateData } from "./fileHandling";

async function start()
{     
    await populateData();
    mainMenu();
}
start();

module.exports = {student:Student,grade:Grade};