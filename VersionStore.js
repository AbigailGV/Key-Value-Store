class VersionStore{
    constructor(){
        // values with versions
        this.store = new Map();
        this.version = 0;
    }

    put(key, value){
        this.version++;
        // if there´s no key
        if(!this.store.has(key)){
            this.store.set(key, []);
        }
        const entry = {version: this.version, value: value};
        this.store.get(key).push(entry);
        // PUT(#1) key1 = value
        return `PUT(#${this.version}) ${key} = ${value}`;
    }

    get(key){
        // if there´s no key
        if(!this.store.has(key)){
            // GET key4 = <NULL>
            return `GET ${key} = <NULL>`;
        }
        // track of keys
        const history = this.store.get(key);
        const latest = history[history.length -1];

        // GET key4 = value
        return `GET ${key} = ${latest.value}`;
    }

    getVersion(key, version){
        // if there´s no key
        if(!this.store.has(key)){
            // GET key2(#2)= <NULL>
            return `GET ${key}(#${version}) = <NULL>`;
        }
        const targetVersion = parseInt(version, 10)
        const history = this.store.get(key);

        // binary search
        let left = 0;
        let right = history.length -1;
        let resultIndex = -1;

        // search for target version
        while(left <= right){
            const mid = Math.floor((left + right) / 2);
            const currentVersion = history[mid].version;

            // is it the target version?
            if(currentVersion === targetVersion){
                resultIndex = mid;
                break;
            }else if(currentVersion < targetVersion){
                resultIndex = mid;
                left = mid + 1;
            }else{
                right = mid - 1;
            }
        } 
        // if didn´t find it
        if(resultIndex === -1){
            // GET key2(#2)= <NULL>
            return `GET ${key}(#${version}) = <NULL>`;
        }else{
            // GET key2(#2)= value
            return `GET ${key}(#${version}) = ${history[resultIndex].value}`;
        }
    }
}
/*
const store = new VersionStore();
console.log(store.put("key1", 5));
console.log(store.put("key2", 6));
console.log(store.get("key1"));
console.log(store.getVersion("key1", "1"));
console.log(store.getVersion("key2", "2"));
console.log(store.put("key1", 7));
console.log(store.getVersion("key1", "1"));
console.log(store.getVersion("key1", "2"));
console.log(store.getVersion("key1", "3"));
console.log(store.get("key4"));
console.log(store.getVersion("key1", "4"));
console.log(store.getVersion("key2", "1")); 
*/
