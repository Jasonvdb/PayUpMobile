import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
require('dotenv').config({ path: './jest/.env' })

jest.setTimeout(30000);
Enzyme.configure({ adapter: new Adapter() });

