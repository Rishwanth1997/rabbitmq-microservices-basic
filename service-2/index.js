const app = require("express")();
const amqp = require("amqplib");
let channel, connection;

const connect = async () => {
  try {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("rabbit");

    channel.consume("rabbit", data => {
        console.log(data.content,"content")
        console.log(`${Buffer.from(data.content)}`,"yess");
        channel.ack(data);
    })
  } catch (error) {
    console.log(error);
  }
};
connect();

app.listen(5001, () => {
  console.log("server is running at 5001");
});
