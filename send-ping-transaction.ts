import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl, Connection, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } from "@solana/web3.js";

const PING_PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PING_PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

const main = async () => {
    try {
        const payer = getKeypairFromEnvironment("SECRET_KEY");
        const connection = new Connection(clusterApiUrl("devnet"));
        const transaction = new Transaction();
        const programId = new PublicKey(PING_PROGRAM_ADDRESS);
        const programDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS);
        const instructions = new TransactionInstruction({
            programId,
            keys: [
                {
                    pubkey: programDataId,
                    isSigner: false,
                    isWritable: true
                }
            ]
        });
        transaction.add(instructions);
        const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);
        console.log(signature, "signature");
    } catch (err) {
        console.log(err.message);
    }
};

main()