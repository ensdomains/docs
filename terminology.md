# Terminology

* _Controller_: The account that may edit the records of a name. The Controller may be changed by the Registrant or Controller.
* _Label_: An individual component of a name, such as 'alice'.
* _Labelhash_: The keccak256 hash of an individual label.
* _Name_: An ENS identifier such as 'alice.eth'. Names may consist of multiple parts, called labels, separated by dots.
* _Namehash_: The algorithm used to process an ENS name and return a cryptographic hash uniquely identifying that name. Namehash takes a name as input and produces a _node_.
* _Node_: A cryptographic hash uniquely identifying a name.
* _Owner_: The owner of a name is the entity referenced in the ENS registry's owner field. An owner may transfer ownership, set a resolver or TTL, and create or reassign subdomains.
* _Registrar_: A registrar is a contract responsible for allocating subdomains. Registrars can be configured at any level of ENS, and are pointed to by the owner field of the registry.
* _Registration_: A registration is a registrar's record of a user's ownership of a name. This is distinct from the owner field in the Registry; registrations are maintained in the registrar contract and additionally store information on expiry date, fees paid, etc.
* _Registrant_: The owner of a registration. The registrant may transfer the registration, set the Controller, and reclaim ownership of the name in the registry if required.
* _Registry_: The core contract of ENS, the registry maintains a mapping from domain name (at any level - x, y.x, z.y.x etc) to owner, resolver, and time-to-live.
* _Resolver_: A resolver is a contract that maps from name to the resource (e.g., cryptocurrency addresses, content hash, etc). Resolvers are pointed to by the resolver field of the registry.
