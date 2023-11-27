const { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } = require("@solana/web3.js");
const bs58 = require("bs58");

//填入你的私钥，此脚本不会窃取你的私钥，但你仍要注意安全
var secret = " "
const keypair = Keypair.fromSecretKey(
  bs58.decode(secret)
);

//如果出现卡顿/链接失败，请尝试更换rpc（详见README.md）
const QUICKNODE_RPC = 'https://solana-mainnet.phantom.app/YBPpkkN4g91xDiAnTE9r0RcMkjg0sKUIWvAfoFVJ';
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);


async function logMemo(message) {
  try {
    let tx = new Transaction();
    await tx.add(
      new TransactionInstruction({
        keys: [{ pubkey: keypair.publicKey, isSigner: true, isWritable: true }],
        data: Buffer.from(message, "utf-8"),
        programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
      })
    )
    let result = await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [keypair]);
    console.log("Hash:", result);
    return result;
  } catch (error) {
    console.error("Error in logMemo:", error.message);
  }
}

//填入目标json
var data = `{"p":"src-20","op":"mint","tick":"sols","amt":"1000"}`
//填入要打的数量
var mintCount = 10
for (i = 0; i < mintCount; i++) {
  logMemo(data)
}

