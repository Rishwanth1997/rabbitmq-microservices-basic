const app = require("express")();
const amqp = require("amqplib");
let channel, connection;

const connect = async () => {
  try {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("rabbit");
  } catch (error) {
    console.log(error);
  }
};

connect();

app.listen(5000, () => {
  console.log("server is running at 5000");
});

app.get("/send", async(req, res) => {
    const fakeData = {
        name: "Rishi",
        age: 25
    }
    await channel.sendToQueue("rabbit", Buffer.from(JSON.stringify(fakeData)));
    // await channel.close();
    // await connection.close();
    return res.send({"message": "done"})
});
