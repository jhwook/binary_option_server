const getobjtype=object=>{
    var stringConstructor = "test".constructor;
    var arrayConstructor = [].constructor;
    var objectConstructor = ({}).constructor;
    if (object === null) {
        return "null";
    }
    if (object === undefined) {      
      return "undefined";
    }
    if (object.constructor === stringConstructor) {      
      return "String";
    }
    if (object.constructor === arrayConstructor) {      
      return "Array";
    }
    if (object.constructor === objectConstructor) {      
      return "Object";
    }
    return null ;
  }
const { v4: uuidv4, v5: uuidv5 } = require("uuid");
const create_uuid_via_namespace = (str) => uuidv5(str, Array.from(Array(16).keys()));

const convaj = (arr, keyname, valuename) => {
  let jdata = {};
  arr.forEach((elem) => {
    jdata[elem[keyname]] = elem[valuename];
  });
  return jdata;
};

async function generaterefcode(uid, i = 0) {
  let code = String(crypto.createHash('md5').update(uid).digest('hex')).slice(
    i,
    i + 10
  );
  console.log(code);
	return code
/**  let findOne = await db['users'].findOne({ where: { referercode: code } });
  if (findOne) {
    console.log(i);
    return generateRefCode(uid, ++i);
  } else {
    return code;
  } */
}

  module.exports={
    getobjtype 
	, create_uuid_via_namespace 
	, convaj
	, generaterefcode
  }


