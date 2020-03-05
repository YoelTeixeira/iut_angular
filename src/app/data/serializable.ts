/**
 * Created by fbm on 10/02/17.
 */


export class Serializable {

  fromJSON(json) {
    for (const propName in json) {
      if (json.hasOwnProperty(propName)) {
        this[propName] = json[propName];
      }
    }
    return this;
  }
}
