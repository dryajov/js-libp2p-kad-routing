'use strict'

module.exports = `// can't use, because protocol-buffers doesn't support imports
// so we have to duplicate for now :(
// import "record.proto";

message Record {
  optional string key = 1;
  optional bytes value = 2;
  optional bytes author = 3;
  optional bytes signature = 4;
  optional string timeReceived = 5;
}

message Message {
  enum MessageType {
    PUT_VALUE = 0;
    GET_VALUE = 1;
    ADD_PROVIDER = 2;
    GET_PROVIDERS = 3;
    FIND_NODE = 4;
    PING = 5;
  }

  enum ConnectionType {
    // sender does not have a connection to peer, and no extra information (default)
    NOT_CONNECTED = 0;

    // sender has a live connection to peer
    CONNECTED = 1;

    // sender recently connected to peer
    CAN_CONNECT = 2;

    // sender recently tried to connect to peer repeatedly but failed to connect
    // ("try" here is loose, but this should signal "made strong effort, failed")
    CANNOT_CONNECT = 3;
  }

  message Peer {
    // ID of a given peer.
    optional string id = 1;

    // multiaddrs for a given peer
    repeated bytes addrs = 2;

    // used to signal the sender's connection capabilities to the peer
    optional ConnectionType connection = 3;
  }

  // defines what type of message it is.
  optional MessageType type = 1;

  // defines what coral cluster level this query/response belongs to.
  optional int32 clusterLevelRaw = 10;

  // Used to specify the key associated with this message.
  // PUT_VALUE, GET_VALUE, ADD_PROVIDER, GET_PROVIDERS
  optional string key = 2;

  // Used to return a value
  // PUT_VALUE, GET_VALUE
  optional Record record = 3;

  // Used to return peers closer to a key in a query
  // GET_VALUE, GET_PROVIDERS, FIND_NODE
  repeated Peer closerPeers = 8;

  // Used to return Providers
  // GET_VALUE, ADD_PROVIDER, GET_PROVIDERS
  repeated Peer providerPeers = 9;
}`
