const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", () => {

  it("Set string ipfsHash", async () => {
    const simpleStorage = await SimpleStorage.deployed()
    await simpleStorage.set("QmVGcdXpPnibuN5i7Eje7agGwXKsRUefLc3p8zSJXfUrDQ")
    const result = await simpleStorage.get();
    assert(result == "QmVGcdXpPnibuN5i7Eje7agGwXKsRUefLc3p8zSJXfUrDQ")

  });

});
