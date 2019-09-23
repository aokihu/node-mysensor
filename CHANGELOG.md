CHANGELOG
---------

# 2.1.10
- Fixed `send` function, it concat message error;

> BEFORE: send message: nodeID;childID;command;type;ack;payload
>
> AFTER:  send message: nodeID;childID;command:ack;type:payload

# 2.1.11

- Add `ENUM` MysensorACK

> MysensorAck.NO = 0;
>
> MysensorAck.YES = 0;