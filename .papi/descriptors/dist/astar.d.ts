import { StorageDescriptor, PlainDescriptor, TxDescriptor, RuntimeDescriptor, Enum, ApisFromDef, QueryFromPalletsDef, TxFromPalletsDef, EventsFromPalletsDef, ErrorsFromPalletsDef, ConstFromPalletsDef, ViewFnsFromPalletsDef, SS58String, FixedSizeBinary, Binary, FixedSizeArray } from "polkadot-api";
import { I5sesotjlssv2d, Iffmde3ekjedi9, I4mddgoa69c0a2, Ic6m8qjo445mpd, I95g6i7ilua7lq, Ieniouoqkq4icf, Phase, Ibgl04rn6nbfm6, I4ftk0glls7946, I910puuahutflf, I4nfjdef0ibh44, I74af64m08r6as, Ic8ann3kre6vdm, I1j72qfgdejqsv, I60biiepd74113, Iag146hmjgqfgj, I8uo3fpd3bcc6f, If9ch4n1qv5pmd, I9p9lq3rej5bhc, I8s1m5n387k6ho, I56u24ncejr5kt, I9jd27rnpm8ttv, I1v7jbnil3tjns, I8jgj1nhcr2dg8, Ifn6q3equiq9qi, Ia3sb0vgvovhtg, Iav8k1edbj86k7, Itom7fk49o0c9, I4i91h98n3cv1b, I4iumukclgj8ej, Iqnbvitf7a7l3, I6r5cbv8ttrb09, I4q39t5hn830vp, TransactionPaymentReleases, I1q8tnt1cluu5j, I8ds64oj6581v0, Ia7pdug7cdsg8g, Ieunmr2qhp2i5r, I2q9fuah4a3jol, Ifble4juuml5ig, Version, I7srid9ei8c9u4, I7tcevi26u67t9, I8phdsiu944qnt, Ifd5a3glv206mk, Iav11gpk2hk471, Iaj10rr82j0c8f, I9fikrhe4v1ucd, Ial7b1ao1svgpg, I48d4i9nskqi1t, Ie0insqitg6p08, Iu5bstpont1pd, Ibbe0vuef8idk, I9cb9bfe7mgkah, I9qkqq3bm9meai, I401ur5btmdhug, I6ugqeqscrtvjd, I3qklfjubrljqh, Iag3f1hum3p4c8, I96rqo4i9p11oo, I4s6jkha20aoh0, I6lsoh4c5um3u5, I78s05f59eoi8b, Iafqnechp3omqg, I3p18dmhknth6v, I7jk416ehc2eh1, I9055m3udr8982, I2m57u1h2te06, I4rgf5d3abfav5, Ia2lhg7l2hilo3, Ifi4da1gej1fri, I4ojmnsk1dchql, Ifvgo9568rpmqc, Icgljjb6j82uhn, I82jm9g7pufuel, Ic5m5lp1oioo8r, I6cs1itejju2vv, Ib77b0fp1a6mjr, I5g2vv0ckl2m8b, Ifup3lg9ro8a0f, I5qfubnuvrnqn6, I8t3u2dv73ahbd, I7vlvrrl2pnbgk, Ie0rpl5bahldfk, XcmPalletVersionMigrationStage, I7e5oaj2qi4kl1, Ie849h3gncgvok, Iat62vud7hlod2, Ict03eedr8de9s, XcmVersionedLocation, Idh2ug6ou4a8og, Iejeo53sea6n4q, I53esa2ms463bk, Ib4jhb8tt3uung, I7jidl7qnnq87c, I82cps8ng2jtug, Ifitc0q6ckjb3j, Idi27giun0mb9q, Idud3fdh64aqp9, Ie7atdsih6q14b, I4totqt881mlti, I5kulbesqc1h1t, I36dvimehsh2tm, I8t4pajubp34g3, PreimageOldRequestStatus, PreimageRequestStatus, I4pact7n2e9a0i, Iedia33gem7v9i, Ifvqn3ldat80ai, I99bb69usss9gs, I6mhebgj62g585, I3vhcedhm4hpvm, I526daka7j7b17, Ifanv2kvm586s4, I5rsgtofmn5lli, Idned7t7knml6b, I2itl2k1j2q8nf, Iegmj7n48sc3am, I6ouflveob4eli, Idkbvh6dahk1v7, Iepbsvlk3qceij, In7a38730s6qs, If15el53dd76v9, I9s0ave7t0vnrk, I4fo08joqmcqnm, If9iqq7i64mur8, Iasb8k6ash5mjn, Ijc5n210o8bbf, I3m5sq54sjdlso, I35p85j063s0il, I4arjljr6dpflb, I8ofcg5rbj0g2c, I4adgbll7gku4i, I6pjjpfvhvcfru, I9pj91mj79qekl, I39uah9nss64h9, Ik64dknsq7k08, Ib51vk42m1po4n, I6354v7vk6isdi, I212sfinbrq59j, I3m33kbl64q02r, Iac53udfpd9th9, Ic6cqd9g0t65v0, I2kds5jji7slh8, Ia9mkdf6l44shb, I9l2s4klu0831o, I2ctrt5nqb8o7c, I711qahikocb1c, I6o1er683vod1j, Id6gojh30v9ib2, Ide1bahhh47lj9, Id9uqtigc0il3v, Ic68lsi7chpv5k, Iek0boln8pgnko, I452bkd71b385t, Ie83f0p0ke1f4u, I93hi4ed10h5sc, Ie5l999tf7t2te, Idcr6u6361oad9, I5446n5co0ed1j, I4i1j1ndqab7g4, Ideaemvoneh309, I3d9o9d7epp66v, I6hjsnil65jnij, Ic6nou6182ifhl, I88pucb8kov85q, I6pj68nqoamrv3, I2eb501t8s6hsq, Ianmuoljk2sk1u, I1j96bgkijv0f7, Ie70svc64j0nnt, I5n4sebgkfr760, I23k0fcc4s93a8, Ifs1i5fk9cqvr6, I6pvj8ig4if6s7, Ic5eombv5ft85j, Ieg3fd8p4pkt10, I8kg5ll427kfqq, I467333262q1l9, I60v7bikk54tpu, Ifpj261e8s63m3, I4ktuaksf5i1gk, I9bqtpv2ii35mp, I9j7pagd6d4bda, I2h9pmio37r7fb, Ibmr18suc9ikh9, I9iq22t0burs89, I5u8olqbbvfnvf, I5utcetro501ir, Iaa2o6cgjdpdn5, Iam6hrl7ptd85l, Ict9ivhr2c5hv0, I8t4vv03357lk9, Icliq7k77rho5u, I8b3c98srssokg, I4qmlavafr3140, I94dejtmu6d72i, Iacbdote4b7l9k, I9ed9v9gosmuvf, Ibeb69neo60gk0, I1gnudop2p29el, I3qt1hgg4djhgb, I3sves7o9bnl87, Ibo4omgp8fpt5t, Id0smhn7t7eh6l, Icbccs0ug47ilf, I88tgaqco9fme4, Id8elld05mas9j, Iceqdqbv3mc6o0, Idutup0e9rh8so, I6do0sq1390ag, I4ov6e94l79mbg, Ieeuglrrm65jt2, I2ft0f2thgfe6s, I6ucaoml0igais, I1phnros9ogpsl, I5rkc9t64qoc30, I9645mveijv32q, Idod2koqj2eu8c, I87vll2k0a91o2, Iekaug5vo6n1jh, Ia8hsbfe3gjnab, Ibjm53301mul3h, I9ei5lgjti2qla, I54bd0s1iunkmg, I3mmhckdribrl0, Ib98qbv23c0tst, Iebdnbvufodnev, Icfnagtb704sfq, Ia5sp8108pom8q, I59bngqm85b22v, I4u4n2na1l5uo7, I3c63j6sh3evqn, I8k3rnvpeeh4hv, Ifccifqltb5obi, Iadtsfv699cq8b, Ialpmgmhr3gk5r, I7q6elfrnn8uq9, I4cbvqmqadhrea, I81vt5eq60l4b6, I3vh014cqgmrfd, Ia5cotcvi888ln, I21jsa919m88fd, Iegif7m3upfe1k, I9kt8c221c83ln, Ic76kfh5ebqkpl, Icscpmubum33bq, I21d2olof7eb60, Ibgm4rnf22lal1, Ie68np0vpihith, I9bnv6lu0crf1q, I6j92ua76m1ueo, Ifrvl64m5kq433, I3anl8n2fnr4bg, Ibmjtl75ptu606, Ib9karr24cpmca, I17rade5afcmi9, Ifpfll8q52l7d8, If7739d96jlocs, Imdvokfbpi0mt, I4k9cid91h8bup, Imgcatq9b2cl1, I40pqum1mu8qg3, I1r4c2ghbtvjuc, Idcabvplu05lea, I2ncccle6pmhd9, I92bnd3pe0civj, Ic84i538n8bl8j, Ia8ogbeici6lip, I7vi74gbubc8u5, Ia2rnh5pfua40a, I3otc7e9a35k1k, I89ier5tb9ne0s, Im2f0numhevg3, I2agkcpojhkk43, I32rvg545edabm, I83fv0vi59md7i, I5tjjqcdd4tae0, I1894dm1lf1ae7, I82nfqfkd48n10, I1jm8m1rh9e20v, I3o5j3bli1pd8e, I5t8a8734unb9r, I11daup0eudof7, I38jfk5li8iang, Im27nlqnsqokc, I8lgulhtal9pjr, I2dtrijkm5601t, I2ev73t79f46tb, Ib2obgji960euh, I1moso5oagpiea, Ibeb4n9vpjefp3, Id7murq9s9fg6h, Ied9mja4bq7va8, I4f7jul8ljs54r, I5agg650597e49, Ibot4i7a9t6oo8, I666bl2fqjkejo, I3hsuol7rtl0bj, I3v9h9f3mpm1l8, I9mnj4k4u8ls2c, I2kt2u1flctk2q, Iffcutbjvs7mcv, Icm9m0qeemu66d, I1ssp78ejl639m, Iba7pefg0d11kh, I2pjehun5ehh5i, Ibou4u1engb441, Id6nbvqoqdj4o2, I95iqep3b8snn9, Ia82mnkmeo2rhc, I7m2vppkutb3qv, I855j4i3kr8ko1, Iahk6du72h73nk, I2pimctgscuvih, Ib3728pnlm2cie, Iep1lmt6q3s6r3, I1fac16213rie2, Ifjt77oc391o43, Itvt1jsipv0lc, Ick3mveut33f44, I719lqkkbtikbl, Ie4intrc3n8jfu, I2rg5btjrsqec0, Ibdqerrooruuq9, I8u2ba9jeiu6q0, I7ieadb293k6b4, Iep27ialq4a7o7, Iasu5jvoqr43mv, I4mhgno6m7svl3, I5qolde99acmd1, Ie4bpt9qlkevto, I2ur0oeqg495j8, I2r3jv7qp8f8vn, I8rvhukgc40f50, Ia3c82eadg79bj, Ienusoeb625ftq, Idd7hd99u0ho0n, Iafscmv8tjf0ou, I100l07kaehdlp, I6gnbnvip5vvdi, Ier2cke86dqbr2, Icv68aq8841478, Ic262ibdoec56a, Iflcfm9b6nlmdd, Ijrsf4mnp3eka, Id5fm4p8lj5qgi, I8tjvj9uq4b7hi, I4fooe9dun9o0t, Ievr89968437gm, Ibghevfhkqejki, I9bur6p3ovq9mo, Id5145c5vjp178, If1i3n61v0fj26, Ie1781ek52afdj, Ibt2bn2cqg689o, Ia1s76fd38iqae, I3lcbm4tpd3c2m, Ibl1gaa0rn2c67, I1jtn43phq0dpb, I2f09r4lf5jjh9, If6m0o1bjubses, Ica4tsd7r045b4, I8lqcc9n1bpf10, Ic756ll6rev3et, Iabgjddlh1k1hp, Ie04jjjrr8q02l, Ifstva0urnm27g, I4lpo3encq7fn8, Icd1cghie6s8nr, I7vvm3he225ppt, Iaui349lsh3clk, Ifbddfv84nkppg, Iil3sdsh8fk7l, I85i3hdo5nsfi5, Ic65advfoqjhk7, Ie5v6njpckr05b, I8sde2gqm7dqqh, I95l2k9b1re95f, I2hq50pu2kdjpo, I137t1cld92pod, Ia72eet39sf8j9, If8u5kl4h8070m, Icl7nl1rfeog3i, Iasr6pj6shs0fl, I2uqmls7kcdnii, Idg69klialbkb8, I7r6b7145022pp, I30pg328m00nr3, Icmrn7bogp28cs, I7m9b5plj4h5ot, I9onhk772nfs4f, I3l6bnksrmt56r, Idh09k0l2pmdcg, I7uoiphbm0tj4r, I512p1n7qt24l8, I6s1nbislhk619, Ibeto40kl3r5j7, I1k922b8al78rb, I1hgaklii9a5gl, I1rvj4ubaplho0, Ia3uu7lqcc1q1i, I7crucfnonitkn, I7tmrp94r9sq4n, Ifmc9boeeia623, Itmchvgqfl28g, Iea4g5ovhnolus, Ie5222qfrr24ek, I28g8sphdu312k, Idqbjt2c6r46t6, I853aigjva3f0t, I9uehhems5hkqm, I7q5qk4uoanhof, Iehpbs40l3jkit, Idht9upmipvd4j, I77pq1trv3c4k2, I5rtkmhm2dng4u, Ift6f10887nk72, I7qc53b1tvqjg2, Ib6om1rg7gaum1, Iak7fhrgb9jnnq, I9ad1o9mv4cm3, I3peh714diura8, I62ffgu6q2478o, I10r7il4gvbcae, I2c00i2bngegk9, Iet7kfijhihjik, I2vrbos7ogo6ps, Iffeo46j957abe, I4ljshcevmm3p2, I44hc4lgsn4o1j, I8iksqi3eani0a, I16enopmju1p0q, Ifgqhle2413de7, I43kq8qudg7pq9, I76riseemre533, I4hcillge8de5f, I20e9ph536u7ti, I8kcpmsh450rp, If1co0pilmi7oq, Iae74gjak1qibn, I3escdojpj0551, Iaqet9jc3ihboe, Ic952bubvq4k7d, I2v50gu3s1aqk6, Iabpgqcjikia83, Iedigu6rpmlqgi, If7uv525tdvv7a, I2an1fs2eiebjp, TransactionValidityTransactionSource, I9ask1o4tfvcvs, I6spmpef2c7svf, Iei2mvq0mjvt81, Icerf8h8pdu8ss, Ic1d4u2opv3fst, If08sfhqn8ujfr, Ic4rgfgksgmm3e, I3dj14b7k3rkm5, I55hda2igh2kpe, Ib5fuj3h6uddcc, Ifogockjiq4b3, I2r0n4gcrs974b, Ie6kgk6f04rsvk, Ibkook56hopvp8, I1fl9qh2r1hf29, I45rl58hfs7m0h, I6fr2mqud652ga, I6pj5ltvn0n3ld, I9sijb8gfrns29, I9cuhvnfjpga8u, I2dfliekq1ed7e, Idmj5j6lk1d68c, I9u22scd4ksrjm, Iep4uo61810hfs, Iftvbctbo05fu4, XcmVersionedXcm, Ic0c3req3mlc1l, XcmVersionedAssetId, I7ocn4njqde3v5, Iek7ha36da9mf5, Iekimmnjq021gh, I60mpf7i0nq9h4, Icvhoqf7i84h1r, XcmVersionedAsset, Icujp6hmv35vbn, Ie9sr1iqcg3cgm, I1mqgk2tmnn9i2, I6lr8sctk0bi4e, Ia0b5t2n4b7jh8 } from "./common-types";
type AnonymousEnum<T extends {}> = T & {
    __anonymous: true;
};
type MyTuple<T> = [T, ...T[]];
type SeparateUndefined<T> = undefined extends T ? undefined | Exclude<T, undefined> : T;
type Anonymize<T> = SeparateUndefined<T extends FixedSizeBinary<infer L> ? number extends L ? Binary : FixedSizeBinary<L> : T extends string | number | bigint | boolean | void | undefined | null | symbol | Uint8Array | Enum<any> ? T : T extends AnonymousEnum<infer V> ? Enum<V> : T extends MyTuple<any> ? {
    [K in keyof T]: T[K];
} : T extends [] ? [] : T extends FixedSizeArray<infer L, infer T> ? number extends L ? Array<T> : FixedSizeArray<L, T> : {
    [K in keyof T & string]: T[K];
}>;
type IStorage = {
    System: {
        /**
         * The full account information for a particular account ID.
         */
        Account: StorageDescriptor<[Key: SS58String], Anonymize<I5sesotjlssv2d>, false, never>;
        /**
         * Total extrinsics count for the current block.
         */
        ExtrinsicCount: StorageDescriptor<[], number, true, never>;
        /**
         * Whether all inherents have been applied.
         */
        InherentsApplied: StorageDescriptor<[], boolean, false, never>;
        /**
         * The current weight for the block.
         */
        BlockWeight: StorageDescriptor<[], Anonymize<Iffmde3ekjedi9>, false, never>;
        /**
         * Total length (in bytes) for all extrinsics put together, for the current block.
         */
        AllExtrinsicsLen: StorageDescriptor<[], number, true, never>;
        /**
         * Map of block numbers to block hashes.
         */
        BlockHash: StorageDescriptor<[Key: number], FixedSizeBinary<32>, false, never>;
        /**
         * Extrinsics data for the current block (maps an extrinsic's index to its data).
         */
        ExtrinsicData: StorageDescriptor<[Key: number], Binary, false, never>;
        /**
         * The current block number being processed. Set by `execute_block`.
         */
        Number: StorageDescriptor<[], number, false, never>;
        /**
         * Hash of the previous block.
         */
        ParentHash: StorageDescriptor<[], FixedSizeBinary<32>, false, never>;
        /**
         * Digest of the current block, also part of the block header.
         */
        Digest: StorageDescriptor<[], Anonymize<I4mddgoa69c0a2>, false, never>;
        /**
         * Events deposited for the current block.
         *
         * NOTE: The item is unbound and should therefore never be read on chain.
         * It could otherwise inflate the PoV size of a block.
         *
         * Events have a large in-memory size. Box the events to not go out-of-memory
         * just in case someone still reads them from within the runtime.
         */
        Events: StorageDescriptor<[], Anonymize<Ic6m8qjo445mpd>, false, never>;
        /**
         * The number of events in the `Events<T>` list.
         */
        EventCount: StorageDescriptor<[], number, false, never>;
        /**
         * Mapping between a topic (represented by T::Hash) and a vector of indexes
         * of events in the `<Events<T>>` list.
         *
         * All topic vectors have deterministic storage locations depending on the topic. This
         * allows light-clients to leverage the changes trie storage tracking mechanism and
         * in case of changes fetch the list of events of interest.
         *
         * The value has the type `(BlockNumberFor<T>, EventIndex)` because if we used only just
         * the `EventIndex` then in case if the topic has the same contents on the next block
         * no notification will be triggered thus the event might be lost.
         */
        EventTopics: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<I95g6i7ilua7lq>, false, never>;
        /**
         * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
         */
        LastRuntimeUpgrade: StorageDescriptor<[], Anonymize<Ieniouoqkq4icf>, true, never>;
        /**
         * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
         */
        UpgradedToU32RefCount: StorageDescriptor<[], boolean, false, never>;
        /**
         * True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
         * (default) if not.
         */
        UpgradedToTripleRefCount: StorageDescriptor<[], boolean, false, never>;
        /**
         * The execution phase of the block.
         */
        ExecutionPhase: StorageDescriptor<[], Phase, true, never>;
        /**
         * `Some` if a code upgrade has been authorized.
         */
        AuthorizedUpgrade: StorageDescriptor<[], Anonymize<Ibgl04rn6nbfm6>, true, never>;
    };
    Identity: {
        /**
         * Information that is pertinent to identify the entity behind an account. First item is the
         * registration, second is the account's primary username.
         *
         * TWOX-NOTE: OK ― `AccountId` is a secure hash.
         */
        IdentityOf: StorageDescriptor<[Key: SS58String], Anonymize<I4ftk0glls7946>, true, never>;
        /**
         * Identifies the primary username of an account.
         */
        UsernameOf: StorageDescriptor<[Key: SS58String], Binary, true, never>;
        /**
         * The super-identity of an alternative "sub" identity together with its name, within that
         * context. If the account is not some other account's sub-identity, then just `None`.
         */
        SuperOf: StorageDescriptor<[Key: SS58String], Anonymize<I910puuahutflf>, true, never>;
        /**
         * Alternative "sub" identities of this account.
         *
         * The first item is the deposit, the second is a vector of the accounts.
         *
         * TWOX-NOTE: OK ― `AccountId` is a secure hash.
         */
        SubsOf: StorageDescriptor<[Key: SS58String], Anonymize<I4nfjdef0ibh44>, false, never>;
        /**
         * The set of registrars. Not expected to get very big as can only be added through a
         * special origin (likely a council motion).
         *
         * The index into this can be cast to `RegistrarIndex` to get a valid value.
         */
        Registrars: StorageDescriptor<[], Anonymize<I74af64m08r6as>, false, never>;
        /**
         * A map of the accounts who are authorized to grant usernames.
         */
        AuthorityOf: StorageDescriptor<[Key: Binary], Anonymize<Ic8ann3kre6vdm>, true, never>;
        /**
         * Reverse lookup from `username` to the `AccountId` that has registered it and the provider of
         * the username. The `owner` value should be a key in the `UsernameOf` map, but it may not if
         * the user has cleared their username or it has been removed.
         *
         * Multiple usernames may map to the same `AccountId`, but `UsernameOf` will only map to one
         * primary username.
         */
        UsernameInfoOf: StorageDescriptor<[Key: Binary], Anonymize<I1j72qfgdejqsv>, true, never>;
        /**
         * Usernames that an authority has granted, but that the account controller has not confirmed
         * that they want it. Used primarily in cases where the `AccountId` cannot provide a signature
         * because they are a pure proxy, multisig, etc. In order to confirm it, they should call
         * [accept_username](`Call::accept_username`).
         *
         * First tuple item is the account and second is the acceptance deadline.
         */
        PendingUsernames: StorageDescriptor<[Key: Binary], Anonymize<I60biiepd74113>, true, never>;
        /**
         * Usernames for which the authority that granted them has started the removal process by
         * unbinding them. Each unbinding username maps to its grace period expiry, which is the first
         * block in which the username could be deleted through a
         * [remove_username](`Call::remove_username`) call.
         */
        UnbindingUsernames: StorageDescriptor<[Key: Binary], number, true, never>;
    };
    Timestamp: {
        /**
         * The current time for the current block.
         */
        Now: StorageDescriptor<[], bigint, false, never>;
        /**
         * Whether the timestamp has been updated in this block.
         *
         * This value is updated to `true` upon successful submission of a timestamp by a node.
         * It is then checked at the end of each block execution in the `on_finalize` hook.
         */
        DidUpdate: StorageDescriptor<[], boolean, false, never>;
    };
    Multisig: {
        /**
         * The set of open multisig operations.
         */
        Multisigs: StorageDescriptor<Anonymize<I8uo3fpd3bcc6f>, Anonymize<Iag146hmjgqfgj>, true, never>;
    };
    Proxy: {
        /**
         * The set of account proxies. Maps the account which has delegated to the accounts
         * which are being delegated to, together with the amount held on deposit.
         */
        Proxies: StorageDescriptor<[Key: SS58String], Anonymize<If9ch4n1qv5pmd>, false, never>;
        /**
         * The announcements made by the proxy (key).
         */
        Announcements: StorageDescriptor<[Key: SS58String], Anonymize<I9p9lq3rej5bhc>, false, never>;
    };
    Scheduler: {
        /**
        
         */
        IncompleteSince: StorageDescriptor<[], number, true, never>;
        /**
         * Items to be executed, indexed by the block number that they should be executed on.
         */
        Agenda: StorageDescriptor<[Key: number], Anonymize<I8s1m5n387k6ho>, false, never>;
        /**
         * Retry configurations for items to be executed, indexed by task address.
         */
        Retries: StorageDescriptor<[Key: Anonymize<I9jd27rnpm8ttv>], Anonymize<I56u24ncejr5kt>, true, never>;
        /**
         * Lookup from a name to the block number and index of the task.
         *
         * For v3 -> v4 the previously unbounded identities are Blake2-256 hashed to form the v4
         * identities.
         */
        Lookup: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<I9jd27rnpm8ttv>, true, never>;
    };
    ParachainSystem: {
        /**
         * Latest included block descendants the runtime accepted. In other words, these are
         * ancestors of the currently executing block which have not been included in the observed
         * relay-chain state.
         *
         * The segment length is limited by the capacity returned from the [`ConsensusHook`] configured
         * in the pallet.
         */
        UnincludedSegment: StorageDescriptor<[], Anonymize<I1v7jbnil3tjns>, false, never>;
        /**
         * Storage field that keeps track of bandwidth used by the unincluded segment along with the
         * latest HRMP watermark. Used for limiting the acceptance of new blocks with
         * respect to relay chain constraints.
         */
        AggregatedUnincludedSegment: StorageDescriptor<[], Anonymize<I8jgj1nhcr2dg8>, true, never>;
        /**
         * In case of a scheduled upgrade, this storage field contains the validation code to be
         * applied.
         *
         * As soon as the relay chain gives us the go-ahead signal, we will overwrite the
         * [`:code`][sp_core::storage::well_known_keys::CODE] which will result the next block process
         * with the new validation code. This concludes the upgrade process.
         */
        PendingValidationCode: StorageDescriptor<[], Binary, false, never>;
        /**
         * Validation code that is set by the parachain and is to be communicated to collator and
         * consequently the relay-chain.
         *
         * This will be cleared in `on_initialize` of each new block if no other pallet already set
         * the value.
         */
        NewValidationCode: StorageDescriptor<[], Binary, true, never>;
        /**
         * The [`PersistedValidationData`] set for this block.
         * This value is expected to be set only once per block and it's never stored
         * in the trie.
         */
        ValidationData: StorageDescriptor<[], Anonymize<Ifn6q3equiq9qi>, true, never>;
        /**
         * Were the validation data set to notify the relay chain?
         */
        DidSetValidationCode: StorageDescriptor<[], boolean, false, never>;
        /**
         * The relay chain block number associated with the last parachain block.
         *
         * This is updated in `on_finalize`.
         */
        LastRelayChainBlockNumber: StorageDescriptor<[], number, false, never>;
        /**
         * An option which indicates if the relay-chain restricts signalling a validation code upgrade.
         * In other words, if this is `Some` and [`NewValidationCode`] is `Some` then the produced
         * candidate will be invalid.
         *
         * This storage item is a mirror of the corresponding value for the current parachain from the
         * relay-chain. This value is ephemeral which means it doesn't hit the storage. This value is
         * set after the inherent.
         */
        UpgradeRestrictionSignal: StorageDescriptor<[], Anonymize<Ia3sb0vgvovhtg>, false, never>;
        /**
         * Optional upgrade go-ahead signal from the relay-chain.
         *
         * This storage item is a mirror of the corresponding value for the current parachain from the
         * relay-chain. This value is ephemeral which means it doesn't hit the storage. This value is
         * set after the inherent.
         */
        UpgradeGoAhead: StorageDescriptor<[], Anonymize<Iav8k1edbj86k7>, false, never>;
        /**
         * The state proof for the last relay parent block.
         *
         * This field is meant to be updated each block with the validation data inherent. Therefore,
         * before processing of the inherent, e.g. in `on_initialize` this data may be stale.
         *
         * This data is also absent from the genesis.
         */
        RelayStateProof: StorageDescriptor<[], Anonymize<Itom7fk49o0c9>, true, never>;
        /**
         * The snapshot of some state related to messaging relevant to the current parachain as per
         * the relay parent.
         *
         * This field is meant to be updated each block with the validation data inherent. Therefore,
         * before processing of the inherent, e.g. in `on_initialize` this data may be stale.
         *
         * This data is also absent from the genesis.
         */
        RelevantMessagingState: StorageDescriptor<[], Anonymize<I4i91h98n3cv1b>, true, never>;
        /**
         * The parachain host configuration that was obtained from the relay parent.
         *
         * This field is meant to be updated each block with the validation data inherent. Therefore,
         * before processing of the inherent, e.g. in `on_initialize` this data may be stale.
         *
         * This data is also absent from the genesis.
         */
        HostConfiguration: StorageDescriptor<[], Anonymize<I4iumukclgj8ej>, true, never>;
        /**
         * The last downward message queue chain head we have observed.
         *
         * This value is loaded before and saved after processing inbound downward messages carried
         * by the system inherent.
         */
        LastDmqMqcHead: StorageDescriptor<[], FixedSizeBinary<32>, false, never>;
        /**
         * The message queue chain heads we have observed per each channel incoming channel.
         *
         * This value is loaded before and saved after processing inbound downward messages carried
         * by the system inherent.
         */
        LastHrmpMqcHeads: StorageDescriptor<[], Anonymize<Iqnbvitf7a7l3>, false, never>;
        /**
         * Number of downward messages processed in a block.
         *
         * This will be cleared in `on_initialize` of each new block.
         */
        ProcessedDownwardMessages: StorageDescriptor<[], number, false, never>;
        /**
         * HRMP watermark that was set in a block.
         *
         * This will be cleared in `on_initialize` of each new block.
         */
        HrmpWatermark: StorageDescriptor<[], number, false, never>;
        /**
         * HRMP messages that were sent in a block.
         *
         * This will be cleared in `on_initialize` of each new block.
         */
        HrmpOutboundMessages: StorageDescriptor<[], Anonymize<I6r5cbv8ttrb09>, false, never>;
        /**
         * Upward messages that were sent in a block.
         *
         * This will be cleared in `on_initialize` of each new block.
         */
        UpwardMessages: StorageDescriptor<[], Anonymize<Itom7fk49o0c9>, false, never>;
        /**
         * Upward messages that are still pending and not yet send to the relay chain.
         */
        PendingUpwardMessages: StorageDescriptor<[], Anonymize<Itom7fk49o0c9>, false, never>;
        /**
         * The factor to multiply the base delivery fee by for UMP.
         */
        UpwardDeliveryFeeFactor: StorageDescriptor<[], bigint, false, never>;
        /**
         * The number of HRMP messages we observed in `on_initialize` and thus used that number for
         * announcing the weight of `on_initialize` and `on_finalize`.
         */
        AnnouncedHrmpMessagesPerCandidate: StorageDescriptor<[], number, false, never>;
        /**
         * The weight we reserve at the beginning of the block for processing XCMP messages. This
         * overrides the amount set in the Config trait.
         */
        ReservedXcmpWeightOverride: StorageDescriptor<[], Anonymize<I4q39t5hn830vp>, true, never>;
        /**
         * The weight we reserve at the beginning of the block for processing DMP messages. This
         * overrides the amount set in the Config trait.
         */
        ReservedDmpWeightOverride: StorageDescriptor<[], Anonymize<I4q39t5hn830vp>, true, never>;
        /**
         * A custom head data that should be returned as result of `validate_block`.
         *
         * See `Pallet::set_custom_validation_head_data` for more information.
         */
        CustomValidationHeadData: StorageDescriptor<[], Binary, true, never>;
    };
    ParachainInfo: {
        /**
        
         */
        ParachainId: StorageDescriptor<[], number, false, never>;
    };
    TransactionPayment: {
        /**
        
         */
        NextFeeMultiplier: StorageDescriptor<[], bigint, false, never>;
        /**
        
         */
        StorageVersion: StorageDescriptor<[], TransactionPaymentReleases, false, never>;
    };
    Balances: {
        /**
         * The total units issued in the system.
         */
        TotalIssuance: StorageDescriptor<[], bigint, false, never>;
        /**
         * The total units of outstanding deactivated balance in the system.
         */
        InactiveIssuance: StorageDescriptor<[], bigint, false, never>;
        /**
         * The Balances pallet example of storing the balance of an account.
         *
         * # Example
         *
         * ```nocompile
         * impl pallet_balances::Config for Runtime {
         * type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
         * }
         * ```
         *
         * You can also store the balance of an account in the `System` pallet.
         *
         * # Example
         *
         * ```nocompile
         * impl pallet_balances::Config for Runtime {
         * type AccountStore = System
         * }
         * ```
         *
         * But this comes with tradeoffs, storing account balances in the system pallet stores
         * `frame_system` data alongside the account data contrary to storing account balances in the
         * `Balances` pallet, which uses a `StorageMap` to store balances data only.
         * NOTE: This is only used in the case that this pallet is used to store balances.
         */
        Account: StorageDescriptor<[Key: SS58String], Anonymize<I1q8tnt1cluu5j>, false, never>;
        /**
         * Any liquidity locks on some account balances.
         * NOTE: Should only be accessed when setting, changing and freeing a lock.
         *
         * Use of locks is deprecated in favour of freezes. See `https://github.com/paritytech/substrate/pull/12951/`
         */
        Locks: StorageDescriptor<[Key: SS58String], Anonymize<I8ds64oj6581v0>, false, never>;
        /**
         * Named reserves on some account balances.
         *
         * Use of reserves is deprecated in favour of holds. See `https://github.com/paritytech/substrate/pull/12951/`
         */
        Reserves: StorageDescriptor<[Key: SS58String], Anonymize<Ia7pdug7cdsg8g>, false, never>;
        /**
         * Holds on account balances.
         */
        Holds: StorageDescriptor<[Key: SS58String], Anonymize<Ieunmr2qhp2i5r>, false, never>;
        /**
         * Freeze locks on account balances.
         */
        Freezes: StorageDescriptor<[Key: SS58String], Anonymize<I2q9fuah4a3jol>, false, never>;
    };
    Vesting: {
        /**
         * Information regarding the vesting of a given account.
         */
        Vesting: StorageDescriptor<[Key: SS58String], Anonymize<Ifble4juuml5ig>, true, never>;
        /**
         * Storage version of the pallet.
         *
         * New networks start with latest version, as determined by the genesis build.
         */
        StorageVersion: StorageDescriptor<[], Version, false, never>;
    };
    Inflation: {
        /**
         * Active inflation configuration parameters.
         * They describe current rewards, when inflation needs to be recalculated, etc.
         */
        ActiveInflationConfig: StorageDescriptor<[], Anonymize<I7srid9ei8c9u4>, false, never>;
        /**
         * Static inflation parameters - used to calculate active inflation configuration at certain points in time.
         */
        InflationParams: StorageDescriptor<[], Anonymize<I7tcevi26u67t9>, false, never>;
        /**
         * Flag indicating whether on the first possible opportunity, recalculation of the inflation config should be done.
         */
        DoRecalculation: StorageDescriptor<[], number, true, never>;
    };
    DappStaking: {
        /**
         * General information about dApp staking protocol state.
         */
        ActiveProtocolState: StorageDescriptor<[], Anonymize<I8phdsiu944qnt>, false, never>;
        /**
         * Counter for unique dApp identifiers.
         */
        NextDAppId: StorageDescriptor<[], number, false, never>;
        /**
         * Map of all dApps integrated into dApp staking protocol.
         *
         * Even though dApp is integrated, it does not mean it's still actively participating in dApp staking.
         * It might have been unregistered at some point in history.
         */
        IntegratedDApps: StorageDescriptor<[Key: Anonymize<Iav11gpk2hk471>], Anonymize<Ifd5a3glv206mk>, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForIntegratedDApps: StorageDescriptor<[], number, false, never>;
        /**
         * General locked/staked information for each account.
         */
        Ledger: StorageDescriptor<[Key: SS58String], Anonymize<Iaj10rr82j0c8f>, false, never>;
        /**
         * Information about how much each staker has staked for each smart contract in some period.
         */
        StakerInfo: StorageDescriptor<Anonymize<Ial7b1ao1svgpg>, Anonymize<I9fikrhe4v1ucd>, true, never>;
        /**
         * Information about how much has been staked on a smart contract in some era or period.
         */
        ContractStake: StorageDescriptor<[Key: number], Anonymize<I48d4i9nskqi1t>, false, never>;
        /**
         * General information about the current era.
         */
        CurrentEraInfo: StorageDescriptor<[], Anonymize<Ie0insqitg6p08>, false, never>;
        /**
         * Information about rewards for each era.
         *
         * Since each entry is a 'span', covering up to `T::EraRewardSpanLength` entries, only certain era value keys can exist in storage.
         * For the sake of simplicity, valid `era` keys are calculated as:
         *
         * era_key = era - (era % T::EraRewardSpanLength)
         *
         * This means that e.g. in case `EraRewardSpanLength = 8`, only era values 0, 8, 16, 24, etc. can exist in storage.
         * Eras 1-7 will be stored in the same entry as era 0, eras 9-15 will be stored in the same entry as era 8, etc.
         */
        EraRewards: StorageDescriptor<[Key: number], Anonymize<Iu5bstpont1pd>, true, never>;
        /**
         * Information about period's end.
         */
        PeriodEnd: StorageDescriptor<[Key: number], Anonymize<Ibbe0vuef8idk>, true, never>;
        /**
         * Static tier parameters used to calculate tier configuration.
         */
        StaticTierParams: StorageDescriptor<[], Anonymize<I9cb9bfe7mgkah>, false, never>;
        /**
         * Tier configuration user for current & preceding eras.
         */
        TierConfig: StorageDescriptor<[], Anonymize<I9qkqq3bm9meai>, false, never>;
        /**
         * Information about which tier a dApp belonged to in a specific era.
         */
        DAppTiers: StorageDescriptor<[Key: number], Anonymize<I401ur5btmdhug>, true, never>;
        /**
         * History cleanup marker - holds information about which DB entries should be cleaned up next, when applicable.
         */
        HistoryCleanupMarker: StorageDescriptor<[], Anonymize<I6ugqeqscrtvjd>, false, never>;
        /**
         * Safeguard to prevent unwanted operations in production.
         * Kept as a storage without extrinsic setter, so we can still enable it for some
         * chain-fork debugging if required.
         */
        Safeguard: StorageDescriptor<[], boolean, false, never>;
    };
    Assets: {
        /**
         * Details of an asset.
         */
        Asset: StorageDescriptor<[Key: bigint], Anonymize<I3qklfjubrljqh>, true, never>;
        /**
         * The holdings of a specific account for a specific asset.
         */
        Account: StorageDescriptor<Anonymize<I96rqo4i9p11oo>, Anonymize<Iag3f1hum3p4c8>, true, never>;
        /**
         * Approved balance transfers. First balance is the amount approved for transfer. Second
         * is the amount of `T::Currency` reserved for storing this.
         * First key is the asset ID, second key is the owner and third key is the delegate.
         */
        Approvals: StorageDescriptor<Anonymize<I6lsoh4c5um3u5>, Anonymize<I4s6jkha20aoh0>, true, never>;
        /**
         * Metadata of an asset.
         */
        Metadata: StorageDescriptor<[Key: bigint], Anonymize<I78s05f59eoi8b>, false, never>;
        /**
         * The asset ID enforced for the next asset creation, if any present. Otherwise, this storage
         * item has no effect.
         *
         * This can be useful for setting up constraints for IDs of the new assets. For example, by
         * providing an initial [`NextAssetId`] and using the [`crate::AutoIncAssetId`] callback, an
         * auto-increment model can be applied to all new asset IDs.
         *
         * The initial next asset ID can be set using the [`GenesisConfig`] or the
         * [SetNextAssetId](`migration::next_asset_id::SetNextAssetId`) migration.
         */
        NextAssetId: StorageDescriptor<[], bigint, true, never>;
    };
    PriceAggregator: {
        /**
         * Storage for the accumulated native currency price in the current block.
         */
        CurrentBlockValues: StorageDescriptor<[], Anonymize<Iafqnechp3omqg>, false, never>;
        /**
         * Used to store the aggregated processed block values during some time period.
         */
        IntermediateValueAggregator: StorageDescriptor<[], Anonymize<I3p18dmhknth6v>, false, never>;
        /**
         * Used to store aggregated intermediate values for some time period.
         */
        ValuesCircularBuffer: StorageDescriptor<[], Anonymize<I7jk416ehc2eh1>, false, never>;
    };
    Oracle: {
        /**
         * Raw values for each oracle operators
         */
        RawValues: StorageDescriptor<Anonymize<I2m57u1h2te06>, Anonymize<I9055m3udr8982>, true, never>;
        /**
         * Up to date combined value from Raw Values
         */
        Values: StorageDescriptor<[Key: Anonymize<I4rgf5d3abfav5>], Anonymize<I9055m3udr8982>, true, never>;
        /**
         * If an oracle operator has fed a value in this block
         */
        HasDispatched: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
    };
    OracleMembership: {
        /**
         * The current membership, stored as an ordered Vec.
         */
        Members: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * The current prime member, if one exists.
         */
        Prime: StorageDescriptor<[], SS58String, true, never>;
    };
    Authorship: {
        /**
         * Author of current block.
         */
        Author: StorageDescriptor<[], SS58String, true, never>;
    };
    CollatorSelection: {
        /**
         * The invulnerable, fixed collators.
         */
        Invulnerables: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * The (community, limited) collation candidates.
         */
        Candidates: StorageDescriptor<[], Anonymize<Ifi4da1gej1fri>, false, never>;
        /**
         * Candidates who initiated leave intent or kicked.
         */
        NonCandidates: StorageDescriptor<[Key: SS58String], Anonymize<I4ojmnsk1dchql>, true, never>;
        /**
         * Last block authored by collator.
         */
        LastAuthoredBlock: StorageDescriptor<[Key: SS58String], number, false, never>;
        /**
         * Desired number of candidates.
         *
         * This should ideally always be less than [`Config::MaxCandidates`] for weights to be correct.
         */
        DesiredCandidates: StorageDescriptor<[], number, false, never>;
        /**
         * Fixed amount to deposit to become a collator.
         *
         * When a collator calls `leave_intent` they immediately receive the deposit back.
         */
        CandidacyBond: StorageDescriptor<[], bigint, false, never>;
        /**
         * Destination account for slashed amount.
         */
        SlashDestination: StorageDescriptor<[], SS58String, true, never>;
    };
    Session: {
        /**
         * The current set of validators.
         */
        Validators: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * Current index of the session.
         */
        CurrentIndex: StorageDescriptor<[], number, false, never>;
        /**
         * True if the underlying economic identities or weighting behind the validators
         * has changed in the queued validator set.
         */
        QueuedChanged: StorageDescriptor<[], boolean, false, never>;
        /**
         * The queued keys for the next session. When the next session begins, these keys
         * will be used to determine the validator's session keys.
         */
        QueuedKeys: StorageDescriptor<[], Anonymize<Ifvgo9568rpmqc>, false, never>;
        /**
         * Indices of disabled validators.
         *
         * The vec is always kept sorted so that we can find whether a given validator is
         * disabled using binary search. It gets cleared when `on_session_ending` returns
         * a new set of identities.
         */
        DisabledValidators: StorageDescriptor<[], Anonymize<Icgljjb6j82uhn>, false, never>;
        /**
         * The next session keys for a validator.
         */
        NextKeys: StorageDescriptor<[Key: SS58String], FixedSizeBinary<32>, true, never>;
        /**
         * The owner of a key. The key is the `KeyTypeId` + the encoded key.
         */
        KeyOwner: StorageDescriptor<[Key: Anonymize<I82jm9g7pufuel>], SS58String, true, never>;
    };
    Aura: {
        /**
         * The current authority set.
         */
        Authorities: StorageDescriptor<[], Anonymize<Ic5m5lp1oioo8r>, false, never>;
        /**
         * The current slot of this block.
         *
         * This will be set in `on_initialize`.
         */
        CurrentSlot: StorageDescriptor<[], bigint, false, never>;
    };
    AuraExt: {
        /**
         * Serves as cache for the authorities.
         *
         * The authorities in AuRa are overwritten in `on_initialize` when we switch to a new session,
         * but we require the old authorities to verify the seal when validating a PoV. This will
         * always be updated to the latest AuRa authorities in `on_finalize`.
         */
        Authorities: StorageDescriptor<[], Anonymize<Ic5m5lp1oioo8r>, false, never>;
        /**
         * Current slot paired with a number of authored blocks.
         *
         * Updated on each block initialization.
         */
        SlotInfo: StorageDescriptor<[], Anonymize<I6cs1itejju2vv>, true, never>;
    };
    XcmpQueue: {
        /**
         * The suspended inbound XCMP channels. All others are not suspended.
         *
         * This is a `StorageValue` instead of a `StorageMap` since we expect multiple reads per block
         * to different keys with a one byte payload. The access to `BoundedBTreeSet` will be cached
         * within the block and therefore only included once in the proof size.
         *
         * NOTE: The PoV benchmarking cannot know this and will over-estimate, but the actual proof
         * will be smaller.
         */
        InboundXcmpSuspended: StorageDescriptor<[], Anonymize<Icgljjb6j82uhn>, false, never>;
        /**
         * The non-empty XCMP channels in order of becoming non-empty, and the index of the first
         * and last outbound message. If the two indices are equal, then it indicates an empty
         * queue and there must be a non-`Ok` `OutboundStatus`. We assume queues grow no greater
         * than 65535 items. Queue indices for normal messages begin at one; zero is reserved in
         * case of the need to send a high-priority signal message this block.
         * The bool is true if there is a signal message waiting to be sent.
         */
        OutboundXcmpStatus: StorageDescriptor<[], Anonymize<Ib77b0fp1a6mjr>, false, never>;
        /**
         * The messages outbound in a given XCMP channel.
         */
        OutboundXcmpMessages: StorageDescriptor<Anonymize<I5g2vv0ckl2m8b>, Binary, false, never>;
        /**
         * Any signal messages waiting to be sent.
         */
        SignalMessages: StorageDescriptor<[Key: number], Binary, false, never>;
        /**
         * The configuration which controls the dynamics of the outbound queue.
         */
        QueueConfig: StorageDescriptor<[], Anonymize<Ifup3lg9ro8a0f>, false, never>;
        /**
         * Whether or not the XCMP queue is suspended from executing incoming XCMs or not.
         */
        QueueSuspended: StorageDescriptor<[], boolean, false, never>;
        /**
         * The factor to multiply the base delivery fee by.
         */
        DeliveryFeeFactor: StorageDescriptor<[Key: number], bigint, false, never>;
    };
    PolkadotXcm: {
        /**
         * The latest available query index.
         */
        QueryCounter: StorageDescriptor<[], bigint, false, never>;
        /**
         * The ongoing queries.
         */
        Queries: StorageDescriptor<[Key: bigint], Anonymize<I5qfubnuvrnqn6>, true, never>;
        /**
         * The existing asset traps.
         *
         * Key is the blake2 256 hash of (origin, versioned `Assets`) pair. Value is the number of
         * times this pair has been trapped (usually just 1 if it exists at all).
         */
        AssetTraps: StorageDescriptor<[Key: FixedSizeBinary<32>], number, false, never>;
        /**
         * Default version to encode XCM when latest version of destination is unknown. If `None`,
         * then the destinations whose XCM version is unknown are considered unreachable.
         */
        SafeXcmVersion: StorageDescriptor<[], number, true, never>;
        /**
         * The Latest versions that we know various locations support.
         */
        SupportedVersion: StorageDescriptor<Anonymize<I8t3u2dv73ahbd>, number, true, never>;
        /**
         * All locations that we have requested version notifications from.
         */
        VersionNotifiers: StorageDescriptor<Anonymize<I8t3u2dv73ahbd>, bigint, true, never>;
        /**
         * The target locations that are subscribed to our version changes, as well as the most recent
         * of our versions we informed them of.
         */
        VersionNotifyTargets: StorageDescriptor<Anonymize<I8t3u2dv73ahbd>, Anonymize<I7vlvrrl2pnbgk>, true, never>;
        /**
         * Destinations whose latest XCM version we would like to know. Duplicates not allowed, and
         * the `u32` counter is the number of times that a send to the destination has been attempted,
         * which is used as a prioritization.
         */
        VersionDiscoveryQueue: StorageDescriptor<[], Anonymize<Ie0rpl5bahldfk>, false, never>;
        /**
         * The current migration's stage, if any.
         */
        CurrentMigration: StorageDescriptor<[], XcmPalletVersionMigrationStage, true, never>;
        /**
         * Fungible assets which we know are locked on a remote chain.
         */
        RemoteLockedFungibles: StorageDescriptor<Anonymize<Ie849h3gncgvok>, Anonymize<I7e5oaj2qi4kl1>, true, never>;
        /**
         * Fungible assets which we know are locked on this chain.
         */
        LockedFungibles: StorageDescriptor<[Key: SS58String], Anonymize<Iat62vud7hlod2>, true, never>;
        /**
         * Global suspension state of the XCM executor.
         */
        XcmExecutionSuspended: StorageDescriptor<[], boolean, false, never>;
        /**
         * Whether or not incoming XCMs (both executed locally and received) should be recorded.
         * Only one XCM program will be recorded at a time.
         * This is meant to be used in runtime APIs, and it's advised it stays false
         * for all other use cases, so as to not degrade regular performance.
         *
         * Only relevant if this pallet is being used as the [`xcm_executor::traits::RecordXcm`]
         * implementation in the XCM executor configuration.
         */
        ShouldRecordXcm: StorageDescriptor<[], boolean, false, never>;
        /**
         * If [`ShouldRecordXcm`] is set to true, then the last XCM program executed locally
         * will be stored here.
         * Runtime APIs can fetch the XCM that was executed by accessing this value.
         *
         * Only relevant if this pallet is being used as the [`xcm_executor::traits::RecordXcm`]
         * implementation in the XCM executor configuration.
         */
        RecordedXcm: StorageDescriptor<[], Anonymize<Ict03eedr8de9s>, true, never>;
    };
    XcAssetConfig: {
        /**
         * Mapping from an asset id to asset type.
         * Can be used when receiving transaction specifying an asset directly,
         * like transferring an asset from this chain to another.
         */
        AssetIdToLocation: StorageDescriptor<[Key: bigint], XcmVersionedLocation, true, never>;
        /**
         * Mapping from an asset type to an asset id.
         * Can be used when receiving a multilocation XCM message to retrieve
         * the corresponding asset in which tokens should me minted.
         */
        AssetLocationToId: StorageDescriptor<[Key: XcmVersionedLocation], bigint, true, never>;
        /**
         * Stores the units per second for local execution for a AssetLocation.
         * This is used to know how to charge for XCM execution in a particular asset.
         *
         * Not all asset types are supported for payment. If value exists here, it means it is supported.
         */
        AssetLocationUnitsPerSecond: StorageDescriptor<[Key: XcmVersionedLocation], bigint, true, never>;
    };
    MessageQueue: {
        /**
         * The index of the first and last (non-empty) pages.
         */
        BookStateFor: StorageDescriptor<[Key: Anonymize<Iejeo53sea6n4q>], Anonymize<Idh2ug6ou4a8og>, false, never>;
        /**
         * The origin at which we should begin servicing.
         */
        ServiceHead: StorageDescriptor<[], Anonymize<Iejeo53sea6n4q>, true, never>;
        /**
         * The map of page indices to pages.
         */
        Pages: StorageDescriptor<Anonymize<Ib4jhb8tt3uung>, Anonymize<I53esa2ms463bk>, true, never>;
    };
    EVM: {
        /**
        
         */
        AccountCodes: StorageDescriptor<[Key: FixedSizeBinary<20>], Binary, false, never>;
        /**
        
         */
        AccountCodesMetadata: StorageDescriptor<[Key: FixedSizeBinary<20>], Anonymize<I7jidl7qnnq87c>, true, never>;
        /**
        
         */
        AccountStorages: StorageDescriptor<Anonymize<I82cps8ng2jtug>, FixedSizeBinary<32>, false, never>;
    };
    Ethereum: {
        /**
         * Mapping from transaction index to transaction in the current building block.
         */
        Pending: StorageDescriptor<[Key: number], Anonymize<Ifitc0q6ckjb3j>, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForPending: StorageDescriptor<[], number, false, never>;
        /**
         * The current Ethereum block.
         */
        CurrentBlock: StorageDescriptor<[], Anonymize<Idi27giun0mb9q>, true, never>;
        /**
         * The current Ethereum receipts.
         */
        CurrentReceipts: StorageDescriptor<[], Anonymize<Idud3fdh64aqp9>, true, never>;
        /**
         * The current transaction statuses.
         */
        CurrentTransactionStatuses: StorageDescriptor<[], Anonymize<Ie7atdsih6q14b>, true, never>;
        /**
        
         */
        BlockHash: StorageDescriptor<[Key: Anonymize<I4totqt881mlti>], FixedSizeBinary<32>, false, never>;
    };
    DynamicEvmBaseFee: {
        /**
        
         */
        BaseFeePerGas: StorageDescriptor<[], Anonymize<I4totqt881mlti>, false, never>;
    };
    Contracts: {
        /**
         * A mapping from a contract's code hash to its code.
         */
        PristineCode: StorageDescriptor<[Key: FixedSizeBinary<32>], Binary, true, never>;
        /**
         * A mapping from a contract's code hash to its code info.
         */
        CodeInfoOf: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<I5kulbesqc1h1t>, true, never>;
        /**
         * This is a **monotonic** counter incremented on contract instantiation.
         *
         * This is used in order to generate unique trie ids for contracts.
         * The trie id of a new contract is calculated from hash(account_id, nonce).
         * The nonce is required because otherwise the following sequence would lead to
         * a possible collision of storage:
         *
         * 1. Create a new contract.
         * 2. Terminate the contract.
         * 3. Immediately recreate the contract with the same account_id.
         *
         * This is bad because the contents of a trie are deleted lazily and there might be
         * storage of the old instantiation still in it when the new contract is created. Please
         * note that we can't replace the counter by the block number because the sequence above
         * can happen in the same block. We also can't keep the account counter in memory only
         * because storage is the only way to communicate across different extrinsics in the
         * same block.
         *
         * # Note
         *
         * Do not use it to determine the number of contracts. It won't be decremented if
         * a contract is destroyed.
         */
        Nonce: StorageDescriptor<[], bigint, false, never>;
        /**
         * The code associated with a given account.
         *
         * TWOX-NOTE: SAFE since `AccountId` is a secure hash.
         */
        ContractInfoOf: StorageDescriptor<[Key: SS58String], Anonymize<I36dvimehsh2tm>, true, never>;
        /**
         * Evicted contracts that await child trie deletion.
         *
         * Child trie deletion is a heavy operation depending on the amount of storage items
         * stored in said trie. Therefore this operation is performed lazily in `on_idle`.
         */
        DeletionQueue: StorageDescriptor<[Key: number], Binary, true, never>;
        /**
         * A pair of monotonic counters used to track the latest contract marked for deletion
         * and the latest deleted contract in queue.
         */
        DeletionQueueCounter: StorageDescriptor<[], Anonymize<I8t4pajubp34g3>, false, never>;
        /**
         * A migration can span across multiple blocks. This storage defines a cursor to track the
         * progress of the migration, enabling us to resume from the last completed position.
         */
        MigrationInProgress: StorageDescriptor<[], Binary, true, never>;
    };
    Preimage: {
        /**
         * The request status of a given hash.
         */
        StatusFor: StorageDescriptor<[Key: FixedSizeBinary<32>], PreimageOldRequestStatus, true, never>;
        /**
         * The request status of a given hash.
         */
        RequestStatusFor: StorageDescriptor<[Key: FixedSizeBinary<32>], PreimageRequestStatus, true, never>;
        /**
        
         */
        PreimageFor: StorageDescriptor<[Key: Anonymize<I4pact7n2e9a0i>], Binary, true, never>;
    };
    Sudo: {
        /**
         * The `AccountId` of the sudo key.
         */
        Key: StorageDescriptor<[], SS58String, true, never>;
    };
    CouncilMembership: {
        /**
         * The current membership, stored as an ordered Vec.
         */
        Members: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * The current prime member, if one exists.
         */
        Prime: StorageDescriptor<[], SS58String, true, never>;
    };
    TechnicalCommitteeMembership: {
        /**
         * The current membership, stored as an ordered Vec.
         */
        Members: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * The current prime member, if one exists.
         */
        Prime: StorageDescriptor<[], SS58String, true, never>;
    };
    CommunityCouncilMembership: {
        /**
         * The current membership, stored as an ordered Vec.
         */
        Members: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * The current prime member, if one exists.
         */
        Prime: StorageDescriptor<[], SS58String, true, never>;
    };
    Council: {
        /**
         * The hashes of the active proposals.
         */
        Proposals: StorageDescriptor<[], Anonymize<Ic5m5lp1oioo8r>, false, never>;
        /**
         * Actual proposal for a given hash, if it's current.
         */
        ProposalOf: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Iedia33gem7v9i>, true, never>;
        /**
         * Consideration cost created for publishing and storing a proposal.
         *
         * Determined by [Config::Consideration] and may be not present for certain proposals (e.g. if
         * the proposal count at the time of creation was below threshold N).
         */
        CostOf: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Ifvqn3ldat80ai>, true, never>;
        /**
         * Votes on a given proposal, if it is ongoing.
         */
        Voting: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<I99bb69usss9gs>, true, never>;
        /**
         * Proposals so far.
         */
        ProposalCount: StorageDescriptor<[], number, false, never>;
        /**
         * The current members of the collective. This is stored sorted (just by value).
         */
        Members: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * The prime member that helps determine the default vote behavior in case of abstentions.
         */
        Prime: StorageDescriptor<[], SS58String, true, never>;
    };
    TechnicalCommittee: {
        /**
         * The hashes of the active proposals.
         */
        Proposals: StorageDescriptor<[], Anonymize<Ic5m5lp1oioo8r>, false, never>;
        /**
         * Actual proposal for a given hash, if it's current.
         */
        ProposalOf: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Iedia33gem7v9i>, true, never>;
        /**
         * Consideration cost created for publishing and storing a proposal.
         *
         * Determined by [Config::Consideration] and may be not present for certain proposals (e.g. if
         * the proposal count at the time of creation was below threshold N).
         */
        CostOf: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Ifvqn3ldat80ai>, true, never>;
        /**
         * Votes on a given proposal, if it is ongoing.
         */
        Voting: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<I99bb69usss9gs>, true, never>;
        /**
         * Proposals so far.
         */
        ProposalCount: StorageDescriptor<[], number, false, never>;
        /**
         * The current members of the collective. This is stored sorted (just by value).
         */
        Members: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * The prime member that helps determine the default vote behavior in case of abstentions.
         */
        Prime: StorageDescriptor<[], SS58String, true, never>;
    };
    CommunityCouncil: {
        /**
         * The hashes of the active proposals.
         */
        Proposals: StorageDescriptor<[], Anonymize<Ic5m5lp1oioo8r>, false, never>;
        /**
         * Actual proposal for a given hash, if it's current.
         */
        ProposalOf: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Iedia33gem7v9i>, true, never>;
        /**
         * Consideration cost created for publishing and storing a proposal.
         *
         * Determined by [Config::Consideration] and may be not present for certain proposals (e.g. if
         * the proposal count at the time of creation was below threshold N).
         */
        CostOf: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Ifvqn3ldat80ai>, true, never>;
        /**
         * Votes on a given proposal, if it is ongoing.
         */
        Voting: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<I99bb69usss9gs>, true, never>;
        /**
         * Proposals so far.
         */
        ProposalCount: StorageDescriptor<[], number, false, never>;
        /**
         * The current members of the collective. This is stored sorted (just by value).
         */
        Members: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * The prime member that helps determine the default vote behavior in case of abstentions.
         */
        Prime: StorageDescriptor<[], SS58String, true, never>;
    };
    Democracy: {
        /**
         * The number of (public) proposals that have been made so far.
         */
        PublicPropCount: StorageDescriptor<[], number, false, never>;
        /**
         * The public proposals. Unsorted. The second item is the proposal.
         */
        PublicProps: StorageDescriptor<[], Anonymize<I6mhebgj62g585>, false, never>;
        /**
         * Those who have locked a deposit.
         *
         * TWOX-NOTE: Safe, as increasing integer keys are safe.
         */
        DepositOf: StorageDescriptor<[Key: number], Anonymize<I3vhcedhm4hpvm>, true, never>;
        /**
         * The next free referendum index, aka the number of referenda started so far.
         */
        ReferendumCount: StorageDescriptor<[], number, false, never>;
        /**
         * The lowest referendum index representing an unbaked referendum. Equal to
         * `ReferendumCount` if there isn't a unbaked referendum.
         */
        LowestUnbaked: StorageDescriptor<[], number, false, never>;
        /**
         * Information concerning any given referendum.
         *
         * TWOX-NOTE: SAFE as indexes are not under an attacker’s control.
         */
        ReferendumInfoOf: StorageDescriptor<[Key: number], Anonymize<I526daka7j7b17>, true, never>;
        /**
         * All votes for a particular voter. We store the balance for the number of votes that we
         * have recorded. The second item is the total amount of delegations, that will be added.
         *
         * TWOX-NOTE: SAFE as `AccountId`s are crypto hashes anyway.
         */
        VotingOf: StorageDescriptor<[Key: SS58String], Anonymize<Ifanv2kvm586s4>, false, never>;
        /**
         * True if the last referendum tabled was submitted externally. False if it was a public
         * proposal.
         */
        LastTabledWasExternal: StorageDescriptor<[], boolean, false, never>;
        /**
         * The referendum to be tabled whenever it would be valid to table an external proposal.
         * This happens when a referendum needs to be tabled and one of two conditions are met:
         * - `LastTabledWasExternal` is `false`; or
         * - `PublicProps` is empty.
         */
        NextExternal: StorageDescriptor<[], Anonymize<I5rsgtofmn5lli>, true, never>;
        /**
         * A record of who vetoed what. Maps proposal hash to a possible existent block number
         * (until when it may not be resubmitted) and who vetoed it.
         */
        Blacklist: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Idned7t7knml6b>, true, never>;
        /**
         * Record of all proposals that have been subject to emergency cancellation.
         */
        Cancellations: StorageDescriptor<[Key: FixedSizeBinary<32>], boolean, false, never>;
        /**
         * General information concerning any proposal or referendum.
         * The `Hash` refers to the preimage of the `Preimages` provider which can be a JSON
         * dump or IPFS hash of a JSON file.
         *
         * Consider a garbage collection for a metadata of finished referendums to `unrequest` (remove)
         * large preimages.
         */
        MetadataOf: StorageDescriptor<[Key: Anonymize<I2itl2k1j2q8nf>], FixedSizeBinary<32>, true, never>;
    };
    Treasury: {
        /**
         * Number of proposals that have been made.
         */
        ProposalCount: StorageDescriptor<[], number, false, never>;
        /**
         * Proposals that have been made.
         */
        Proposals: StorageDescriptor<[Key: number], Anonymize<Iegmj7n48sc3am>, true, never>;
        /**
         * The amount which has been reported as inactive to Currency.
         */
        Deactivated: StorageDescriptor<[], bigint, false, never>;
        /**
         * Proposal indices that have been approved but not yet awarded.
         */
        Approvals: StorageDescriptor<[], Anonymize<Icgljjb6j82uhn>, false, never>;
    };
    CommunityTreasury: {
        /**
         * Number of proposals that have been made.
         */
        ProposalCount: StorageDescriptor<[], number, false, never>;
        /**
         * Proposals that have been made.
         */
        Proposals: StorageDescriptor<[Key: number], Anonymize<Iegmj7n48sc3am>, true, never>;
        /**
         * The amount which has been reported as inactive to Currency.
         */
        Deactivated: StorageDescriptor<[], bigint, false, never>;
        /**
         * Proposal indices that have been approved but not yet awarded.
         */
        Approvals: StorageDescriptor<[], Anonymize<Icgljjb6j82uhn>, false, never>;
    };
    SafeMode: {
        /**
         * Contains the last block number that the safe-mode will remain entered in.
         *
         * Set to `None` when safe-mode is exited.
         *
         * Safe-mode is automatically exited when the current block number exceeds this value.
         */
        EnteredUntil: StorageDescriptor<[], number, true, never>;
        /**
         * Holds the reserve that was taken from an account at a specific block number.
         *
         * This helps governance to have an overview of outstanding deposits that should be returned or
         * slashed.
         */
        Deposits: StorageDescriptor<Anonymize<I6ouflveob4eli>, bigint, true, never>;
    };
    TxPause: {
        /**
         * The set of calls that are explicitly paused.
         */
        PausedCalls: StorageDescriptor<[Key: Anonymize<Idkbvh6dahk1v7>], null, true, never>;
    };
    MultiBlockMigrations: {
        /**
         * The currently active migration to run and its cursor.
         *
         * `None` indicates that no migration is running.
         */
        Cursor: StorageDescriptor<[], Anonymize<Iepbsvlk3qceij>, true, never>;
        /**
         * Set of all successfully executed migrations.
         *
         * This is used as blacklist, to not re-execute migrations that have not been removed from the
         * codebase yet. Governance can regularly clear this out via `clear_historic`.
         */
        Historic: StorageDescriptor<[Key: Binary], null, true, never>;
    };
};
type ICalls = {
    System: {
        /**
         * Make some on-chain remark.
         *
         * Can be executed by every `origin`.
         */
        remark: TxDescriptor<Anonymize<I8ofcg5rbj0g2c>>;
        /**
         * Set the number of pages in the WebAssembly environment's heap.
         */
        set_heap_pages: TxDescriptor<Anonymize<I4adgbll7gku4i>>;
        /**
         * Set the new runtime code.
         */
        set_code: TxDescriptor<Anonymize<I6pjjpfvhvcfru>>;
        /**
         * Set the new runtime code without doing any checks of the given `code`.
         *
         * Note that runtime upgrades will not run if this is called with a not-increasing spec
         * version!
         */
        set_code_without_checks: TxDescriptor<Anonymize<I6pjjpfvhvcfru>>;
        /**
         * Set some items of storage.
         */
        set_storage: TxDescriptor<Anonymize<I9pj91mj79qekl>>;
        /**
         * Kill some items from storage.
         */
        kill_storage: TxDescriptor<Anonymize<I39uah9nss64h9>>;
        /**
         * Kill all storage items with a key that starts with the given prefix.
         *
         * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
         * the prefix we are removing to accurately calculate the weight of this function.
         */
        kill_prefix: TxDescriptor<Anonymize<Ik64dknsq7k08>>;
        /**
         * Make some on-chain remark and emit event.
         */
        remark_with_event: TxDescriptor<Anonymize<I8ofcg5rbj0g2c>>;
        /**
         * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
         * later.
         *
         * This call requires Root origin.
         */
        authorize_upgrade: TxDescriptor<Anonymize<Ib51vk42m1po4n>>;
        /**
         * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
         * later.
         *
         * WARNING: This authorizes an upgrade that will take place without any safety checks, for
         * example that the spec name remains the same and that the version number increases. Not
         * recommended for normal use. Use `authorize_upgrade` instead.
         *
         * This call requires Root origin.
         */
        authorize_upgrade_without_checks: TxDescriptor<Anonymize<Ib51vk42m1po4n>>;
        /**
         * Provide the preimage (runtime binary) `code` for an upgrade that has been authorized.
         *
         * If the authorization required a version check, this call will ensure the spec name
         * remains unchanged and that the spec version has increased.
         *
         * Depending on the runtime's `OnSetCode` configuration, this function may directly apply
         * the new `code` in the same block or attempt to schedule the upgrade.
         *
         * All origins are allowed.
         */
        apply_authorized_upgrade: TxDescriptor<Anonymize<I6pjjpfvhvcfru>>;
    };
    Utility: {
        /**
         * Send a batch of dispatch calls.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         *
         * This will return `Ok` in all circumstances. To determine the success of the batch, an
         * event is deposited. If a call failed and the batch was interrupted, then the
         * `BatchInterrupted` event is deposited, along with the number of successful calls made
         * and the error of the failed call. If all were successful, then the `BatchCompleted`
         * event is deposited.
         */
        batch: TxDescriptor<Anonymize<I6354v7vk6isdi>>;
        /**
         * Send a call through an indexed pseudonym of the sender.
         *
         * Filter from origin are passed along. The call will be dispatched with an origin which
         * use the same filter as the origin of this call.
         *
         * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
         * because you expect `proxy` to have been used prior in the call stack and you do not want
         * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
         * in the Multisig pallet instead.
         *
         * NOTE: Prior to version *12, this was called `as_limited_sub`.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        as_derivative: TxDescriptor<Anonymize<I212sfinbrq59j>>;
        /**
         * Send a batch of dispatch calls and atomically execute them.
         * The whole transaction will rollback and fail if any of the calls failed.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        batch_all: TxDescriptor<Anonymize<I6354v7vk6isdi>>;
        /**
         * Dispatches a function call with a provided origin.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * ## Complexity
         * - O(1).
         */
        dispatch_as: TxDescriptor<Anonymize<I3m33kbl64q02r>>;
        /**
         * Send a batch of dispatch calls.
         * Unlike `batch`, it allows errors and won't interrupt.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatch without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        force_batch: TxDescriptor<Anonymize<I6354v7vk6isdi>>;
        /**
         * Dispatch a function call with a specified weight.
         *
         * This function does not check the weight of the call, and instead allows the
         * Root origin to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        with_weight: TxDescriptor<Anonymize<Iac53udfpd9th9>>;
    };
    Identity: {
        /**
         * Add a registrar to the system.
         *
         * The dispatch origin for this call must be `T::RegistrarOrigin`.
         *
         * - `account`: the account of the registrar.
         *
         * Emits `RegistrarAdded` if successful.
         */
        add_registrar: TxDescriptor<Anonymize<Ic6cqd9g0t65v0>>;
        /**
         * Set an account's identity information and reserve the appropriate deposit.
         *
         * If the account already has identity information, the deposit is taken as part payment
         * for the new deposit.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `info`: The identity information.
         *
         * Emits `IdentitySet` if successful.
         */
        set_identity: TxDescriptor<Anonymize<I2kds5jji7slh8>>;
        /**
         * Set the sub-accounts of the sender.
         *
         * Payment: Any aggregate balance reserved by previous `set_subs` calls will be returned
         * and an amount `SubAccountDeposit` will be reserved for each item in `subs`.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * identity.
         *
         * - `subs`: The identity's (new) sub-accounts.
         */
        set_subs: TxDescriptor<Anonymize<Ia9mkdf6l44shb>>;
        /**
         * Clear an account's identity info and all sub-accounts and return all deposits.
         *
         * Payment: All reserved balances on the account are returned.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * identity.
         *
         * Emits `IdentityCleared` if successful.
         */
        clear_identity: TxDescriptor<undefined>;
        /**
         * Request a judgement from a registrar.
         *
         * Payment: At most `max_fee` will be reserved for payment to the registrar if judgement
         * given.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a
         * registered identity.
         *
         * - `reg_index`: The index of the registrar whose judgement is requested.
         * - `max_fee`: The maximum fee that may be paid. This should just be auto-populated as:
         *
         * ```nocompile
         * Registrars::<T>::get().get(reg_index).unwrap().fee
         * ```
         *
         * Emits `JudgementRequested` if successful.
         */
        request_judgement: TxDescriptor<Anonymize<I9l2s4klu0831o>>;
        /**
         * Cancel a previous request.
         *
         * Payment: A previously reserved deposit is returned on success.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a
         * registered identity.
         *
         * - `reg_index`: The index of the registrar whose judgement is no longer requested.
         *
         * Emits `JudgementUnrequested` if successful.
         */
        cancel_request: TxDescriptor<Anonymize<I2ctrt5nqb8o7c>>;
        /**
         * Set the fee required for a judgement to be requested from a registrar.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must be the account
         * of the registrar whose index is `index`.
         *
         * - `index`: the index of the registrar whose fee is to be set.
         * - `fee`: the new fee.
         */
        set_fee: TxDescriptor<Anonymize<I711qahikocb1c>>;
        /**
         * Change the account associated with a registrar.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must be the account
         * of the registrar whose index is `index`.
         *
         * - `index`: the index of the registrar whose fee is to be set.
         * - `new`: the new account ID.
         */
        set_account_id: TxDescriptor<Anonymize<I6o1er683vod1j>>;
        /**
         * Set the field information for a registrar.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must be the account
         * of the registrar whose index is `index`.
         *
         * - `index`: the index of the registrar whose fee is to be set.
         * - `fields`: the fields that the registrar concerns themselves with.
         */
        set_fields: TxDescriptor<Anonymize<Id6gojh30v9ib2>>;
        /**
         * Provide a judgement for an account's identity.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must be the account
         * of the registrar whose index is `reg_index`.
         *
         * - `reg_index`: the index of the registrar whose judgement is being made.
         * - `target`: the account whose identity the judgement is upon. This must be an account
         * with a registered identity.
         * - `judgement`: the judgement of the registrar of index `reg_index` about `target`.
         * - `identity`: The hash of the [`IdentityInformationProvider`] for that the judgement is
         * provided.
         *
         * Note: Judgements do not apply to a username.
         *
         * Emits `JudgementGiven` if successful.
         */
        provide_judgement: TxDescriptor<Anonymize<Ide1bahhh47lj9>>;
        /**
         * Remove an account's identity and sub-account information and slash the deposits.
         *
         * Payment: Reserved balances from `set_subs` and `set_identity` are slashed and handled by
         * `Slash`. Verification request deposits are not returned; they should be cancelled
         * manually using `cancel_request`.
         *
         * The dispatch origin for this call must match `T::ForceOrigin`.
         *
         * - `target`: the account whose identity the judgement is upon. This must be an account
         * with a registered identity.
         *
         * Emits `IdentityKilled` if successful.
         */
        kill_identity: TxDescriptor<Anonymize<Id9uqtigc0il3v>>;
        /**
         * Add the given account to the sender's subs.
         *
         * Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
         * to the sender.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * sub identity of `sub`.
         */
        add_sub: TxDescriptor<Anonymize<Ic68lsi7chpv5k>>;
        /**
         * Alter the associated name of the given sub-account.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * sub identity of `sub`.
         */
        rename_sub: TxDescriptor<Anonymize<Ic68lsi7chpv5k>>;
        /**
         * Remove the given account from the sender's subs.
         *
         * Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
         * to the sender.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * sub identity of `sub`.
         */
        remove_sub: TxDescriptor<Anonymize<Iek0boln8pgnko>>;
        /**
         * Remove the sender as a sub-account.
         *
         * Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
         * to the sender (*not* the original depositor).
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * super-identity.
         *
         * NOTE: This should not normally be used, but is provided in the case that the non-
         * controller of an account is maliciously registered as a sub-account.
         */
        quit_sub: TxDescriptor<undefined>;
        /**
         * Add an `AccountId` with permission to grant usernames with a given `suffix` appended.
         *
         * The authority can grant up to `allocation` usernames. To top up the allocation or
         * change the account used to grant usernames, this call can be used with the updated
         * parameters to overwrite the existing configuration.
         */
        add_username_authority: TxDescriptor<Anonymize<I452bkd71b385t>>;
        /**
         * Remove `authority` from the username authorities.
         */
        remove_username_authority: TxDescriptor<Anonymize<Ie83f0p0ke1f4u>>;
        /**
         * Set the username for `who`. Must be called by a username authority.
         *
         * If `use_allocation` is set, the authority must have a username allocation available to
         * spend. Otherwise, the authority will need to put up a deposit for registering the
         * username.
         *
         * Users can either pre-sign their usernames or
         * accept them later.
         *
         * Usernames must:
         * - Only contain lowercase ASCII characters or digits.
         * - When combined with the suffix of the issuing authority be _less than_ the
         * `MaxUsernameLength`.
         */
        set_username_for: TxDescriptor<Anonymize<I93hi4ed10h5sc>>;
        /**
         * Accept a given username that an `authority` granted. The call must include the full
         * username, as in `username.suffix`.
         */
        accept_username: TxDescriptor<Anonymize<Ie5l999tf7t2te>>;
        /**
         * Remove an expired username approval. The username was approved by an authority but never
         * accepted by the user and must now be beyond its expiration. The call must include the
         * full username, as in `username.suffix`.
         */
        remove_expired_approval: TxDescriptor<Anonymize<Ie5l999tf7t2te>>;
        /**
         * Set a given username as the primary. The username should include the suffix.
         */
        set_primary_username: TxDescriptor<Anonymize<Ie5l999tf7t2te>>;
        /**
         * Start the process of removing a username by placing it in the unbinding usernames map.
         * Once the grace period has passed, the username can be deleted by calling
         * [remove_username](crate::Call::remove_username).
         */
        unbind_username: TxDescriptor<Anonymize<Ie5l999tf7t2te>>;
        /**
         * Permanently delete a username which has been unbinding for longer than the grace period.
         * Caller is refunded the fee if the username expired and the removal was successful.
         */
        remove_username: TxDescriptor<Anonymize<Ie5l999tf7t2te>>;
        /**
         * Call with [ForceOrigin](crate::Config::ForceOrigin) privileges which deletes a username
         * and slashes any deposit associated with it.
         */
        kill_username: TxDescriptor<Anonymize<Ie5l999tf7t2te>>;
    };
    Timestamp: {
        /**
         * Set the current time.
         *
         * This call should be invoked exactly once per block. It will panic at the finalization
         * phase, if this call hasn't been invoked by that time.
         *
         * The timestamp should be greater than the previous one by the amount specified by
         * [`Config::MinimumPeriod`].
         *
         * The dispatch origin for this call must be _None_.
         *
         * This dispatch class is _Mandatory_ to ensure it gets executed in the block. Be aware
         * that changing the complexity of this call could result exhausting the resources in a
         * block to execute any other calls.
         *
         * ## Complexity
         * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
         * - 1 storage read and 1 storage mutation (codec `O(1)` because of `DidUpdate::take` in
         * `on_finalize`)
         * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
         */
        set: TxDescriptor<Anonymize<Idcr6u6361oad9>>;
    };
    Multisig: {
        /**
         * Immediately dispatch a multi-signature call using a single approval from the caller.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multi-signature, but do not participate in the approval process.
         * - `call`: The call to be executed.
         *
         * Result is equivalent to the dispatched result.
         *
         * ## Complexity
         * O(Z + C) where Z is the length of the call and C its execution weight.
         */
        as_multi_threshold_1: TxDescriptor<Anonymize<I5446n5co0ed1j>>;
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * If there are enough, then dispatch the call.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call`: The call to be executed.
         *
         * NOTE: Unless this is the final approval, you will generally want to use
         * `approve_as_multi` instead, since it only requires a hash of the call.
         *
         * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
         * on success, result is `Ok` and the result from the interior call, if it was executed,
         * may be found in the deposited `MultisigExecuted` event.
         *
         * ## Complexity
         * - `O(S + Z + Call)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - The weight of the `call`.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        as_multi: TxDescriptor<Anonymize<I4i1j1ndqab7g4>>;
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call_hash`: The hash of the call to be executed.
         *
         * NOTE: If this is the final approval, you will want to use `as_multi` instead.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        approve_as_multi: TxDescriptor<Anonymize<Ideaemvoneh309>>;
        /**
         * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
         * for this operation will be unreserved on success.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `timepoint`: The timepoint (block number and transaction index) of the first approval
         * transaction for this dispatch.
         * - `call_hash`: The hash of the call to be executed.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - One event.
         * - I/O: 1 read `O(S)`, one remove.
         * - Storage: removes one item.
         */
        cancel_as_multi: TxDescriptor<Anonymize<I3d9o9d7epp66v>>;
    };
    Proxy: {
        /**
         * Dispatch the given `call` from an account that the sender is authorised for through
         * `add_proxy`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        proxy: TxDescriptor<Anonymize<I6hjsnil65jnij>>;
        /**
         * Register a proxy account for the sender that is able to make calls on its behalf.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to make a proxy.
         * - `proxy_type`: The permissions allowed for this proxy account.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         */
        add_proxy: TxDescriptor<Anonymize<Ic6nou6182ifhl>>;
        /**
         * Unregister a proxy account for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to remove as a proxy.
         * - `proxy_type`: The permissions currently enabled for the removed proxy account.
         */
        remove_proxy: TxDescriptor<Anonymize<Ic6nou6182ifhl>>;
        /**
         * Unregister all proxy accounts for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * WARNING: This may be called on accounts created by `pure`, however if done, then
         * the unreserved fees will be inaccessible. **All access to this account will be lost.**
         */
        remove_proxies: TxDescriptor<undefined>;
        /**
         * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
         * initialize it with a proxy of `proxy_type` for `origin` sender.
         *
         * Requires a `Signed` origin.
         *
         * - `proxy_type`: The type of the proxy that the sender will be registered as over the
         * new account. This will almost always be the most permissive `ProxyType` possible to
         * allow for maximum flexibility.
         * - `index`: A disambiguation index, in case this is called multiple times in the same
         * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
         * want to use `0`.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         *
         * Fails with `Duplicate` if this has already been called in this transaction, from the
         * same sender, with the same parameters.
         *
         * Fails if there are insufficient funds to pay for deposit.
         */
        create_pure: TxDescriptor<Anonymize<I88pucb8kov85q>>;
        /**
         * Removes a previously spawned pure proxy.
         *
         * WARNING: **All access to this account will be lost.** Any funds held in it will be
         * inaccessible.
         *
         * Requires a `Signed` origin, and the sender account must have been created by a call to
         * `pure` with corresponding parameters.
         *
         * - `spawner`: The account that originally called `pure` to create this account.
         * - `index`: The disambiguation index originally passed to `pure`. Probably `0`.
         * - `proxy_type`: The proxy type originally passed to `pure`.
         * - `height`: The height of the chain when the call to `pure` was processed.
         * - `ext_index`: The extrinsic index in which the call to `pure` was processed.
         *
         * Fails with `NoPermission` in case the caller is not a previously created pure
         * account whose `pure` call has corresponding parameters.
         */
        kill_pure: TxDescriptor<Anonymize<I6pj68nqoamrv3>>;
        /**
         * Publish the hash of a proxy-call that will be made in the future.
         *
         * This must be called some number of blocks before the corresponding `proxy` is attempted
         * if the delay associated with the proxy relationship is greater than zero.
         *
         * No more than `MaxPending` announcements may be made at any one time.
         *
         * This will take a deposit of `AnnouncementDepositFactor` as well as
         * `AnnouncementDepositBase` if there are no other pending announcements.
         *
         * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        announce: TxDescriptor<Anonymize<I2eb501t8s6hsq>>;
        /**
         * Remove a given announcement.
         *
         * May be called by a proxy account to remove a call they previously announced and return
         * the deposit.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        remove_announcement: TxDescriptor<Anonymize<I2eb501t8s6hsq>>;
        /**
         * Remove the given announcement of a delegate.
         *
         * May be called by a target (proxied) account to remove a call that one of their delegates
         * (`delegate`) has announced they want to execute. The deposit is returned.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `delegate`: The account that previously announced the call.
         * - `call_hash`: The hash of the call to be made.
         */
        reject_announcement: TxDescriptor<Anonymize<Ianmuoljk2sk1u>>;
        /**
         * Dispatch the given `call` from an account that the sender is authorized for through
         * `add_proxy`.
         *
         * Removes any corresponding announcement(s).
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        proxy_announced: TxDescriptor<Anonymize<I1j96bgkijv0f7>>;
    };
    Scheduler: {
        /**
         * Anonymously schedule a task.
         */
        schedule: TxDescriptor<Anonymize<Ie70svc64j0nnt>>;
        /**
         * Cancel an anonymously scheduled task.
         */
        cancel: TxDescriptor<Anonymize<I5n4sebgkfr760>>;
        /**
         * Schedule a named task.
         */
        schedule_named: TxDescriptor<Anonymize<I23k0fcc4s93a8>>;
        /**
         * Cancel a named scheduled task.
         */
        cancel_named: TxDescriptor<Anonymize<Ifs1i5fk9cqvr6>>;
        /**
         * Anonymously schedule a task after a delay.
         */
        schedule_after: TxDescriptor<Anonymize<I6pvj8ig4if6s7>>;
        /**
         * Schedule a named task after a delay.
         */
        schedule_named_after: TxDescriptor<Anonymize<Ic5eombv5ft85j>>;
        /**
         * Set a retry configuration for a task so that, in case its scheduled run fails, it will
         * be retried after `period` blocks, for a total amount of `retries` retries or until it
         * succeeds.
         *
         * Tasks which need to be scheduled for a retry are still subject to weight metering and
         * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
         * normally while the task is retrying.
         *
         * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
         * clones of the original task. Their retry configuration will be derived from the
         * original task's configuration, but will have a lower value for `remaining` than the
         * original `total_retries`.
         */
        set_retry: TxDescriptor<Anonymize<Ieg3fd8p4pkt10>>;
        /**
         * Set a retry configuration for a named task so that, in case its scheduled run fails, it
         * will be retried after `period` blocks, for a total amount of `retries` retries or until
         * it succeeds.
         *
         * Tasks which need to be scheduled for a retry are still subject to weight metering and
         * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
         * normally while the task is retrying.
         *
         * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
         * clones of the original task. Their retry configuration will be derived from the
         * original task's configuration, but will have a lower value for `remaining` than the
         * original `total_retries`.
         */
        set_retry_named: TxDescriptor<Anonymize<I8kg5ll427kfqq>>;
        /**
         * Removes the retry configuration of a task.
         */
        cancel_retry: TxDescriptor<Anonymize<I467333262q1l9>>;
        /**
         * Cancel the retry configuration of a named task.
         */
        cancel_retry_named: TxDescriptor<Anonymize<Ifs1i5fk9cqvr6>>;
    };
    ParachainSystem: {
        /**
         * Set the current validation data.
         *
         * This should be invoked exactly once per block. It will panic at the finalization
         * phase if the call was not invoked.
         *
         * The dispatch origin for this call must be `Inherent`
         *
         * As a side effect, this function upgrades the current validation function
         * if the appropriate time has come.
         */
        set_validation_data: TxDescriptor<Anonymize<I60v7bikk54tpu>>;
        /**
        
         */
        sudo_send_upward_message: TxDescriptor<Anonymize<Ifpj261e8s63m3>>;
    };
    Balances: {
        /**
         * Transfer some liquid free balance to another account.
         *
         * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
         * If the sender's account is below the existential deposit as a result
         * of the transfer, the account will be reaped.
         *
         * The dispatch origin for this call must be `Signed` by the transactor.
         */
        transfer_allow_death: TxDescriptor<Anonymize<I4ktuaksf5i1gk>>;
        /**
         * Exactly as `transfer_allow_death`, except the origin must be root and the source account
         * may be specified.
         */
        force_transfer: TxDescriptor<Anonymize<I9bqtpv2ii35mp>>;
        /**
         * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
         * kill the origin account.
         *
         * 99% of the time you want [`transfer_allow_death`] instead.
         *
         * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
         */
        transfer_keep_alive: TxDescriptor<Anonymize<I4ktuaksf5i1gk>>;
        /**
         * Transfer the entire transferable balance from the caller account.
         *
         * NOTE: This function only attempts to transfer _transferable_ balances. This means that
         * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
         * transferred by this function. To ensure that this function results in a killed account,
         * you might need to prepare the account by removing any reference counters, storage
         * deposits, etc...
         *
         * The dispatch origin of this call must be Signed.
         *
         * - `dest`: The recipient of the transfer.
         * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
         * of the funds the account has, causing the sender account to be killed (false), or
         * transfer everything except at least the existential deposit, which will guarantee to
         * keep the sender account alive (true).
         */
        transfer_all: TxDescriptor<Anonymize<I9j7pagd6d4bda>>;
        /**
         * Unreserve some balance from a user by force.
         *
         * Can only be called by ROOT.
         */
        force_unreserve: TxDescriptor<Anonymize<I2h9pmio37r7fb>>;
        /**
         * Upgrade a specified account.
         *
         * - `origin`: Must be `Signed`.
         * - `who`: The account to be upgraded.
         *
         * This will waive the transaction fee if at least all but 10% of the accounts needed to
         * be upgraded. (We let some not have to be upgraded just in order to allow for the
         * possibility of churn).
         */
        upgrade_accounts: TxDescriptor<Anonymize<Ibmr18suc9ikh9>>;
        /**
         * Set the regular balance of a given account.
         *
         * The dispatch origin for this call is `root`.
         */
        force_set_balance: TxDescriptor<Anonymize<I9iq22t0burs89>>;
        /**
         * Adjust the total issuance in a saturating way.
         *
         * Can only be called by root and always needs a positive `delta`.
         *
         * # Example
         */
        force_adjust_total_issuance: TxDescriptor<Anonymize<I5u8olqbbvfnvf>>;
        /**
         * Burn the specified liquid free balance from the origin account.
         *
         * If the origin's account ends up below the existential deposit as a result
         * of the burn and `keep_alive` is false, the account will be reaped.
         *
         * Unlike sending funds to a _burn_ address, which merely makes the funds inaccessible,
         * this `burn` operation will reduce total issuance by the amount _burned_.
         */
        burn: TxDescriptor<Anonymize<I5utcetro501ir>>;
    };
    Vesting: {
        /**
         * Unlock any vested funds of the sender account.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have funds still
         * locked under this pallet.
         *
         * Emits either `VestingCompleted` or `VestingUpdated`.
         *
         * ## Complexity
         * - `O(1)`.
         */
        vest: TxDescriptor<undefined>;
        /**
         * Unlock any vested funds of a `target` account.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `target`: The account whose vested funds should be unlocked. Must have funds still
         * locked under this pallet.
         *
         * Emits either `VestingCompleted` or `VestingUpdated`.
         *
         * ## Complexity
         * - `O(1)`.
         */
        vest_other: TxDescriptor<Anonymize<Id9uqtigc0il3v>>;
        /**
         * Create a vested transfer.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `target`: The account receiving the vested funds.
         * - `schedule`: The vesting schedule attached to the transfer.
         *
         * Emits `VestingCreated`.
         *
         * NOTE: This will unlock all schedules through the current block.
         *
         * ## Complexity
         * - `O(1)`.
         */
        vested_transfer: TxDescriptor<Anonymize<Iaa2o6cgjdpdn5>>;
        /**
         * Force a vested transfer.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * - `source`: The account whose funds should be transferred.
         * - `target`: The account that should be transferred the vested funds.
         * - `schedule`: The vesting schedule attached to the transfer.
         *
         * Emits `VestingCreated`.
         *
         * NOTE: This will unlock all schedules through the current block.
         *
         * ## Complexity
         * - `O(1)`.
         */
        force_vested_transfer: TxDescriptor<Anonymize<Iam6hrl7ptd85l>>;
        /**
         * Merge two vesting schedules together, creating a new vesting schedule that unlocks over
         * the highest possible start and end blocks. If both schedules have already started the
         * current block will be used as the schedule start; with the caveat that if one schedule
         * is finished by the current block, the other will be treated as the new merged schedule,
         * unmodified.
         *
         * NOTE: If `schedule1_index == schedule2_index` this is a no-op.
         * NOTE: This will unlock all schedules through the current block prior to merging.
         * NOTE: If both schedules have ended by the current block, no new schedule will be created
         * and both will be removed.
         *
         * Merged schedule attributes:
         * - `starting_block`: `MAX(schedule1.starting_block, scheduled2.starting_block,
         * current_block)`.
         * - `ending_block`: `MAX(schedule1.ending_block, schedule2.ending_block)`.
         * - `locked`: `schedule1.locked_at(current_block) + schedule2.locked_at(current_block)`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `schedule1_index`: index of the first schedule to merge.
         * - `schedule2_index`: index of the second schedule to merge.
         */
        merge_schedules: TxDescriptor<Anonymize<Ict9ivhr2c5hv0>>;
        /**
         * Force remove a vesting schedule
         *
         * The dispatch origin for this call must be _Root_.
         *
         * - `target`: An account that has a vesting schedule
         * - `schedule_index`: The vesting schedule index that should be removed
         */
        force_remove_vesting_schedule: TxDescriptor<Anonymize<I8t4vv03357lk9>>;
    };
    Inflation: {
        /**
         * Used to force-set the inflation parameters.
         * The parameters must be valid, all parts summing up to one whole (100%), otherwise the call will fail.
         *
         * Must be called by `root` origin.
         *
         * Purpose of the call is testing & handling unforeseen circumstances.
         */
        force_set_inflation_params: TxDescriptor<Anonymize<Icliq7k77rho5u>>;
        /**
         * Used to force inflation recalculation.
         * This is done in the same way as it would be done in an appropriate block, but this call forces it.
         *
         * Must be called by `root` origin.
         *
         * Purpose of the call is testing & handling unforeseen circumstances.
         */
        force_inflation_recalculation: TxDescriptor<Anonymize<I8b3c98srssokg>>;
        /**
         * Re-adjust the existing inflation configuration using the current inflation parameters.
         *
         * It might seem similar to forcing the inflation recalculation, but it's not.
         * This function adjusts the existing configuration, respecting the `max_emission` value used to calculate the current inflation config.
         * (The 'force' approach uses the current total issuance)
         *
         * This call should be used in case inflation parameters have changed during the cycle, and the configuration should be adjusted now.
         *
         * NOTE:
         * The call will do the best possible approximation of what the calculated max emission was at the moment when last inflation recalculation was done.
         * But due to rounding losses, it's not possible to get the exact same value. As a consequence, repeated calls to this function
         * might result in changes to the configuration, even though the inflation parameters haven't changed.
         * However, since this function isn't supposed to be called often, and changes are minimal, this is acceptable.
         */
        force_readjust_config: TxDescriptor<undefined>;
    };
    DappStaking: {
        /**
         * Wrapper around _legacy-like_ `unbond_and_unstake`.
         *
         * Used to support legacy Ledger users so they can start the unlocking process for their funds.
         */
        unbond_and_unstake: TxDescriptor<Anonymize<I4qmlavafr3140>>;
        /**
         * Wrapper around _legacy-like_ `withdraw_unbonded`.
         *
         * Used to support legacy Ledger users so they can reclaim unlocked chunks back into
         * their _transferable_ free balance.
         */
        withdraw_unbonded: TxDescriptor<undefined>;
        /**
         * Used to enable or disable maintenance mode.
         * Can only be called by manager origin.
         */
        maintenance_mode: TxDescriptor<Anonymize<I94dejtmu6d72i>>;
        /**
         * Used to register a new contract for dApp staking.
         *
         * If successful, smart contract will be assigned a simple, unique numerical identifier.
         * Owner is set to be initial beneficiary & manager of the dApp.
         */
        register: TxDescriptor<Anonymize<Iacbdote4b7l9k>>;
        /**
         * Used to modify the reward beneficiary account for a dApp.
         *
         * Caller has to be dApp owner.
         * If set to `None`, rewards will be deposited to the dApp owner.
         * After this call, all existing & future rewards will be paid out to the beneficiary.
         */
        set_dapp_reward_beneficiary: TxDescriptor<Anonymize<I9ed9v9gosmuvf>>;
        /**
         * Used to change dApp owner.
         *
         * Can be called by dApp owner or dApp staking manager origin.
         * This is useful in two cases:
         * 1. when the dApp owner account is compromised, manager can change the owner to a new account
         * 2. if project wants to transfer ownership to a new account (DAO, multisig, etc.).
         */
        set_dapp_owner: TxDescriptor<Anonymize<Ibeb69neo60gk0>>;
        /**
         * Unregister dApp from dApp staking protocol, making it ineligible for future rewards.
         * This doesn't remove the dApp completely from the system just yet, but it can no longer be used for staking.
         *
         * Can be called by dApp staking manager origin.
         */
        unregister: TxDescriptor<Anonymize<I1gnudop2p29el>>;
        /**
         * Locks additional funds into dApp staking.
         *
         * In case caller account doesn't have sufficient balance to cover the specified amount, everything is locked.
         * After adjustment, lock amount must be greater than zero and in total must be equal or greater than the minimum locked amount.
         *
         * Locked amount can immediately be used for staking.
         */
        lock: TxDescriptor<Anonymize<I3qt1hgg4djhgb>>;
        /**
         * Attempts to start the unlocking process for the specified amount.
         *
         * Only the amount that isn't actively used for staking can be unlocked.
         * If the amount is greater than the available amount for unlocking, everything is unlocked.
         * If the remaining locked amount would take the account below the minimum locked amount, everything is unlocked.
         */
        unlock: TxDescriptor<Anonymize<I3qt1hgg4djhgb>>;
        /**
         * Claims all of fully unlocked chunks, removing the lock from them.
         */
        claim_unlocked: TxDescriptor<undefined>;
        /**
        
         */
        relock_unlocking: TxDescriptor<undefined>;
        /**
         * Stake the specified amount on a smart contract.
         * The precise `amount` specified **must** be available for staking.
         * The total amount staked on a dApp must be greater than the minimum required value.
         *
         * Depending on the period type, appropriate stake amount will be updated. During `Voting` subperiod, `voting` stake amount is updated,
         * and same for `Build&Earn` subperiod.
         *
         * Staked amount is only eligible for rewards from the next era onwards.
         */
        stake: TxDescriptor<Anonymize<I3sves7o9bnl87>>;
        /**
         * Unstake the specified amount from a smart contract.
         * The `amount` specified **must** not exceed what's staked, otherwise the call will fail.
         *
         * If unstaking the specified `amount` would take staker below the minimum stake threshold, everything is unstaked.
         *
         * Depending on the period type, appropriate stake amount will be updated.
         * In case amount is unstaked during `Voting` subperiod, the `voting` amount is reduced.
         * In case amount is unstaked during `Build&Earn` subperiod, first the `build_and_earn` is reduced,
         * and any spillover is subtracted from the `voting` amount.
         */
        unstake: TxDescriptor<Anonymize<I3sves7o9bnl87>>;
        /**
         * Claims some staker rewards, if user has any.
         * In the case of a successful call, at least one era will be claimed, with the possibility of multiple claims happening.
         */
        claim_staker_rewards: TxDescriptor<undefined>;
        /**
         * Used to claim bonus reward for a smart contract, if eligible.
         */
        claim_bonus_reward: TxDescriptor<Anonymize<I1gnudop2p29el>>;
        /**
         * Used to claim dApp reward for the specified era.
         */
        claim_dapp_reward: TxDescriptor<Anonymize<Ibo4omgp8fpt5t>>;
        /**
         * Used to unstake funds from a contract that was unregistered after an account staked on it.
         * This is required if staker wants to re-stake these funds on another active contract during the ongoing period.
         */
        unstake_from_unregistered: TxDescriptor<Anonymize<I1gnudop2p29el>>;
        /**
         * Cleanup expired stake entries for the contract.
         *
         * Entry is considered to be expired if:
         * 1. It's from a past period & the account did not maintain an eligible bonus status, meaning there's no claimable bonus reward.
         * 2. It's from a period older than the oldest claimable period, regardless of whether the account had an eligible bonus status or not.
         */
        cleanup_expired_entries: TxDescriptor<undefined>;
        /**
         * Used to force a change of era or subperiod.
         * The effect isn't immediate but will happen on the next block.
         *
         * Used for testing purposes, when we want to force an era change, or a subperiod change.
         * Not intended to be used in production, except in case of unforeseen circumstances.
         *
         * Can only be called by the root origin.
         */
        force: TxDescriptor<Anonymize<Id0smhn7t7eh6l>>;
        /**
         * Claims some staker rewards for the specified account, if they have any.
         * In the case of a successful call, at least one era will be claimed, with the possibility of multiple claims happening.
         */
        claim_staker_rewards_for: TxDescriptor<Anonymize<Icbccs0ug47ilf>>;
        /**
         * Used to claim bonus reward for a smart contract on behalf of the specified account, if eligible.
         */
        claim_bonus_reward_for: TxDescriptor<Anonymize<I88tgaqco9fme4>>;
        /**
         * Transfers stake between two smart contracts, ensuring bonus status preservation if eligible.
         * Emits a `StakeMoved` event.
         */
        move_stake: TxDescriptor<Anonymize<Id8elld05mas9j>>;
        /**
         * Used to set static tier parameters, which are used to calculate tier configuration.
         * Tier configuration defines tier entry threshold values, number of slots, and reward portions.
         *
         * This is a delicate call and great care should be taken when changing these
         * values since it has a significant impact on the reward system.
         */
        set_static_tier_params: TxDescriptor<Anonymize<Iceqdqbv3mc6o0>>;
    };
    Assets: {
        /**
         * Issue a new class of fungible assets from a public origin.
         *
         * This new asset class has no assets initially and its owner is the origin.
         *
         * The origin must conform to the configured `CreateOrigin` and have sufficient funds free.
         *
         * Funds of sender are reserved by `AssetDeposit`.
         *
         * Parameters:
         * - `id`: The identifier of the new asset. This must not be currently in use to identify
         * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
         * - `admin`: The admin of this class of assets. The admin is the initial address of each
         * member of the asset class's admin team.
         * - `min_balance`: The minimum balance of this new asset that any single account must
         * have. If an account's balance is reduced below this, then it collapses to zero.
         *
         * Emits `Created` event when successful.
         *
         * Weight: `O(1)`
         */
        create: TxDescriptor<Anonymize<Idutup0e9rh8so>>;
        /**
         * Issue a new class of fungible assets from a privileged origin.
         *
         * This new asset class has no assets initially.
         *
         * The origin must conform to `ForceOrigin`.
         *
         * Unlike `create`, no funds are reserved.
         *
         * - `id`: The identifier of the new asset. This must not be currently in use to identify
         * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
         * - `owner`: The owner of this class of assets. The owner has full superuser permissions
         * over this asset, but may later change and configure the permissions using
         * `transfer_ownership` and `set_team`.
         * - `min_balance`: The minimum balance of this new asset that any single account must
         * have. If an account's balance is reduced below this, then it collapses to zero.
         *
         * Emits `ForceCreated` event when successful.
         *
         * Weight: `O(1)`
         */
        force_create: TxDescriptor<Anonymize<I6do0sq1390ag>>;
        /**
         * Start the process of destroying a fungible asset class.
         *
         * `start_destroy` is the first in a series of extrinsics that should be called, to allow
         * destruction of an asset class.
         *
         * The origin must conform to `ForceOrigin` or must be `Signed` by the asset's `owner`.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         */
        start_destroy: TxDescriptor<Anonymize<I4ov6e94l79mbg>>;
        /**
         * Destroy all accounts associated with a given asset.
         *
         * `destroy_accounts` should only be called after `start_destroy` has been called, and the
         * asset is in a `Destroying` state.
         *
         * Due to weight restrictions, this function may need to be called multiple times to fully
         * destroy all accounts. It will destroy `RemoveItemsLimit` accounts at a time.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         *
         * Each call emits the `Event::DestroyedAccounts` event.
         */
        destroy_accounts: TxDescriptor<Anonymize<I4ov6e94l79mbg>>;
        /**
         * Destroy all approvals associated with a given asset up to the max (T::RemoveItemsLimit).
         *
         * `destroy_approvals` should only be called after `start_destroy` has been called, and the
         * asset is in a `Destroying` state.
         *
         * Due to weight restrictions, this function may need to be called multiple times to fully
         * destroy all approvals. It will destroy `RemoveItemsLimit` approvals at a time.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         *
         * Each call emits the `Event::DestroyedApprovals` event.
         */
        destroy_approvals: TxDescriptor<Anonymize<I4ov6e94l79mbg>>;
        /**
         * Complete destroying asset and unreserve currency.
         *
         * `finish_destroy` should only be called after `start_destroy` has been called, and the
         * asset is in a `Destroying` state. All accounts or approvals should be destroyed before
         * hand.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         *
         * Each successful call emits the `Event::Destroyed` event.
         */
        finish_destroy: TxDescriptor<Anonymize<I4ov6e94l79mbg>>;
        /**
         * Mint assets of a particular class.
         *
         * The origin must be Signed and the sender must be the Issuer of the asset `id`.
         *
         * - `id`: The identifier of the asset to have some amount minted.
         * - `beneficiary`: The account to be credited with the minted assets.
         * - `amount`: The amount of the asset to be minted.
         *
         * Emits `Issued` event when successful.
         *
         * Weight: `O(1)`
         * Modes: Pre-existing balance of `beneficiary`; Account pre-existence of `beneficiary`.
         */
        mint: TxDescriptor<Anonymize<Ieeuglrrm65jt2>>;
        /**
         * Reduce the balance of `who` by as much as possible up to `amount` assets of `id`.
         *
         * Origin must be Signed and the sender should be the Manager of the asset `id`.
         *
         * Bails with `NoAccount` if the `who` is already dead.
         *
         * - `id`: The identifier of the asset to have some amount burned.
         * - `who`: The account to be debited from.
         * - `amount`: The maximum amount by which `who`'s balance should be reduced.
         *
         * Emits `Burned` with the actual amount burned. If this takes the balance to below the
         * minimum for the asset, then the amount burned is increased to take it to zero.
         *
         * Weight: `O(1)`
         * Modes: Post-existence of `who`; Pre & post Zombie-status of `who`.
         */
        burn: TxDescriptor<Anonymize<I2ft0f2thgfe6s>>;
        /**
         * Move some assets from the sender account to another.
         *
         * Origin must be Signed.
         *
         * - `id`: The identifier of the asset to have some amount transferred.
         * - `target`: The account to be credited.
         * - `amount`: The amount by which the sender's balance of assets should be reduced and
         * `target`'s balance increased. The amount actually transferred may be slightly greater in
         * the case that the transfer would otherwise take the sender balance above zero but below
         * the minimum balance. Must be greater than zero.
         *
         * Emits `Transferred` with the actual amount transferred. If this takes the source balance
         * to below the minimum for the asset, then the amount transferred is increased to take it
         * to zero.
         *
         * Weight: `O(1)`
         * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
         * `target`.
         */
        transfer: TxDescriptor<Anonymize<I6ucaoml0igais>>;
        /**
         * Move some assets from the sender account to another, keeping the sender account alive.
         *
         * Origin must be Signed.
         *
         * - `id`: The identifier of the asset to have some amount transferred.
         * - `target`: The account to be credited.
         * - `amount`: The amount by which the sender's balance of assets should be reduced and
         * `target`'s balance increased. The amount actually transferred may be slightly greater in
         * the case that the transfer would otherwise take the sender balance above zero but below
         * the minimum balance. Must be greater than zero.
         *
         * Emits `Transferred` with the actual amount transferred. If this takes the source balance
         * to below the minimum for the asset, then the amount transferred is increased to take it
         * to zero.
         *
         * Weight: `O(1)`
         * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
         * `target`.
         */
        transfer_keep_alive: TxDescriptor<Anonymize<I6ucaoml0igais>>;
        /**
         * Move some assets from one account to another.
         *
         * Origin must be Signed and the sender should be the Admin of the asset `id`.
         *
         * - `id`: The identifier of the asset to have some amount transferred.
         * - `source`: The account to be debited.
         * - `dest`: The account to be credited.
         * - `amount`: The amount by which the `source`'s balance of assets should be reduced and
         * `dest`'s balance increased. The amount actually transferred may be slightly greater in
         * the case that the transfer would otherwise take the `source` balance above zero but
         * below the minimum balance. Must be greater than zero.
         *
         * Emits `Transferred` with the actual amount transferred. If this takes the source balance
         * to below the minimum for the asset, then the amount transferred is increased to take it
         * to zero.
         *
         * Weight: `O(1)`
         * Modes: Pre-existence of `dest`; Post-existence of `source`; Account pre-existence of
         * `dest`.
         */
        force_transfer: TxDescriptor<Anonymize<I1phnros9ogpsl>>;
        /**
         * Disallow further unprivileged transfers of an asset `id` from an account `who`. `who`
         * must already exist as an entry in `Account`s of the asset. If you want to freeze an
         * account that does not have an entry, use `touch_other` first.
         *
         * Origin must be Signed and the sender should be the Freezer of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         * - `who`: The account to be frozen.
         *
         * Emits `Frozen`.
         *
         * Weight: `O(1)`
         */
        freeze: TxDescriptor<Anonymize<I5rkc9t64qoc30>>;
        /**
         * Allow unprivileged transfers to and from an account again.
         *
         * Origin must be Signed and the sender should be the Admin of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         * - `who`: The account to be unfrozen.
         *
         * Emits `Thawed`.
         *
         * Weight: `O(1)`
         */
        thaw: TxDescriptor<Anonymize<I5rkc9t64qoc30>>;
        /**
         * Disallow further unprivileged transfers for the asset class.
         *
         * Origin must be Signed and the sender should be the Freezer of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         *
         * Emits `Frozen`.
         *
         * Weight: `O(1)`
         */
        freeze_asset: TxDescriptor<Anonymize<I4ov6e94l79mbg>>;
        /**
         * Allow unprivileged transfers for the asset again.
         *
         * Origin must be Signed and the sender should be the Admin of the asset `id`.
         *
         * - `id`: The identifier of the asset to be thawed.
         *
         * Emits `Thawed`.
         *
         * Weight: `O(1)`
         */
        thaw_asset: TxDescriptor<Anonymize<I4ov6e94l79mbg>>;
        /**
         * Change the Owner of an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * - `id`: The identifier of the asset.
         * - `owner`: The new Owner of this asset.
         *
         * Emits `OwnerChanged`.
         *
         * Weight: `O(1)`
         */
        transfer_ownership: TxDescriptor<Anonymize<I9645mveijv32q>>;
        /**
         * Change the Issuer, Admin and Freezer of an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         * - `issuer`: The new Issuer of this asset.
         * - `admin`: The new Admin of this asset.
         * - `freezer`: The new Freezer of this asset.
         *
         * Emits `TeamChanged`.
         *
         * Weight: `O(1)`
         */
        set_team: TxDescriptor<Anonymize<Idod2koqj2eu8c>>;
        /**
         * Set the metadata for an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * Funds of sender are reserved according to the formula:
         * `MetadataDepositBase + MetadataDepositPerByte * (name.len + symbol.len)` taking into
         * account any already reserved funds.
         *
         * - `id`: The identifier of the asset to update.
         * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
         * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
         * - `decimals`: The number of decimals this asset uses to represent one unit.
         *
         * Emits `MetadataSet`.
         *
         * Weight: `O(1)`
         */
        set_metadata: TxDescriptor<Anonymize<I87vll2k0a91o2>>;
        /**
         * Clear the metadata for an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * Any deposit is freed for the asset owner.
         *
         * - `id`: The identifier of the asset to clear.
         *
         * Emits `MetadataCleared`.
         *
         * Weight: `O(1)`
         */
        clear_metadata: TxDescriptor<Anonymize<I4ov6e94l79mbg>>;
        /**
         * Force the metadata for an asset to some value.
         *
         * Origin must be ForceOrigin.
         *
         * Any deposit is left alone.
         *
         * - `id`: The identifier of the asset to update.
         * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
         * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
         * - `decimals`: The number of decimals this asset uses to represent one unit.
         *
         * Emits `MetadataSet`.
         *
         * Weight: `O(N + S)` where N and S are the length of the name and symbol respectively.
         */
        force_set_metadata: TxDescriptor<Anonymize<Iekaug5vo6n1jh>>;
        /**
         * Clear the metadata for an asset.
         *
         * Origin must be ForceOrigin.
         *
         * Any deposit is returned.
         *
         * - `id`: The identifier of the asset to clear.
         *
         * Emits `MetadataCleared`.
         *
         * Weight: `O(1)`
         */
        force_clear_metadata: TxDescriptor<Anonymize<I4ov6e94l79mbg>>;
        /**
         * Alter the attributes of a given asset.
         *
         * Origin must be `ForceOrigin`.
         *
         * - `id`: The identifier of the asset.
         * - `owner`: The new Owner of this asset.
         * - `issuer`: The new Issuer of this asset.
         * - `admin`: The new Admin of this asset.
         * - `freezer`: The new Freezer of this asset.
         * - `min_balance`: The minimum balance of this new asset that any single account must
         * have. If an account's balance is reduced below this, then it collapses to zero.
         * - `is_sufficient`: Whether a non-zero balance of this asset is deposit of sufficient
         * value to account for the state bloat associated with its balance storage. If set to
         * `true`, then non-zero balances may be stored without a `consumer` reference (and thus
         * an ED in the Balances pallet or whatever else is used to control user-account state
         * growth).
         * - `is_frozen`: Whether this asset class is frozen except for permissioned/admin
         * instructions.
         *
         * Emits `AssetStatusChanged` with the identity of the asset.
         *
         * Weight: `O(1)`
         */
        force_asset_status: TxDescriptor<Anonymize<Ia8hsbfe3gjnab>>;
        /**
         * Approve an amount of asset for transfer by a delegated third-party account.
         *
         * Origin must be Signed.
         *
         * Ensures that `ApprovalDeposit` worth of `Currency` is reserved from signing account
         * for the purpose of holding the approval. If some non-zero amount of assets is already
         * approved from signing account to `delegate`, then it is topped up or unreserved to
         * meet the right value.
         *
         * NOTE: The signing account does not need to own `amount` of assets at the point of
         * making this call.
         *
         * - `id`: The identifier of the asset.
         * - `delegate`: The account to delegate permission to transfer asset.
         * - `amount`: The amount of asset that may be transferred by `delegate`. If there is
         * already an approval in place, then this acts additively.
         *
         * Emits `ApprovedTransfer` on success.
         *
         * Weight: `O(1)`
         */
        approve_transfer: TxDescriptor<Anonymize<Ibjm53301mul3h>>;
        /**
         * Cancel all of some asset approved for delegated transfer by a third-party account.
         *
         * Origin must be Signed and there must be an approval in place between signer and
         * `delegate`.
         *
         * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
         *
         * - `id`: The identifier of the asset.
         * - `delegate`: The account delegated permission to transfer asset.
         *
         * Emits `ApprovalCancelled` on success.
         *
         * Weight: `O(1)`
         */
        cancel_approval: TxDescriptor<Anonymize<I9ei5lgjti2qla>>;
        /**
         * Cancel all of some asset approved for delegated transfer by a third-party account.
         *
         * Origin must be either ForceOrigin or Signed origin with the signer being the Admin
         * account of the asset `id`.
         *
         * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
         *
         * - `id`: The identifier of the asset.
         * - `delegate`: The account delegated permission to transfer asset.
         *
         * Emits `ApprovalCancelled` on success.
         *
         * Weight: `O(1)`
         */
        force_cancel_approval: TxDescriptor<Anonymize<I54bd0s1iunkmg>>;
        /**
         * Transfer some asset balance from a previously delegated account to some third-party
         * account.
         *
         * Origin must be Signed and there must be an approval in place by the `owner` to the
         * signer.
         *
         * If the entire amount approved for transfer is transferred, then any deposit previously
         * reserved by `approve_transfer` is unreserved.
         *
         * - `id`: The identifier of the asset.
         * - `owner`: The account which previously approved for a transfer of at least `amount` and
         * from which the asset balance will be withdrawn.
         * - `destination`: The account to which the asset balance of `amount` will be transferred.
         * - `amount`: The amount of assets to transfer.
         *
         * Emits `TransferredApproved` on success.
         *
         * Weight: `O(1)`
         */
        transfer_approved: TxDescriptor<Anonymize<I3mmhckdribrl0>>;
        /**
         * Create an asset account for non-provider assets.
         *
         * A deposit will be taken from the signer account.
         *
         * - `origin`: Must be Signed; the signer account must have sufficient funds for a deposit
         * to be taken.
         * - `id`: The identifier of the asset for the account to be created.
         *
         * Emits `Touched` event when successful.
         */
        touch: TxDescriptor<Anonymize<I4ov6e94l79mbg>>;
        /**
         * Return the deposit (if any) of an asset account or a consumer reference (if any) of an
         * account.
         *
         * The origin must be Signed.
         *
         * - `id`: The identifier of the asset for which the caller would like the deposit
         * refunded.
         * - `allow_burn`: If `true` then assets may be destroyed in order to complete the refund.
         *
         * Emits `Refunded` event when successful.
         */
        refund: TxDescriptor<Anonymize<Ib98qbv23c0tst>>;
        /**
         * Sets the minimum balance of an asset.
         *
         * Only works if there aren't any accounts that are holding the asset or if
         * the new value of `min_balance` is less than the old one.
         *
         * Origin must be Signed and the sender has to be the Owner of the
         * asset `id`.
         *
         * - `id`: The identifier of the asset.
         * - `min_balance`: The new value of `min_balance`.
         *
         * Emits `AssetMinBalanceChanged` event when successful.
         */
        set_min_balance: TxDescriptor<Anonymize<Iebdnbvufodnev>>;
        /**
         * Create an asset account for `who`.
         *
         * A deposit will be taken from the signer account.
         *
         * - `origin`: Must be Signed by `Freezer` or `Admin` of the asset `id`; the signer account
         * must have sufficient funds for a deposit to be taken.
         * - `id`: The identifier of the asset for the account to be created.
         * - `who`: The account to be created.
         *
         * Emits `Touched` event when successful.
         */
        touch_other: TxDescriptor<Anonymize<I5rkc9t64qoc30>>;
        /**
         * Return the deposit (if any) of a target asset account. Useful if you are the depositor.
         *
         * The origin must be Signed and either the account owner, depositor, or asset `Admin`. In
         * order to burn a non-zero balance of the asset, the caller must be the account and should
         * use `refund`.
         *
         * - `id`: The identifier of the asset for the account holding a deposit.
         * - `who`: The account to refund.
         *
         * Emits `Refunded` event when successful.
         */
        refund_other: TxDescriptor<Anonymize<I5rkc9t64qoc30>>;
        /**
         * Disallow further unprivileged transfers of an asset `id` to and from an account `who`.
         *
         * Origin must be Signed and the sender should be the Freezer of the asset `id`.
         *
         * - `id`: The identifier of the account's asset.
         * - `who`: The account to be unblocked.
         *
         * Emits `Blocked`.
         *
         * Weight: `O(1)`
         */
        block: TxDescriptor<Anonymize<I5rkc9t64qoc30>>;
        /**
         * Transfer the entire transferable balance from the caller asset account.
         *
         * NOTE: This function only attempts to transfer _transferable_ balances. This means that
         * any held, frozen, or minimum balance (when `keep_alive` is `true`), will not be
         * transferred by this function. To ensure that this function results in a killed account,
         * you might need to prepare the account by removing any reference counters, storage
         * deposits, etc...
         *
         * The dispatch origin of this call must be Signed.
         *
         * - `id`: The identifier of the asset for the account holding a deposit.
         * - `dest`: The recipient of the transfer.
         * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
         * of the funds the asset account has, causing the sender asset account to be killed
         * (false), or transfer everything except at least the minimum balance, which will
         * guarantee to keep the sender asset account alive (true).
         */
        transfer_all: TxDescriptor<Anonymize<Icfnagtb704sfq>>;
    };
    Oracle: {
        /**
         * Feed the external value.
         *
         * Require authorized operator.
         */
        feed_values: TxDescriptor<Anonymize<Ia5sp8108pom8q>>;
    };
    OracleMembership: {
        /**
         * Add a member `who` to the set.
         *
         * May only be called from `T::AddOrigin`.
         */
        add_member: TxDescriptor<Anonymize<I59bngqm85b22v>>;
        /**
         * Remove a member `who` from the set.
         *
         * May only be called from `T::RemoveOrigin`.
         */
        remove_member: TxDescriptor<Anonymize<I59bngqm85b22v>>;
        /**
         * Swap out one member `remove` for another `add`.
         *
         * May only be called from `T::SwapOrigin`.
         *
         * Prime membership is *not* passed from `remove` to `add`, if extant.
         */
        swap_member: TxDescriptor<Anonymize<I4u4n2na1l5uo7>>;
        /**
         * Change the membership to a new set, disregarding the existing membership. Be nice and
         * pass `members` pre-sorted.
         *
         * May only be called from `T::ResetOrigin`.
         */
        reset_members: TxDescriptor<Anonymize<I3c63j6sh3evqn>>;
        /**
         * Swap out the sending member for some other key `new`.
         *
         * May only be called from `Signed` origin of a current member.
         *
         * Prime membership is passed from the origin account to `new`, if extant.
         */
        change_key: TxDescriptor<Anonymize<I8k3rnvpeeh4hv>>;
        /**
         * Set the prime member. Must be a current member.
         *
         * May only be called from `T::PrimeOrigin`.
         */
        set_prime: TxDescriptor<Anonymize<I59bngqm85b22v>>;
        /**
         * Remove the prime member if it exists.
         *
         * May only be called from `T::PrimeOrigin`.
         */
        clear_prime: TxDescriptor<undefined>;
    };
    CollatorSelection: {
        /**
         * Set the list of invulnerable (fixed) collators.
         */
        set_invulnerables: TxDescriptor<Anonymize<Ifccifqltb5obi>>;
        /**
         * Set the ideal number of collators (not including the invulnerables).
         * If lowering this number, then the number of running collators could be higher than this figure.
         * Aside from that edge case, there should be no other way to have more collators than the desired number.
         */
        set_desired_candidates: TxDescriptor<Anonymize<Iadtsfv699cq8b>>;
        /**
         * Set the candidacy bond amount.
         */
        set_candidacy_bond: TxDescriptor<Anonymize<Ialpmgmhr3gk5r>>;
        /**
         * Register this account as a collator candidate. The account must (a) already have
         * registered session keys and (b) be able to reserve the `CandidacyBond`.
         *
         * This call is not available to `Invulnerable` collators.
         */
        register_as_candidate: TxDescriptor<undefined>;
        /**
         * Deregister `origin` as a collator candidate. Note that the collator can only leave on
         * session change. The `CandidacyBond` will start un-bonding process.
         *
         * This call will fail if the total number of candidates would drop below `MinCandidates`.
         *
         * This call is not available to `Invulnerable` collators.
         */
        leave_intent: TxDescriptor<undefined>;
        /**
         * Withdraw `CandidacyBond` after un-bonding period has finished.
         * This call will fail called during un-bonding or if there's no `CandidacyBound` reserved.
         */
        withdraw_bond: TxDescriptor<undefined>;
        /**
         * Set slash destination.
         * Use `Some` to deposit slashed balance into destination or `None` to burn it.
         */
        set_slash_destination: TxDescriptor<Anonymize<I7q6elfrnn8uq9>>;
        /**
         * Add an invulnerable collator.
         */
        add_invulnerable: TxDescriptor<Anonymize<I4cbvqmqadhrea>>;
        /**
         * Remove an invulnerable collator.
         */
        remove_invulnerable: TxDescriptor<Anonymize<I4cbvqmqadhrea>>;
    };
    Session: {
        /**
         * Sets the session key(s) of the function caller to `keys`.
         * Allows an account to set its session key prior to becoming a validator.
         * This doesn't take effect until the next session.
         *
         * The dispatch origin of this function must be signed.
         *
         * ## Complexity
         * - `O(1)`. Actual cost depends on the number of length of `T::Keys::key_ids()` which is
         * fixed.
         */
        set_keys: TxDescriptor<Anonymize<I81vt5eq60l4b6>>;
        /**
         * Removes any session key(s) of the function caller.
         *
         * This doesn't take effect until the next session.
         *
         * The dispatch origin of this function must be Signed and the account must be either be
         * convertible to a validator ID using the chain's typical addressing system (this usually
         * means being a controller account) or directly convertible into a validator ID (which
         * usually means being a stash account).
         *
         * ## Complexity
         * - `O(1)` in number of key types. Actual cost depends on the number of length of
         * `T::Keys::key_ids()` which is fixed.
         */
        purge_keys: TxDescriptor<undefined>;
    };
    XcmpQueue: {
        /**
         * Suspends all XCM executions for the XCMP queue, regardless of the sender's origin.
         *
         * - `origin`: Must pass `ControllerOrigin`.
         */
        suspend_xcm_execution: TxDescriptor<undefined>;
        /**
         * Resumes all XCM executions for the XCMP queue.
         *
         * Note that this function doesn't change the status of the in/out bound channels.
         *
         * - `origin`: Must pass `ControllerOrigin`.
         */
        resume_xcm_execution: TxDescriptor<undefined>;
        /**
         * Overwrites the number of pages which must be in the queue for the other side to be
         * told to suspend their sending.
         *
         * - `origin`: Must pass `Root`.
         * - `new`: Desired value for `QueueConfigData.suspend_value`
         */
        update_suspend_threshold: TxDescriptor<Anonymize<I3vh014cqgmrfd>>;
        /**
         * Overwrites the number of pages which must be in the queue after which we drop any
         * further messages from the channel.
         *
         * - `origin`: Must pass `Root`.
         * - `new`: Desired value for `QueueConfigData.drop_threshold`
         */
        update_drop_threshold: TxDescriptor<Anonymize<I3vh014cqgmrfd>>;
        /**
         * Overwrites the number of pages which the queue must be reduced to before it signals
         * that message sending may recommence after it has been suspended.
         *
         * - `origin`: Must pass `Root`.
         * - `new`: Desired value for `QueueConfigData.resume_threshold`
         */
        update_resume_threshold: TxDescriptor<Anonymize<I3vh014cqgmrfd>>;
    };
    PolkadotXcm: {
        /**
        
         */
        send: TxDescriptor<Anonymize<Ia5cotcvi888ln>>;
        /**
         * Teleport some assets from the local chain to some destination chain.
         *
         * **This function is deprecated: Use `limited_teleport_assets` instead.**
         *
         * Fee payment on the destination side is made from the asset in the `assets` vector of
         * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
         * with all fees taken as needed from the asset.
         *
         * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
         * - `dest`: Destination context for the assets. Will typically be `[Parent,
         * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
         * relay to parachain.
         * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
         * generally be an `AccountId32` value.
         * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
         * fee on the `dest` chain.
         * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
         * fees.
         */
        teleport_assets: TxDescriptor<Anonymize<I21jsa919m88fd>>;
        /**
         * Transfer some assets from the local chain to the destination chain through their local,
         * destination or remote reserve.
         *
         * `assets` must have same reserve location and may not be teleportable to `dest`.
         * - `assets` have local reserve: transfer assets to sovereign account of destination
         * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
         * assets to `beneficiary`.
         * - `assets` have destination reserve: burn local assets and forward a notification to
         * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
         * deposit them to `beneficiary`.
         * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
         * reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
         * to mint and deposit reserve-based assets to `beneficiary`.
         *
         * **This function is deprecated: Use `limited_reserve_transfer_assets` instead.**
         *
         * Fee payment on the destination side is made from the asset in the `assets` vector of
         * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
         * with all fees taken as needed from the asset.
         *
         * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
         * - `dest`: Destination context for the assets. Will typically be `[Parent,
         * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
         * relay to parachain.
         * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
         * generally be an `AccountId32` value.
         * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
         * fee on the `dest` (and possibly reserve) chains.
         * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
         * fees.
         */
        reserve_transfer_assets: TxDescriptor<Anonymize<I21jsa919m88fd>>;
        /**
         * Execute an XCM message from a local, signed, origin.
         *
         * An event is deposited indicating whether `msg` could be executed completely or only
         * partially.
         *
         * No more than `max_weight` will be used in its attempted execution. If this is less than
         * the maximum amount of weight that the message could take to be executed, then no
         * execution attempt will be made.
         */
        execute: TxDescriptor<Anonymize<Iegif7m3upfe1k>>;
        /**
         * Extoll that a particular destination can be communicated with through a particular
         * version of XCM.
         *
         * - `origin`: Must be an origin specified by AdminOrigin.
         * - `location`: The destination that is being described.
         * - `xcm_version`: The latest version of XCM that `location` supports.
         */
        force_xcm_version: TxDescriptor<Anonymize<I9kt8c221c83ln>>;
        /**
         * Set a safe XCM version (the version that XCM should be encoded with if the most recent
         * version a destination can accept is unknown).
         *
         * - `origin`: Must be an origin specified by AdminOrigin.
         * - `maybe_xcm_version`: The default XCM encoding version, or `None` to disable.
         */
        force_default_xcm_version: TxDescriptor<Anonymize<Ic76kfh5ebqkpl>>;
        /**
         * Ask a location to notify us regarding their XCM version and any changes to it.
         *
         * - `origin`: Must be an origin specified by AdminOrigin.
         * - `location`: The location to which we should subscribe for XCM version notifications.
         */
        force_subscribe_version_notify: TxDescriptor<Anonymize<Icscpmubum33bq>>;
        /**
         * Require that a particular destination should no longer notify us regarding any XCM
         * version changes.
         *
         * - `origin`: Must be an origin specified by AdminOrigin.
         * - `location`: The location to which we are currently subscribed for XCM version
         * notifications which we no longer desire.
         */
        force_unsubscribe_version_notify: TxDescriptor<Anonymize<Icscpmubum33bq>>;
        /**
         * Transfer some assets from the local chain to the destination chain through their local,
         * destination or remote reserve.
         *
         * `assets` must have same reserve location and may not be teleportable to `dest`.
         * - `assets` have local reserve: transfer assets to sovereign account of destination
         * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
         * assets to `beneficiary`.
         * - `assets` have destination reserve: burn local assets and forward a notification to
         * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
         * deposit them to `beneficiary`.
         * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
         * reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
         * to mint and deposit reserve-based assets to `beneficiary`.
         *
         * Fee payment on the destination side is made from the asset in the `assets` vector of
         * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
         * is needed than `weight_limit`, then the operation will fail and the sent assets may be
         * at risk.
         *
         * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
         * - `dest`: Destination context for the assets. Will typically be `[Parent,
         * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
         * relay to parachain.
         * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
         * generally be an `AccountId32` value.
         * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
         * fee on the `dest` (and possibly reserve) chains.
         * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
         * fees.
         * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
         */
        limited_reserve_transfer_assets: TxDescriptor<Anonymize<I21d2olof7eb60>>;
        /**
         * Teleport some assets from the local chain to some destination chain.
         *
         * Fee payment on the destination side is made from the asset in the `assets` vector of
         * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
         * is needed than `weight_limit`, then the operation will fail and the sent assets may be
         * at risk.
         *
         * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
         * - `dest`: Destination context for the assets. Will typically be `[Parent,
         * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
         * relay to parachain.
         * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
         * generally be an `AccountId32` value.
         * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
         * fee on the `dest` chain.
         * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
         * fees.
         * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
         */
        limited_teleport_assets: TxDescriptor<Anonymize<I21d2olof7eb60>>;
        /**
         * Set or unset the global suspension state of the XCM executor.
         *
         * - `origin`: Must be an origin specified by AdminOrigin.
         * - `suspended`: `true` to suspend, `false` to resume.
         */
        force_suspension: TxDescriptor<Anonymize<Ibgm4rnf22lal1>>;
        /**
         * Transfer some assets from the local chain to the destination chain through their local,
         * destination or remote reserve, or through teleports.
         *
         * Fee payment on the destination side is made from the asset in the `assets` vector of
         * index `fee_asset_item` (hence referred to as `fees`), up to enough to pay for
         * `weight_limit` of weight. If more weight is needed than `weight_limit`, then the
         * operation will fail and the sent assets may be at risk.
         *
         * `assets` (excluding `fees`) must have same reserve location or otherwise be teleportable
         * to `dest`, no limitations imposed on `fees`.
         * - for local reserve: transfer assets to sovereign account of destination chain and
         * forward a notification XCM to `dest` to mint and deposit reserve-based assets to
         * `beneficiary`.
         * - for destination reserve: burn local assets and forward a notification to `dest` chain
         * to withdraw the reserve assets from this chain's sovereign account and deposit them
         * to `beneficiary`.
         * - for remote reserve: burn local assets, forward XCM to reserve chain to move reserves
         * from this chain's SA to `dest` chain's SA, and forward another XCM to `dest` to mint
         * and deposit reserve-based assets to `beneficiary`.
         * - for teleports: burn local assets and forward XCM to `dest` chain to mint/teleport
         * assets and deposit them to `beneficiary`.
         *
         * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
         * - `dest`: Destination context for the assets. Will typically be `X2(Parent,
         * Parachain(..))` to send from parachain to parachain, or `X1(Parachain(..))` to send
         * from relay to parachain.
         * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
         * generally be an `AccountId32` value.
         * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
         * fee on the `dest` (and possibly reserve) chains.
         * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
         * fees.
         * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
         */
        transfer_assets: TxDescriptor<Anonymize<I21d2olof7eb60>>;
        /**
         * Claims assets trapped on this pallet because of leftover assets during XCM execution.
         *
         * - `origin`: Anyone can call this extrinsic.
         * - `assets`: The exact assets that were trapped. Use the version to specify what version
         * was the latest when they were trapped.
         * - `beneficiary`: The location/account where the claimed assets will be deposited.
         */
        claim_assets: TxDescriptor<Anonymize<Ie68np0vpihith>>;
        /**
         * Transfer assets from the local chain to the destination chain using explicit transfer
         * types for assets and fees.
         *
         * `assets` must have same reserve location or may be teleportable to `dest`. Caller must
         * provide the `assets_transfer_type` to be used for `assets`:
         * - `TransferType::LocalReserve`: transfer assets to sovereign account of destination
         * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
         * assets to `beneficiary`.
         * - `TransferType::DestinationReserve`: burn local assets and forward a notification to
         * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
         * deposit them to `beneficiary`.
         * - `TransferType::RemoteReserve(reserve)`: burn local assets, forward XCM to `reserve`
         * chain to move reserves from this chain's SA to `dest` chain's SA, and forward another
         * XCM to `dest` to mint and deposit reserve-based assets to `beneficiary`. Typically
         * the remote `reserve` is Asset Hub.
         * - `TransferType::Teleport`: burn local assets and forward XCM to `dest` chain to
         * mint/teleport assets and deposit them to `beneficiary`.
         *
         * On the destination chain, as well as any intermediary hops, `BuyExecution` is used to
         * buy execution using transferred `assets` identified by `remote_fees_id`.
         * Make sure enough of the specified `remote_fees_id` asset is included in the given list
         * of `assets`. `remote_fees_id` should be enough to pay for `weight_limit`. If more weight
         * is needed than `weight_limit`, then the operation will fail and the sent assets may be
         * at risk.
         *
         * `remote_fees_id` may use different transfer type than rest of `assets` and can be
         * specified through `fees_transfer_type`.
         *
         * The caller needs to specify what should happen to the transferred assets once they reach
         * the `dest` chain. This is done through the `custom_xcm_on_dest` parameter, which
         * contains the instructions to execute on `dest` as a final step.
         * This is usually as simple as:
         * `Xcm(vec![DepositAsset { assets: Wild(AllCounted(assets.len())), beneficiary }])`,
         * but could be something more exotic like sending the `assets` even further.
         *
         * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
         * - `dest`: Destination context for the assets. Will typically be `[Parent,
         * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
         * relay to parachain, or `(parents: 2, (GlobalConsensus(..), ..))` to send from
         * parachain across a bridge to another ecosystem destination.
         * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
         * fee on the `dest` (and possibly reserve) chains.
         * - `assets_transfer_type`: The XCM `TransferType` used to transfer the `assets`.
         * - `remote_fees_id`: One of the included `assets` to be used to pay fees.
         * - `fees_transfer_type`: The XCM `TransferType` used to transfer the `fees` assets.
         * - `custom_xcm_on_dest`: The XCM to be executed on `dest` chain as the last step of the
         * transfer, which also determines what happens to the assets on the destination chain.
         * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
         */
        transfer_assets_using_type_and_then: TxDescriptor<Anonymize<I9bnv6lu0crf1q>>;
    };
    XcAssetConfig: {
        /**
         * Register new asset location to asset Id mapping.
         *
         * This makes the asset eligible for XCM interaction.
         */
        register_asset_location: TxDescriptor<Anonymize<I6j92ua76m1ueo>>;
        /**
         * Change the amount of units we are charging per execution second
         * for a given AssetLocation.
         */
        set_asset_units_per_second: TxDescriptor<Anonymize<Ifrvl64m5kq433>>;
        /**
         * Change the xcm type mapping for a given asset Id.
         * The new asset type will inherit old `units per second` value.
         */
        change_existing_asset_location: TxDescriptor<Anonymize<I3anl8n2fnr4bg>>;
        /**
         * Removes asset from the set of supported payment assets.
         *
         * The asset can still be interacted with via XCM but it cannot be used to pay for execution time.
         */
        remove_payment_asset: TxDescriptor<Anonymize<Ibmjtl75ptu606>>;
        /**
         * Removes all information related to asset, removing it from XCM support.
         */
        remove_asset: TxDescriptor<Anonymize<Ib9karr24cpmca>>;
    };
    XTokens: {
        /**
         * Transfer native currencies.
         *
         * `dest_weight_limit` is the weight for XCM execution on the dest
         * chain, and it would be charged from the transferred assets. If set
         * below requirements, the execution may fail and assets wouldn't be
         * received.
         *
         * It's a no-op if any error on local XCM execution or message sending.
         * Note sending assets out per se doesn't guarantee they would be
         * received. Receiving depends on if the XCM message could be delivered
         * by the network, and if the receiving chain would handle
         * messages correctly.
         */
        transfer: TxDescriptor<Anonymize<I17rade5afcmi9>>;
        /**
         * Transfer `Asset`.
         *
         * `dest_weight_limit` is the weight for XCM execution on the dest
         * chain, and it would be charged from the transferred assets. If set
         * below requirements, the execution may fail and assets wouldn't be
         * received.
         *
         * It's a no-op if any error on local XCM execution or message sending.
         * Note sending assets out per se doesn't guarantee they would be
         * received. Receiving depends on if the XCM message could be delivered
         * by the network, and if the receiving chain would handle
         * messages correctly.
         */
        transfer_multiasset: TxDescriptor<Anonymize<Ifpfll8q52l7d8>>;
        /**
         * Transfer native currencies specifying the fee and amount as
         * separate.
         *
         * `dest_weight_limit` is the weight for XCM execution on the dest
         * chain, and it would be charged from the transferred assets. If set
         * below requirements, the execution may fail and assets wouldn't be
         * received.
         *
         * `fee` is the amount to be spent to pay for execution in destination
         * chain. Both fee and amount will be subtracted form the callers
         * balance.
         *
         * If `fee` is not high enough to cover for the execution costs in the
         * destination chain, then the assets will be trapped in the
         * destination chain
         *
         * It's a no-op if any error on local XCM execution or message sending.
         * Note sending assets out per se doesn't guarantee they would be
         * received. Receiving depends on if the XCM message could be delivered
         * by the network, and if the receiving chain would handle
         * messages correctly.
         */
        transfer_with_fee: TxDescriptor<Anonymize<If7739d96jlocs>>;
        /**
         * Transfer `Asset` specifying the fee and amount as separate.
         *
         * `dest_weight_limit` is the weight for XCM execution on the dest
         * chain, and it would be charged from the transferred assets. If set
         * below requirements, the execution may fail and assets wouldn't be
         * received.
         *
         * `fee` is the Asset to be spent to pay for execution in
         * destination chain. Both fee and amount will be subtracted form the
         * callers balance For now we only accept fee and asset having the same
         * `Location` id.
         *
         * If `fee` is not high enough to cover for the execution costs in the
         * destination chain, then the assets will be trapped in the
         * destination chain
         *
         * It's a no-op if any error on local XCM execution or message sending.
         * Note sending assets out per se doesn't guarantee they would be
         * received. Receiving depends on if the XCM message could be delivered
         * by the network, and if the receiving chain would handle
         * messages correctly.
         */
        transfer_multiasset_with_fee: TxDescriptor<Anonymize<Imdvokfbpi0mt>>;
        /**
         * Transfer several currencies specifying the item to be used as fee
         *
         * `dest_weight_limit` is the weight for XCM execution on the dest
         * chain, and it would be charged from the transferred assets. If set
         * below requirements, the execution may fail and assets wouldn't be
         * received.
         *
         * `fee_item` is index of the currencies tuple that we want to use for
         * payment
         *
         * It's a no-op if any error on local XCM execution or message sending.
         * Note sending assets out per se doesn't guarantee they would be
         * received. Receiving depends on if the XCM message could be delivered
         * by the network, and if the receiving chain would handle
         * messages correctly.
         */
        transfer_multicurrencies: TxDescriptor<Anonymize<I4k9cid91h8bup>>;
        /**
         * Transfer several `Asset` specifying the item to be used as fee
         *
         * `dest_weight_limit` is the weight for XCM execution on the dest
         * chain, and it would be charged from the transferred assets. If set
         * below requirements, the execution may fail and assets wouldn't be
         * received.
         *
         * `fee_item` is index of the Assets that we want to use for
         * payment
         *
         * It's a no-op if any error on local XCM execution or message sending.
         * Note sending assets out per se doesn't guarantee they would be
         * received. Receiving depends on if the XCM message could be delivered
         * by the network, and if the receiving chain would handle
         * messages correctly.
         */
        transfer_multiassets: TxDescriptor<Anonymize<Imgcatq9b2cl1>>;
    };
    MessageQueue: {
        /**
         * Remove a page which has no more messages remaining to be processed or is stale.
         */
        reap_page: TxDescriptor<Anonymize<I40pqum1mu8qg3>>;
        /**
         * Execute an overweight message.
         *
         * Temporary processing errors will be propagated whereas permanent errors are treated
         * as success condition.
         *
         * - `origin`: Must be `Signed`.
         * - `message_origin`: The origin from which the message to be executed arrived.
         * - `page`: The page in the queue in which the message to be executed is sitting.
         * - `index`: The index into the queue of the message to be executed.
         * - `weight_limit`: The maximum amount of weight allowed to be consumed in the execution
         * of the message.
         *
         * Benchmark complexity considerations: O(index + weight_limit).
         */
        execute_overweight: TxDescriptor<Anonymize<I1r4c2ghbtvjuc>>;
    };
    EVM: {
        /**
         * Withdraw balance from EVM into currency/balances pallet.
         */
        withdraw: TxDescriptor<Anonymize<Idcabvplu05lea>>;
        /**
         * Issue an EVM call operation. This is similar to a message call transaction in Ethereum.
         */
        call: TxDescriptor<Anonymize<I2ncccle6pmhd9>>;
        /**
         * Issue an EVM create operation. This is similar to a contract creation transaction in
         * Ethereum.
         */
        create: TxDescriptor<Anonymize<I92bnd3pe0civj>>;
        /**
         * Issue an EVM create2 operation.
         */
        create2: TxDescriptor<Anonymize<Ic84i538n8bl8j>>;
    };
    Ethereum: {
        /**
         * Transact an Ethereum transaction.
         */
        transact: TxDescriptor<Anonymize<Ia8ogbeici6lip>>;
    };
    DynamicEvmBaseFee: {
        /**
         * `root-only` extrinsic to set the `base_fee_per_gas` value manually.
         * The specified value has to respect min & max limits configured in the runtime.
         */
        set_base_fee_per_gas: TxDescriptor<Anonymize<I7vi74gbubc8u5>>;
    };
    Contracts: {
        /**
         * Deprecated version if [`Self::call`] for use in an in-storage `Call`.
         */
        call_old_weight: TxDescriptor<Anonymize<Ia2rnh5pfua40a>>;
        /**
         * Deprecated version if [`Self::instantiate_with_code`] for use in an in-storage `Call`.
         */
        instantiate_with_code_old_weight: TxDescriptor<Anonymize<I3otc7e9a35k1k>>;
        /**
         * Deprecated version if [`Self::instantiate`] for use in an in-storage `Call`.
         */
        instantiate_old_weight: TxDescriptor<Anonymize<I89ier5tb9ne0s>>;
        /**
         * Upload new `code` without instantiating a contract from it.
         *
         * If the code does not already exist a deposit is reserved from the caller
         * and unreserved only when [`Self::remove_code`] is called. The size of the reserve
         * depends on the size of the supplied `code`.
         *
         * If the code already exists in storage it will still return `Ok` and upgrades
         * the in storage version to the current
         * [`InstructionWeights::version`](InstructionWeights).
         *
         * - `determinism`: If this is set to any other value but [`Determinism::Enforced`] then
         * the only way to use this code is to delegate call into it from an offchain execution.
         * Set to [`Determinism::Enforced`] if in doubt.
         *
         * # Note
         *
         * Anyone can instantiate a contract from any uploaded code and thus prevent its removal.
         * To avoid this situation a constructor could employ access control so that it can
         * only be instantiated by permissioned entities. The same is true when uploading
         * through [`Self::instantiate_with_code`].
         *
         * Use [`Determinism::Relaxed`] exclusively for non-deterministic code. If the uploaded
         * code is deterministic, specifying [`Determinism::Relaxed`] will be disregarded and
         * result in higher gas costs.
         */
        upload_code: TxDescriptor<Anonymize<Im2f0numhevg3>>;
        /**
         * Remove the code stored under `code_hash` and refund the deposit to its owner.
         *
         * A code can only be removed by its original uploader (its owner) and only if it is
         * not used by any contract.
         */
        remove_code: TxDescriptor<Anonymize<Ib51vk42m1po4n>>;
        /**
         * Privileged function that changes the code of an existing contract.
         *
         * This takes care of updating refcounts and all other necessary operations. Returns
         * an error if either the `code_hash` or `dest` do not exist.
         *
         * # Note
         *
         * This does **not** change the address of the contract in question. This means
         * that the contract address is no longer derived from its code hash after calling
         * this dispatchable.
         */
        set_code: TxDescriptor<Anonymize<I2agkcpojhkk43>>;
        /**
         * Makes a call to an account, optionally transferring some balance.
         *
         * # Parameters
         *
         * * `dest`: Address of the contract to call.
         * * `value`: The balance to transfer from the `origin` to `dest`.
         * * `gas_limit`: The gas limit enforced when executing the constructor.
         * * `storage_deposit_limit`: The maximum amount of balance that can be charged from the
         * caller to pay for the storage consumed.
         * * `data`: The input data to pass to the contract.
         *
         * * If the account is a smart-contract account, the associated code will be
         * executed and any value will be transferred.
         * * If the account is a regular account, any value will be transferred.
         * * If no account exists and the call value is not less than `existential_deposit`,
         * a regular account will be created and any value will be transferred.
         */
        call: TxDescriptor<Anonymize<I32rvg545edabm>>;
        /**
         * Instantiates a new contract from the supplied `code` optionally transferring
         * some balance.
         *
         * This dispatchable has the same effect as calling [`Self::upload_code`] +
         * [`Self::instantiate`]. Bundling them together provides efficiency gains. Please
         * also check the documentation of [`Self::upload_code`].
         *
         * # Parameters
         *
         * * `value`: The balance to transfer from the `origin` to the newly created contract.
         * * `gas_limit`: The gas limit enforced when executing the constructor.
         * * `storage_deposit_limit`: The maximum amount of balance that can be charged/reserved
         * from the caller to pay for the storage consumed.
         * * `code`: The contract code to deploy in raw bytes.
         * * `data`: The input data to pass to the contract constructor.
         * * `salt`: Used for the address derivation. See [`Pallet::contract_address`].
         *
         * Instantiation is executed as follows:
         *
         * - The supplied `code` is deployed, and a `code_hash` is created for that code.
         * - If the `code_hash` already exists on the chain the underlying `code` will be shared.
         * - The destination address is computed based on the sender, code_hash and the salt.
         * - The smart-contract account is created at the computed address.
         * - The `value` is transferred to the new account.
         * - The `deploy` function is executed in the context of the newly-created account.
         */
        instantiate_with_code: TxDescriptor<Anonymize<I83fv0vi59md7i>>;
        /**
         * Instantiates a contract from a previously deployed wasm binary.
         *
         * This function is identical to [`Self::instantiate_with_code`] but without the
         * code deployment step. Instead, the `code_hash` of an on-chain deployed wasm binary
         * must be supplied.
         */
        instantiate: TxDescriptor<Anonymize<I5tjjqcdd4tae0>>;
        /**
         * When a migration is in progress, this dispatchable can be used to run migration steps.
         * Calls that contribute to advancing the migration have their fees waived, as it's helpful
         * for the chain. Note that while the migration is in progress, the pallet will also
         * leverage the `on_idle` hooks to run migration steps.
         */
        migrate: TxDescriptor<Anonymize<I1894dm1lf1ae7>>;
    };
    Preimage: {
        /**
         * Register a preimage on-chain.
         *
         * If the preimage was previously requested, no fees or deposits are taken for providing
         * the preimage. Otherwise, a deposit is taken proportional to the size of the preimage.
         */
        note_preimage: TxDescriptor<Anonymize<I82nfqfkd48n10>>;
        /**
         * Clear an unrequested preimage from the runtime storage.
         *
         * If `len` is provided, then it will be a much cheaper operation.
         *
         * - `hash`: The hash of the preimage to be removed from the store.
         * - `len`: The length of the preimage of `hash`.
         */
        unnote_preimage: TxDescriptor<Anonymize<I1jm8m1rh9e20v>>;
        /**
         * Request a preimage be uploaded to the chain without paying any fees or deposits.
         *
         * If the preimage requests has already been provided on-chain, we unreserve any deposit
         * a user may have paid, and take the control of the preimage out of their hands.
         */
        request_preimage: TxDescriptor<Anonymize<I1jm8m1rh9e20v>>;
        /**
         * Clear a previously made request for a preimage.
         *
         * NOTE: THIS MUST NOT BE CALLED ON `hash` MORE TIMES THAN `request_preimage`.
         */
        unrequest_preimage: TxDescriptor<Anonymize<I1jm8m1rh9e20v>>;
        /**
         * Ensure that the a bulk of pre-images is upgraded.
         *
         * The caller pays no fee if at least 90% of pre-images were successfully updated.
         */
        ensure_updated: TxDescriptor<Anonymize<I3o5j3bli1pd8e>>;
    };
    Sudo: {
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         */
        sudo: TxDescriptor<Anonymize<I5t8a8734unb9r>>;
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         * This function does not check the weight of the call, and instead allows the
         * Sudo user to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        sudo_unchecked_weight: TxDescriptor<Anonymize<Iac53udfpd9th9>>;
        /**
         * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
         * key.
         */
        set_key: TxDescriptor<Anonymize<I8k3rnvpeeh4hv>>;
        /**
         * Authenticates the sudo key and dispatches a function call with `Signed` origin from
         * a given account.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        sudo_as: TxDescriptor<Anonymize<I11daup0eudof7>>;
        /**
         * Permanently removes the sudo key.
         *
         * **This cannot be un-done.**
         */
        remove_key: TxDescriptor<undefined>;
    };
    CouncilMembership: {
        /**
         * Add a member `who` to the set.
         *
         * May only be called from `T::AddOrigin`.
         */
        add_member: TxDescriptor<Anonymize<I59bngqm85b22v>>;
        /**
         * Remove a member `who` from the set.
         *
         * May only be called from `T::RemoveOrigin`.
         */
        remove_member: TxDescriptor<Anonymize<I59bngqm85b22v>>;
        /**
         * Swap out one member `remove` for another `add`.
         *
         * May only be called from `T::SwapOrigin`.
         *
         * Prime membership is *not* passed from `remove` to `add`, if extant.
         */
        swap_member: TxDescriptor<Anonymize<I4u4n2na1l5uo7>>;
        /**
         * Change the membership to a new set, disregarding the existing membership. Be nice and
         * pass `members` pre-sorted.
         *
         * May only be called from `T::ResetOrigin`.
         */
        reset_members: TxDescriptor<Anonymize<I3c63j6sh3evqn>>;
        /**
         * Swap out the sending member for some other key `new`.
         *
         * May only be called from `Signed` origin of a current member.
         *
         * Prime membership is passed from the origin account to `new`, if extant.
         */
        change_key: TxDescriptor<Anonymize<I8k3rnvpeeh4hv>>;
        /**
         * Set the prime member. Must be a current member.
         *
         * May only be called from `T::PrimeOrigin`.
         */
        set_prime: TxDescriptor<Anonymize<I59bngqm85b22v>>;
        /**
         * Remove the prime member if it exists.
         *
         * May only be called from `T::PrimeOrigin`.
         */
        clear_prime: TxDescriptor<undefined>;
    };
    TechnicalCommitteeMembership: {
        /**
         * Add a member `who` to the set.
         *
         * May only be called from `T::AddOrigin`.
         */
        add_member: TxDescriptor<Anonymize<I59bngqm85b22v>>;
        /**
         * Remove a member `who` from the set.
         *
         * May only be called from `T::RemoveOrigin`.
         */
        remove_member: TxDescriptor<Anonymize<I59bngqm85b22v>>;
        /**
         * Swap out one member `remove` for another `add`.
         *
         * May only be called from `T::SwapOrigin`.
         *
         * Prime membership is *not* passed from `remove` to `add`, if extant.
         */
        swap_member: TxDescriptor<Anonymize<I4u4n2na1l5uo7>>;
        /**
         * Change the membership to a new set, disregarding the existing membership. Be nice and
         * pass `members` pre-sorted.
         *
         * May only be called from `T::ResetOrigin`.
         */
        reset_members: TxDescriptor<Anonymize<I3c63j6sh3evqn>>;
        /**
         * Swap out the sending member for some other key `new`.
         *
         * May only be called from `Signed` origin of a current member.
         *
         * Prime membership is passed from the origin account to `new`, if extant.
         */
        change_key: TxDescriptor<Anonymize<I8k3rnvpeeh4hv>>;
        /**
         * Set the prime member. Must be a current member.
         *
         * May only be called from `T::PrimeOrigin`.
         */
        set_prime: TxDescriptor<Anonymize<I59bngqm85b22v>>;
        /**
         * Remove the prime member if it exists.
         *
         * May only be called from `T::PrimeOrigin`.
         */
        clear_prime: TxDescriptor<undefined>;
    };
    CommunityCouncilMembership: {
        /**
         * Add a member `who` to the set.
         *
         * May only be called from `T::AddOrigin`.
         */
        add_member: TxDescriptor<Anonymize<I59bngqm85b22v>>;
        /**
         * Remove a member `who` from the set.
         *
         * May only be called from `T::RemoveOrigin`.
         */
        remove_member: TxDescriptor<Anonymize<I59bngqm85b22v>>;
        /**
         * Swap out one member `remove` for another `add`.
         *
         * May only be called from `T::SwapOrigin`.
         *
         * Prime membership is *not* passed from `remove` to `add`, if extant.
         */
        swap_member: TxDescriptor<Anonymize<I4u4n2na1l5uo7>>;
        /**
         * Change the membership to a new set, disregarding the existing membership. Be nice and
         * pass `members` pre-sorted.
         *
         * May only be called from `T::ResetOrigin`.
         */
        reset_members: TxDescriptor<Anonymize<I3c63j6sh3evqn>>;
        /**
         * Swap out the sending member for some other key `new`.
         *
         * May only be called from `Signed` origin of a current member.
         *
         * Prime membership is passed from the origin account to `new`, if extant.
         */
        change_key: TxDescriptor<Anonymize<I8k3rnvpeeh4hv>>;
        /**
         * Set the prime member. Must be a current member.
         *
         * May only be called from `T::PrimeOrigin`.
         */
        set_prime: TxDescriptor<Anonymize<I59bngqm85b22v>>;
        /**
         * Remove the prime member if it exists.
         *
         * May only be called from `T::PrimeOrigin`.
         */
        clear_prime: TxDescriptor<undefined>;
    };
    Council: {
        /**
         * Set the collective's membership.
         *
         * - `new_members`: The new member list. Be nice to the chain and provide it sorted.
         * - `prime`: The prime member whose vote sets the default.
         * - `old_count`: The upper bound for the previous number of members in storage. Used for
         * weight estimation.
         *
         * The dispatch of this call must be `SetMembersOrigin`.
         *
         * NOTE: Does not enforce the expected `MaxMembers` limit on the amount of members, but
         * the weight estimations rely on it to estimate dispatchable weight.
         *
         * # WARNING:
         *
         * The `pallet-collective` can also be managed by logic outside of the pallet through the
         * implementation of the trait [`ChangeMembers`].
         * Any call to `set_members` must be careful that the member set doesn't get out of sync
         * with other logic managing the member set.
         *
         * ## Complexity:
         * - `O(MP + N)` where:
         * - `M` old-members-count (code- and governance-bounded)
         * - `N` new-members-count (code- and governance-bounded)
         * - `P` proposals-count (code-bounded)
         */
        set_members: TxDescriptor<Anonymize<I38jfk5li8iang>>;
        /**
         * Dispatch a proposal from a member using the `Member` origin.
         *
         * Origin must be a member of the collective.
         *
         * ## Complexity:
         * - `O(B + M + P)` where:
         * - `B` is `proposal` size in bytes (length-fee-bounded)
         * - `M` members-count (code-bounded)
         * - `P` complexity of dispatching `proposal`
         */
        execute: TxDescriptor<Anonymize<Im27nlqnsqokc>>;
        /**
         * Add a new proposal to either be voted on or executed directly.
         *
         * Requires the sender to be member.
         *
         * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
         * or put up for voting.
         *
         * ## Complexity
         * - `O(B + M + P1)` or `O(B + M + P2)` where:
         * - `B` is `proposal` size in bytes (length-fee-bounded)
         * - `M` is members-count (code- and governance-bounded)
         * - branching is influenced by `threshold` where:
         * - `P1` is proposal execution complexity (`threshold < 2`)
         * - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
         */
        propose: TxDescriptor<Anonymize<I8lgulhtal9pjr>>;
        /**
         * Add an aye or nay vote for the sender to the given proposal.
         *
         * Requires the sender to be a member.
         *
         * Transaction fees will be waived if the member is voting on any particular proposal
         * for the first time and the call is successful. Subsequent vote changes will charge a
         * fee.
         * ## Complexity
         * - `O(M)` where `M` is members-count (code- and governance-bounded)
         */
        vote: TxDescriptor<Anonymize<I2dtrijkm5601t>>;
        /**
         * Disapprove a proposal, close, and remove it from the system, regardless of its current
         * state.
         *
         * Must be called by the Root origin.
         *
         * Parameters:
         * * `proposal_hash`: The hash of the proposal that should be disapproved.
         *
         * ## Complexity
         * O(P) where P is the number of max proposals
         */
        disapprove_proposal: TxDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * Close a vote that is either approved, disapproved or whose voting period has ended.
         *
         * May be called by any signed account in order to finish voting and close the proposal.
         *
         * If called before the end of the voting period it will only close the vote if it is
         * has enough votes to be approved or disapproved.
         *
         * If called after the end of the voting period abstentions are counted as rejections
         * unless there is a prime member set and the prime member cast an approval.
         *
         * If the close operation completes successfully with disapproval, the transaction fee will
         * be waived. Otherwise execution of the approved operation will be charged to the caller.
         *
         * + `proposal_weight_bound`: The maximum amount of weight consumed by executing the closed
         * proposal.
         * + `length_bound`: The upper bound for the length of the proposal in storage. Checked via
         * `storage::read` so it is `size_of::<u32>() == 4` larger than the pure length.
         *
         * ## Complexity
         * - `O(B + M + P1 + P2)` where:
         * - `B` is `proposal` size in bytes (length-fee-bounded)
         * - `M` is members-count (code- and governance-bounded)
         * - `P1` is the complexity of `proposal` preimage.
         * - `P2` is proposal-count (code-bounded)
         */
        close: TxDescriptor<Anonymize<Ib2obgji960euh>>;
        /**
         * Disapprove the proposal and burn the cost held for storing this proposal.
         *
         * Parameters:
         * - `origin`: must be the `KillOrigin`.
         * - `proposal_hash`: The hash of the proposal that should be killed.
         *
         * Emits `Killed` and `ProposalCostBurned` if any cost was held for a given proposal.
         */
        kill: TxDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * Release the cost held for storing a proposal once the given proposal is completed.
         *
         * If there is no associated cost for the given proposal, this call will have no effect.
         *
         * Parameters:
         * - `origin`: must be `Signed` or `Root`.
         * - `proposal_hash`: The hash of the proposal.
         *
         * Emits `ProposalCostReleased` if any cost held for a given proposal.
         */
        release_proposal_cost: TxDescriptor<Anonymize<I2ev73t79f46tb>>;
    };
    TechnicalCommittee: {
        /**
         * Set the collective's membership.
         *
         * - `new_members`: The new member list. Be nice to the chain and provide it sorted.
         * - `prime`: The prime member whose vote sets the default.
         * - `old_count`: The upper bound for the previous number of members in storage. Used for
         * weight estimation.
         *
         * The dispatch of this call must be `SetMembersOrigin`.
         *
         * NOTE: Does not enforce the expected `MaxMembers` limit on the amount of members, but
         * the weight estimations rely on it to estimate dispatchable weight.
         *
         * # WARNING:
         *
         * The `pallet-collective` can also be managed by logic outside of the pallet through the
         * implementation of the trait [`ChangeMembers`].
         * Any call to `set_members` must be careful that the member set doesn't get out of sync
         * with other logic managing the member set.
         *
         * ## Complexity:
         * - `O(MP + N)` where:
         * - `M` old-members-count (code- and governance-bounded)
         * - `N` new-members-count (code- and governance-bounded)
         * - `P` proposals-count (code-bounded)
         */
        set_members: TxDescriptor<Anonymize<I38jfk5li8iang>>;
        /**
         * Dispatch a proposal from a member using the `Member` origin.
         *
         * Origin must be a member of the collective.
         *
         * ## Complexity:
         * - `O(B + M + P)` where:
         * - `B` is `proposal` size in bytes (length-fee-bounded)
         * - `M` members-count (code-bounded)
         * - `P` complexity of dispatching `proposal`
         */
        execute: TxDescriptor<Anonymize<Im27nlqnsqokc>>;
        /**
         * Add a new proposal to either be voted on or executed directly.
         *
         * Requires the sender to be member.
         *
         * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
         * or put up for voting.
         *
         * ## Complexity
         * - `O(B + M + P1)` or `O(B + M + P2)` where:
         * - `B` is `proposal` size in bytes (length-fee-bounded)
         * - `M` is members-count (code- and governance-bounded)
         * - branching is influenced by `threshold` where:
         * - `P1` is proposal execution complexity (`threshold < 2`)
         * - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
         */
        propose: TxDescriptor<Anonymize<I8lgulhtal9pjr>>;
        /**
         * Add an aye or nay vote for the sender to the given proposal.
         *
         * Requires the sender to be a member.
         *
         * Transaction fees will be waived if the member is voting on any particular proposal
         * for the first time and the call is successful. Subsequent vote changes will charge a
         * fee.
         * ## Complexity
         * - `O(M)` where `M` is members-count (code- and governance-bounded)
         */
        vote: TxDescriptor<Anonymize<I2dtrijkm5601t>>;
        /**
         * Disapprove a proposal, close, and remove it from the system, regardless of its current
         * state.
         *
         * Must be called by the Root origin.
         *
         * Parameters:
         * * `proposal_hash`: The hash of the proposal that should be disapproved.
         *
         * ## Complexity
         * O(P) where P is the number of max proposals
         */
        disapprove_proposal: TxDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * Close a vote that is either approved, disapproved or whose voting period has ended.
         *
         * May be called by any signed account in order to finish voting and close the proposal.
         *
         * If called before the end of the voting period it will only close the vote if it is
         * has enough votes to be approved or disapproved.
         *
         * If called after the end of the voting period abstentions are counted as rejections
         * unless there is a prime member set and the prime member cast an approval.
         *
         * If the close operation completes successfully with disapproval, the transaction fee will
         * be waived. Otherwise execution of the approved operation will be charged to the caller.
         *
         * + `proposal_weight_bound`: The maximum amount of weight consumed by executing the closed
         * proposal.
         * + `length_bound`: The upper bound for the length of the proposal in storage. Checked via
         * `storage::read` so it is `size_of::<u32>() == 4` larger than the pure length.
         *
         * ## Complexity
         * - `O(B + M + P1 + P2)` where:
         * - `B` is `proposal` size in bytes (length-fee-bounded)
         * - `M` is members-count (code- and governance-bounded)
         * - `P1` is the complexity of `proposal` preimage.
         * - `P2` is proposal-count (code-bounded)
         */
        close: TxDescriptor<Anonymize<Ib2obgji960euh>>;
        /**
         * Disapprove the proposal and burn the cost held for storing this proposal.
         *
         * Parameters:
         * - `origin`: must be the `KillOrigin`.
         * - `proposal_hash`: The hash of the proposal that should be killed.
         *
         * Emits `Killed` and `ProposalCostBurned` if any cost was held for a given proposal.
         */
        kill: TxDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * Release the cost held for storing a proposal once the given proposal is completed.
         *
         * If there is no associated cost for the given proposal, this call will have no effect.
         *
         * Parameters:
         * - `origin`: must be `Signed` or `Root`.
         * - `proposal_hash`: The hash of the proposal.
         *
         * Emits `ProposalCostReleased` if any cost held for a given proposal.
         */
        release_proposal_cost: TxDescriptor<Anonymize<I2ev73t79f46tb>>;
    };
    CommunityCouncil: {
        /**
         * Set the collective's membership.
         *
         * - `new_members`: The new member list. Be nice to the chain and provide it sorted.
         * - `prime`: The prime member whose vote sets the default.
         * - `old_count`: The upper bound for the previous number of members in storage. Used for
         * weight estimation.
         *
         * The dispatch of this call must be `SetMembersOrigin`.
         *
         * NOTE: Does not enforce the expected `MaxMembers` limit on the amount of members, but
         * the weight estimations rely on it to estimate dispatchable weight.
         *
         * # WARNING:
         *
         * The `pallet-collective` can also be managed by logic outside of the pallet through the
         * implementation of the trait [`ChangeMembers`].
         * Any call to `set_members` must be careful that the member set doesn't get out of sync
         * with other logic managing the member set.
         *
         * ## Complexity:
         * - `O(MP + N)` where:
         * - `M` old-members-count (code- and governance-bounded)
         * - `N` new-members-count (code- and governance-bounded)
         * - `P` proposals-count (code-bounded)
         */
        set_members: TxDescriptor<Anonymize<I38jfk5li8iang>>;
        /**
         * Dispatch a proposal from a member using the `Member` origin.
         *
         * Origin must be a member of the collective.
         *
         * ## Complexity:
         * - `O(B + M + P)` where:
         * - `B` is `proposal` size in bytes (length-fee-bounded)
         * - `M` members-count (code-bounded)
         * - `P` complexity of dispatching `proposal`
         */
        execute: TxDescriptor<Anonymize<Im27nlqnsqokc>>;
        /**
         * Add a new proposal to either be voted on or executed directly.
         *
         * Requires the sender to be member.
         *
         * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
         * or put up for voting.
         *
         * ## Complexity
         * - `O(B + M + P1)` or `O(B + M + P2)` where:
         * - `B` is `proposal` size in bytes (length-fee-bounded)
         * - `M` is members-count (code- and governance-bounded)
         * - branching is influenced by `threshold` where:
         * - `P1` is proposal execution complexity (`threshold < 2`)
         * - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
         */
        propose: TxDescriptor<Anonymize<I8lgulhtal9pjr>>;
        /**
         * Add an aye or nay vote for the sender to the given proposal.
         *
         * Requires the sender to be a member.
         *
         * Transaction fees will be waived if the member is voting on any particular proposal
         * for the first time and the call is successful. Subsequent vote changes will charge a
         * fee.
         * ## Complexity
         * - `O(M)` where `M` is members-count (code- and governance-bounded)
         */
        vote: TxDescriptor<Anonymize<I2dtrijkm5601t>>;
        /**
         * Disapprove a proposal, close, and remove it from the system, regardless of its current
         * state.
         *
         * Must be called by the Root origin.
         *
         * Parameters:
         * * `proposal_hash`: The hash of the proposal that should be disapproved.
         *
         * ## Complexity
         * O(P) where P is the number of max proposals
         */
        disapprove_proposal: TxDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * Close a vote that is either approved, disapproved or whose voting period has ended.
         *
         * May be called by any signed account in order to finish voting and close the proposal.
         *
         * If called before the end of the voting period it will only close the vote if it is
         * has enough votes to be approved or disapproved.
         *
         * If called after the end of the voting period abstentions are counted as rejections
         * unless there is a prime member set and the prime member cast an approval.
         *
         * If the close operation completes successfully with disapproval, the transaction fee will
         * be waived. Otherwise execution of the approved operation will be charged to the caller.
         *
         * + `proposal_weight_bound`: The maximum amount of weight consumed by executing the closed
         * proposal.
         * + `length_bound`: The upper bound for the length of the proposal in storage. Checked via
         * `storage::read` so it is `size_of::<u32>() == 4` larger than the pure length.
         *
         * ## Complexity
         * - `O(B + M + P1 + P2)` where:
         * - `B` is `proposal` size in bytes (length-fee-bounded)
         * - `M` is members-count (code- and governance-bounded)
         * - `P1` is the complexity of `proposal` preimage.
         * - `P2` is proposal-count (code-bounded)
         */
        close: TxDescriptor<Anonymize<Ib2obgji960euh>>;
        /**
         * Disapprove the proposal and burn the cost held for storing this proposal.
         *
         * Parameters:
         * - `origin`: must be the `KillOrigin`.
         * - `proposal_hash`: The hash of the proposal that should be killed.
         *
         * Emits `Killed` and `ProposalCostBurned` if any cost was held for a given proposal.
         */
        kill: TxDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * Release the cost held for storing a proposal once the given proposal is completed.
         *
         * If there is no associated cost for the given proposal, this call will have no effect.
         *
         * Parameters:
         * - `origin`: must be `Signed` or `Root`.
         * - `proposal_hash`: The hash of the proposal.
         *
         * Emits `ProposalCostReleased` if any cost held for a given proposal.
         */
        release_proposal_cost: TxDescriptor<Anonymize<I2ev73t79f46tb>>;
    };
    Democracy: {
        /**
         * Propose a sensitive action to be taken.
         *
         * The dispatch origin of this call must be _Signed_ and the sender must
         * have funds to cover the deposit.
         *
         * - `proposal_hash`: The hash of the proposal preimage.
         * - `value`: The amount of deposit (must be at least `MinimumDeposit`).
         *
         * Emits `Proposed`.
         */
        propose: TxDescriptor<Anonymize<I1moso5oagpiea>>;
        /**
         * Signals agreement with a particular proposal.
         *
         * The dispatch origin of this call must be _Signed_ and the sender
         * must have funds to cover the deposit, equal to the original deposit.
         *
         * - `proposal`: The index of the proposal to second.
         */
        second: TxDescriptor<Anonymize<Ibeb4n9vpjefp3>>;
        /**
         * Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
         * otherwise it is a vote to keep the status quo.
         *
         * The dispatch origin of this call must be _Signed_.
         *
         * - `ref_index`: The index of the referendum to vote for.
         * - `vote`: The vote configuration.
         */
        vote: TxDescriptor<Anonymize<Id7murq9s9fg6h>>;
        /**
         * Schedule an emergency cancellation of a referendum. Cannot happen twice to the same
         * referendum.
         *
         * The dispatch origin of this call must be `CancellationOrigin`.
         *
         * -`ref_index`: The index of the referendum to cancel.
         *
         * Weight: `O(1)`.
         */
        emergency_cancel: TxDescriptor<Anonymize<Ied9mja4bq7va8>>;
        /**
         * Schedule a referendum to be tabled once it is legal to schedule an external
         * referendum.
         *
         * The dispatch origin of this call must be `ExternalOrigin`.
         *
         * - `proposal_hash`: The preimage hash of the proposal.
         */
        external_propose: TxDescriptor<Anonymize<I4f7jul8ljs54r>>;
        /**
         * Schedule a majority-carries referendum to be tabled next once it is legal to schedule
         * an external referendum.
         *
         * The dispatch of this call must be `ExternalMajorityOrigin`.
         *
         * - `proposal_hash`: The preimage hash of the proposal.
         *
         * Unlike `external_propose`, blacklisting has no effect on this and it may replace a
         * pre-scheduled `external_propose` call.
         *
         * Weight: `O(1)`
         */
        external_propose_majority: TxDescriptor<Anonymize<I4f7jul8ljs54r>>;
        /**
         * Schedule a negative-turnout-bias referendum to be tabled next once it is legal to
         * schedule an external referendum.
         *
         * The dispatch of this call must be `ExternalDefaultOrigin`.
         *
         * - `proposal_hash`: The preimage hash of the proposal.
         *
         * Unlike `external_propose`, blacklisting has no effect on this and it may replace a
         * pre-scheduled `external_propose` call.
         *
         * Weight: `O(1)`
         */
        external_propose_default: TxDescriptor<Anonymize<I4f7jul8ljs54r>>;
        /**
         * Schedule the currently externally-proposed majority-carries referendum to be tabled
         * immediately. If there is no externally-proposed referendum currently, or if there is one
         * but it is not a majority-carries referendum then it fails.
         *
         * The dispatch of this call must be `FastTrackOrigin`.
         *
         * - `proposal_hash`: The hash of the current external proposal.
         * - `voting_period`: The period that is allowed for voting on this proposal. Increased to
         * Must be always greater than zero.
         * For `FastTrackOrigin` must be equal or greater than `FastTrackVotingPeriod`.
         * - `delay`: The number of block after voting has ended in approval and this should be
         * enacted. This doesn't have a minimum amount.
         *
         * Emits `Started`.
         *
         * Weight: `O(1)`
         */
        fast_track: TxDescriptor<Anonymize<I5agg650597e49>>;
        /**
         * Veto and blacklist the external proposal hash.
         *
         * The dispatch origin of this call must be `VetoOrigin`.
         *
         * - `proposal_hash`: The preimage hash of the proposal to veto and blacklist.
         *
         * Emits `Vetoed`.
         *
         * Weight: `O(V + log(V))` where V is number of `existing vetoers`
         */
        veto_external: TxDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * Remove a referendum.
         *
         * The dispatch origin of this call must be _Root_.
         *
         * - `ref_index`: The index of the referendum to cancel.
         *
         * # Weight: `O(1)`.
         */
        cancel_referendum: TxDescriptor<Anonymize<Ied9mja4bq7va8>>;
        /**
         * Delegate the voting power (with some given conviction) of the sending account.
         *
         * The balance delegated is locked for as long as it's delegated, and thereafter for the
         * time appropriate for the conviction's lock period.
         *
         * The dispatch origin of this call must be _Signed_, and the signing account must either:
         * - be delegating already; or
         * - have no voting activity (if there is, then it will need to be removed/consolidated
         * through `reap_vote` or `unvote`).
         *
         * - `to`: The account whose voting the `target` account's voting power will follow.
         * - `conviction`: The conviction that will be attached to the delegated votes. When the
         * account is undelegated, the funds will be locked for the corresponding period.
         * - `balance`: The amount of the account's balance to be used in delegating. This must not
         * be more than the account's current balance.
         *
         * Emits `Delegated`.
         *
         * Weight: `O(R)` where R is the number of referendums the voter delegating to has
         * voted on. Weight is charged as if maximum votes.
         */
        delegate: TxDescriptor<Anonymize<Ibot4i7a9t6oo8>>;
        /**
         * Undelegate the voting power of the sending account.
         *
         * Tokens may be unlocked following once an amount of time consistent with the lock period
         * of the conviction with which the delegation was issued.
         *
         * The dispatch origin of this call must be _Signed_ and the signing account must be
         * currently delegating.
         *
         * Emits `Undelegated`.
         *
         * Weight: `O(R)` where R is the number of referendums the voter delegating to has
         * voted on. Weight is charged as if maximum votes.
         */
        undelegate: TxDescriptor<undefined>;
        /**
         * Clears all public proposals.
         *
         * The dispatch origin of this call must be _Root_.
         *
         * Weight: `O(1)`.
         */
        clear_public_proposals: TxDescriptor<undefined>;
        /**
         * Unlock tokens that have an expired lock.
         *
         * The dispatch origin of this call must be _Signed_.
         *
         * - `target`: The account to remove the lock on.
         *
         * Weight: `O(R)` with R number of vote of target.
         */
        unlock: TxDescriptor<Anonymize<Id9uqtigc0il3v>>;
        /**
         * Remove a vote for a referendum.
         *
         * If:
         * - the referendum was cancelled, or
         * - the referendum is ongoing, or
         * - the referendum has ended such that
         * - the vote of the account was in opposition to the result; or
         * - there was no conviction to the account's vote; or
         * - the account made a split vote
         * ...then the vote is removed cleanly and a following call to `unlock` may result in more
         * funds being available.
         *
         * If, however, the referendum has ended and:
         * - it finished corresponding to the vote of the account, and
         * - the account made a standard vote with conviction, and
         * - the lock period of the conviction is not over
         * ...then the lock will be aggregated into the overall account's lock, which may involve
         * *overlocking* (where the two locks are combined into a single lock that is the maximum
         * of both the amount locked and the time is it locked for).
         *
         * The dispatch origin of this call must be _Signed_, and the signer must have a vote
         * registered for referendum `index`.
         *
         * - `index`: The index of referendum of the vote to be removed.
         *
         * Weight: `O(R + log R)` where R is the number of referenda that `target` has voted on.
         * Weight is calculated for the maximum number of vote.
         */
        remove_vote: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Remove a vote for a referendum.
         *
         * If the `target` is equal to the signer, then this function is exactly equivalent to
         * `remove_vote`. If not equal to the signer, then the vote must have expired,
         * either because the referendum was cancelled, because the voter lost the referendum or
         * because the conviction period is over.
         *
         * The dispatch origin of this call must be _Signed_.
         *
         * - `target`: The account of the vote to be removed; this account must have voted for
         * referendum `index`.
         * - `index`: The index of referendum of the vote to be removed.
         *
         * Weight: `O(R + log R)` where R is the number of referenda that `target` has voted on.
         * Weight is calculated for the maximum number of vote.
         */
        remove_other_vote: TxDescriptor<Anonymize<I3hsuol7rtl0bj>>;
        /**
         * Permanently place a proposal into the blacklist. This prevents it from ever being
         * proposed again.
         *
         * If called on a queued public or external proposal, then this will result in it being
         * removed. If the `ref_index` supplied is an active referendum with the proposal hash,
         * then it will be cancelled.
         *
         * The dispatch origin of this call must be `BlacklistOrigin`.
         *
         * - `proposal_hash`: The proposal hash to blacklist permanently.
         * - `ref_index`: An ongoing referendum whose hash is `proposal_hash`, which will be
         * cancelled.
         *
         * Weight: `O(p)` (though as this is an high-privilege dispatch, we assume it has a
         * reasonable value).
         */
        blacklist: TxDescriptor<Anonymize<I3v9h9f3mpm1l8>>;
        /**
         * Remove a proposal.
         *
         * The dispatch origin of this call must be `CancelProposalOrigin`.
         *
         * - `prop_index`: The index of the proposal to cancel.
         *
         * Weight: `O(p)` where `p = PublicProps::<T>::decode_len()`
         */
        cancel_proposal: TxDescriptor<Anonymize<I9mnj4k4u8ls2c>>;
        /**
         * Set or clear a metadata of a proposal or a referendum.
         *
         * Parameters:
         * - `origin`: Must correspond to the `MetadataOwner`.
         * - `ExternalOrigin` for an external proposal with the `SuperMajorityApprove`
         * threshold.
         * - `ExternalDefaultOrigin` for an external proposal with the `SuperMajorityAgainst`
         * threshold.
         * - `ExternalMajorityOrigin` for an external proposal with the `SimpleMajority`
         * threshold.
         * - `Signed` by a creator for a public proposal.
         * - `Signed` to clear a metadata for a finished referendum.
         * - `Root` to set a metadata for an ongoing referendum.
         * - `owner`: an identifier of a metadata owner.
         * - `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
         */
        set_metadata: TxDescriptor<Anonymize<I2kt2u1flctk2q>>;
    };
    Treasury: {
        /**
         * Put forward a suggestion for spending.
         *
         * ## Dispatch Origin
         *
         * Must be signed.
         *
         * ## Details
         * A deposit proportional to the value is reserved and slashed if the proposal is rejected.
         * It is returned once the proposal is awarded.
         *
         * ### Complexity
         * - O(1)
         *
         * ## Events
         *
         * Emits [`Event::Proposed`] if successful.
         */
        propose_spend: TxDescriptor<Anonymize<Iffcutbjvs7mcv>>;
        /**
         * Reject a proposed spend.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::RejectOrigin`].
         *
         * ## Details
         * The original deposit will be slashed.
         *
         * ### Complexity
         * - O(1)
         *
         * ## Events
         *
         * Emits [`Event::Rejected`] if successful.
         */
        reject_proposal: TxDescriptor<Anonymize<Icm9m0qeemu66d>>;
        /**
         * Approve a proposal.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::ApproveOrigin`].
         *
         * ## Details
         *
         * At a later time, the proposal will be allocated to the beneficiary and the original
         * deposit will be returned.
         *
         * ### Complexity
         * - O(1).
         *
         * ## Events
         *
         * No events are emitted from this dispatch.
         */
        approve_proposal: TxDescriptor<Anonymize<Icm9m0qeemu66d>>;
    };
    CommunityTreasury: {
        /**
         * Put forward a suggestion for spending.
         *
         * ## Dispatch Origin
         *
         * Must be signed.
         *
         * ## Details
         * A deposit proportional to the value is reserved and slashed if the proposal is rejected.
         * It is returned once the proposal is awarded.
         *
         * ### Complexity
         * - O(1)
         *
         * ## Events
         *
         * Emits [`Event::Proposed`] if successful.
         */
        propose_spend: TxDescriptor<Anonymize<Iffcutbjvs7mcv>>;
        /**
         * Reject a proposed spend.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::RejectOrigin`].
         *
         * ## Details
         * The original deposit will be slashed.
         *
         * ### Complexity
         * - O(1)
         *
         * ## Events
         *
         * Emits [`Event::Rejected`] if successful.
         */
        reject_proposal: TxDescriptor<Anonymize<Icm9m0qeemu66d>>;
        /**
         * Approve a proposal.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::ApproveOrigin`].
         *
         * ## Details
         *
         * At a later time, the proposal will be allocated to the beneficiary and the original
         * deposit will be returned.
         *
         * ### Complexity
         * - O(1).
         *
         * ## Events
         *
         * No events are emitted from this dispatch.
         */
        approve_proposal: TxDescriptor<Anonymize<Icm9m0qeemu66d>>;
    };
    CollectiveProxy: {
        /**
         * Executes the call on a behalf of an aliased account.
         *
         * The `origin` of the call is supposed to be a _collective_ (but can be anything) which can dispatch `call` on behalf of the aliased account.
         * It's essentially a proxy call that can be made by arbitrary origin type.
         */
        execute_call: TxDescriptor<Anonymize<I5t8a8734unb9r>>;
    };
    SafeMode: {
        /**
         * Enter safe-mode permissionlessly for [`Config::EnterDuration`] blocks.
         *
         * Reserves [`Config::EnterDepositAmount`] from the caller's account.
         * Emits an [`Event::Entered`] event on success.
         * Errors with [`Error::Entered`] if the safe-mode is already entered.
         * Errors with [`Error::NotConfigured`] if the deposit amount is `None`.
         */
        enter: TxDescriptor<undefined>;
        /**
         * Enter safe-mode by force for a per-origin configured number of blocks.
         *
         * Emits an [`Event::Entered`] event on success.
         * Errors with [`Error::Entered`] if the safe-mode is already entered.
         *
         * Can only be called by the [`Config::ForceEnterOrigin`] origin.
         */
        force_enter: TxDescriptor<undefined>;
        /**
         * Extend the safe-mode permissionlessly for [`Config::ExtendDuration`] blocks.
         *
         * This accumulates on top of the current remaining duration.
         * Reserves [`Config::ExtendDepositAmount`] from the caller's account.
         * Emits an [`Event::Extended`] event on success.
         * Errors with [`Error::Exited`] if the safe-mode is entered.
         * Errors with [`Error::NotConfigured`] if the deposit amount is `None`.
         *
         * This may be called by any signed origin with [`Config::ExtendDepositAmount`] free
         * currency to reserve. This call can be disabled for all origins by configuring
         * [`Config::ExtendDepositAmount`] to `None`.
         */
        extend: TxDescriptor<undefined>;
        /**
         * Extend the safe-mode by force for a per-origin configured number of blocks.
         *
         * Emits an [`Event::Extended`] event on success.
         * Errors with [`Error::Exited`] if the safe-mode is inactive.
         *
         * Can only be called by the [`Config::ForceExtendOrigin`] origin.
         */
        force_extend: TxDescriptor<undefined>;
        /**
         * Exit safe-mode by force.
         *
         * Emits an [`Event::Exited`] with [`ExitReason::Force`] event on success.
         * Errors with [`Error::Exited`] if the safe-mode is inactive.
         *
         * Note: `safe-mode` will be automatically deactivated by [`Pallet::on_initialize`] hook
         * after the block height is greater than the [`EnteredUntil`] storage item.
         * Emits an [`Event::Exited`] with [`ExitReason::Timeout`] event when deactivated in the
         * hook.
         */
        force_exit: TxDescriptor<undefined>;
        /**
         * Slash a deposit for an account that entered or extended safe-mode at a given
         * historical block.
         *
         * This can only be called while safe-mode is entered.
         *
         * Emits a [`Event::DepositSlashed`] event on success.
         * Errors with [`Error::Entered`] if safe-mode is entered.
         *
         * Can only be called by the [`Config::ForceDepositOrigin`] origin.
         */
        force_slash_deposit: TxDescriptor<Anonymize<I1ssp78ejl639m>>;
        /**
         * Permissionlessly release a deposit for an account that entered safe-mode at a
         * given historical block.
         *
         * The call can be completely disabled by setting [`Config::ReleaseDelay`] to `None`.
         * This cannot be called while safe-mode is entered and not until
         * [`Config::ReleaseDelay`] blocks have passed since safe-mode was entered.
         *
         * Emits a [`Event::DepositReleased`] event on success.
         * Errors with [`Error::Entered`] if the safe-mode is entered.
         * Errors with [`Error::CannotReleaseYet`] if [`Config::ReleaseDelay`] block have not
         * passed since safe-mode was entered. Errors with [`Error::NoDeposit`] if the payee has no
         * reserved currency at the block specified.
         */
        release_deposit: TxDescriptor<Anonymize<I1ssp78ejl639m>>;
        /**
         * Force to release a deposit for an account that entered safe-mode at a given
         * historical block.
         *
         * This can be called while safe-mode is still entered.
         *
         * Emits a [`Event::DepositReleased`] event on success.
         * Errors with [`Error::Entered`] if safe-mode is entered.
         * Errors with [`Error::NoDeposit`] if the payee has no reserved currency at the
         * specified block.
         *
         * Can only be called by the [`Config::ForceDepositOrigin`] origin.
         */
        force_release_deposit: TxDescriptor<Anonymize<I1ssp78ejl639m>>;
    };
    TxPause: {
        /**
         * Pause a call.
         *
         * Can only be called by [`Config::PauseOrigin`].
         * Emits an [`Event::CallPaused`] event on success.
         */
        pause: TxDescriptor<Anonymize<Iba7pefg0d11kh>>;
        /**
         * Un-pause a call.
         *
         * Can only be called by [`Config::UnpauseOrigin`].
         * Emits an [`Event::CallUnpaused`] event on success.
         */
        unpause: TxDescriptor<Anonymize<I2pjehun5ehh5i>>;
    };
    MultiBlockMigrations: {
        /**
         * Allows root to set a cursor to forcefully start, stop or forward the migration process.
         *
         * Should normally not be needed and is only in place as emergency measure. Note that
         * restarting the migration process in this manner will not call the
         * [`MigrationStatusHandler::started`] hook or emit an `UpgradeStarted` event.
         */
        force_set_cursor: TxDescriptor<Anonymize<Ibou4u1engb441>>;
        /**
         * Allows root to set an active cursor to forcefully start/forward the migration process.
         *
         * This is an edge-case version of [`Self::force_set_cursor`] that allows to set the
         * `started_at` value to the next block number. Otherwise this would not be possible, since
         * `force_set_cursor` takes an absolute block number. Setting `started_at` to `None`
         * indicates that the current block number plus one should be used.
         */
        force_set_active_cursor: TxDescriptor<Anonymize<Id6nbvqoqdj4o2>>;
        /**
         * Forces the onboarding of the migrations.
         *
         * This process happens automatically on a runtime upgrade. It is in place as an emergency
         * measurement. The cursor needs to be `None` for this to succeed.
         */
        force_onboard_mbms: TxDescriptor<undefined>;
        /**
         * Clears the `Historic` set.
         *
         * `map_cursor` must be set to the last value that was returned by the
         * `HistoricCleared` event. The first time `None` can be used. `limit` must be chosen in a
         * way that will result in a sensible weight.
         */
        clear_historic: TxDescriptor<Anonymize<I95iqep3b8snn9>>;
    };
};
type IEvent = {
    System: {
        /**
         * An extrinsic completed successfully.
         */
        ExtrinsicSuccess: PlainDescriptor<Anonymize<Ia82mnkmeo2rhc>>;
        /**
         * An extrinsic failed.
         */
        ExtrinsicFailed: PlainDescriptor<Anonymize<I7m2vppkutb3qv>>;
        /**
         * `:code` was updated.
         */
        CodeUpdated: PlainDescriptor<undefined>;
        /**
         * A new account was created.
         */
        NewAccount: PlainDescriptor<Anonymize<Icbccs0ug47ilf>>;
        /**
         * An account was reaped.
         */
        KilledAccount: PlainDescriptor<Anonymize<Icbccs0ug47ilf>>;
        /**
         * On on-chain remark happened.
         */
        Remarked: PlainDescriptor<Anonymize<I855j4i3kr8ko1>>;
        /**
         * An upgrade was authorized.
         */
        UpgradeAuthorized: PlainDescriptor<Anonymize<Ibgl04rn6nbfm6>>;
    };
    Utility: {
        /**
         * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
         * well as the error.
         */
        BatchInterrupted: PlainDescriptor<Anonymize<Iahk6du72h73nk>>;
        /**
         * Batch of dispatches completed fully with no error.
         */
        BatchCompleted: PlainDescriptor<undefined>;
        /**
         * Batch of dispatches completed but has errors.
         */
        BatchCompletedWithErrors: PlainDescriptor<undefined>;
        /**
         * A single item within a Batch of dispatches has completed with no error.
         */
        ItemCompleted: PlainDescriptor<undefined>;
        /**
         * A single item within a Batch of dispatches has completed with error.
         */
        ItemFailed: PlainDescriptor<Anonymize<I2pimctgscuvih>>;
        /**
         * A call was dispatched.
         */
        DispatchedAs: PlainDescriptor<Anonymize<Ib3728pnlm2cie>>;
    };
    Identity: {
        /**
         * A name was set or reset (which will remove all judgements).
         */
        IdentitySet: PlainDescriptor<Anonymize<I4cbvqmqadhrea>>;
        /**
         * A name was cleared, and the given balance returned.
         */
        IdentityCleared: PlainDescriptor<Anonymize<Iep1lmt6q3s6r3>>;
        /**
         * A name was removed and the given balance slashed.
         */
        IdentityKilled: PlainDescriptor<Anonymize<Iep1lmt6q3s6r3>>;
        /**
         * A judgement was asked from a registrar.
         */
        JudgementRequested: PlainDescriptor<Anonymize<I1fac16213rie2>>;
        /**
         * A judgement request was retracted.
         */
        JudgementUnrequested: PlainDescriptor<Anonymize<I1fac16213rie2>>;
        /**
         * A judgement was given by a registrar.
         */
        JudgementGiven: PlainDescriptor<Anonymize<Ifjt77oc391o43>>;
        /**
         * A registrar was added.
         */
        RegistrarAdded: PlainDescriptor<Anonymize<Itvt1jsipv0lc>>;
        /**
         * A sub-identity was added to an identity and the deposit paid.
         */
        SubIdentityAdded: PlainDescriptor<Anonymize<Ick3mveut33f44>>;
        /**
         * An account's sub-identities were set (in bulk).
         */
        SubIdentitiesSet: PlainDescriptor<Anonymize<I719lqkkbtikbl>>;
        /**
         * A given sub-account's associated name was changed by its super-identity.
         */
        SubIdentityRenamed: PlainDescriptor<Anonymize<Ie4intrc3n8jfu>>;
        /**
         * A sub-identity was removed from an identity and the deposit freed.
         */
        SubIdentityRemoved: PlainDescriptor<Anonymize<Ick3mveut33f44>>;
        /**
         * A sub-identity was cleared, and the given deposit repatriated from the
         * main identity account to the sub-identity account.
         */
        SubIdentityRevoked: PlainDescriptor<Anonymize<Ick3mveut33f44>>;
        /**
         * A username authority was added.
         */
        AuthorityAdded: PlainDescriptor<Anonymize<I2rg5btjrsqec0>>;
        /**
         * A username authority was removed.
         */
        AuthorityRemoved: PlainDescriptor<Anonymize<I2rg5btjrsqec0>>;
        /**
         * A username was set for `who`.
         */
        UsernameSet: PlainDescriptor<Anonymize<Ibdqerrooruuq9>>;
        /**
         * A username was queued, but `who` must accept it prior to `expiration`.
         */
        UsernameQueued: PlainDescriptor<Anonymize<I8u2ba9jeiu6q0>>;
        /**
         * A queued username passed its expiration without being claimed and was removed.
         */
        PreapprovalExpired: PlainDescriptor<Anonymize<I7ieadb293k6b4>>;
        /**
         * A username was set as a primary and can be looked up from `who`.
         */
        PrimaryUsernameSet: PlainDescriptor<Anonymize<Ibdqerrooruuq9>>;
        /**
         * A dangling username (as in, a username corresponding to an account that has removed its
         * identity) has been removed.
         */
        DanglingUsernameRemoved: PlainDescriptor<Anonymize<Ibdqerrooruuq9>>;
        /**
         * A username has been unbound.
         */
        UsernameUnbound: PlainDescriptor<Anonymize<Ie5l999tf7t2te>>;
        /**
         * A username has been removed.
         */
        UsernameRemoved: PlainDescriptor<Anonymize<Ie5l999tf7t2te>>;
        /**
         * A username has been killed.
         */
        UsernameKilled: PlainDescriptor<Anonymize<Ie5l999tf7t2te>>;
    };
    Multisig: {
        /**
         * A new multisig operation has begun.
         */
        NewMultisig: PlainDescriptor<Anonymize<Iep27ialq4a7o7>>;
        /**
         * A multisig operation has been approved by someone.
         */
        MultisigApproval: PlainDescriptor<Anonymize<Iasu5jvoqr43mv>>;
        /**
         * A multisig operation has been executed.
         */
        MultisigExecuted: PlainDescriptor<Anonymize<I4mhgno6m7svl3>>;
        /**
         * A multisig operation has been cancelled.
         */
        MultisigCancelled: PlainDescriptor<Anonymize<I5qolde99acmd1>>;
    };
    Proxy: {
        /**
         * A proxy was executed correctly, with the given.
         */
        ProxyExecuted: PlainDescriptor<Anonymize<Ib3728pnlm2cie>>;
        /**
         * A pure account has been created by new proxy with given
         * disambiguation index and proxy type.
         */
        PureCreated: PlainDescriptor<Anonymize<Ie4bpt9qlkevto>>;
        /**
         * An announcement was placed to make a call in the future.
         */
        Announced: PlainDescriptor<Anonymize<I2ur0oeqg495j8>>;
        /**
         * A proxy was added.
         */
        ProxyAdded: PlainDescriptor<Anonymize<I2r3jv7qp8f8vn>>;
        /**
         * A proxy was removed.
         */
        ProxyRemoved: PlainDescriptor<Anonymize<I2r3jv7qp8f8vn>>;
    };
    Scheduler: {
        /**
         * Scheduled some task.
         */
        Scheduled: PlainDescriptor<Anonymize<I5n4sebgkfr760>>;
        /**
         * Canceled some task.
         */
        Canceled: PlainDescriptor<Anonymize<I5n4sebgkfr760>>;
        /**
         * Dispatched some task.
         */
        Dispatched: PlainDescriptor<Anonymize<I8rvhukgc40f50>>;
        /**
         * Set a retry configuration for some task.
         */
        RetrySet: PlainDescriptor<Anonymize<Ia3c82eadg79bj>>;
        /**
         * Cancel a retry configuration for some task.
         */
        RetryCancelled: PlainDescriptor<Anonymize<Ienusoeb625ftq>>;
        /**
         * The call for the provided hash was not found so the task has been aborted.
         */
        CallUnavailable: PlainDescriptor<Anonymize<Ienusoeb625ftq>>;
        /**
         * The given task was unable to be renewed since the agenda is full at that block.
         */
        PeriodicFailed: PlainDescriptor<Anonymize<Ienusoeb625ftq>>;
        /**
         * The given task was unable to be retried since the agenda is full at that block or there
         * was not enough weight to reschedule it.
         */
        RetryFailed: PlainDescriptor<Anonymize<Ienusoeb625ftq>>;
        /**
         * The given task can never be executed since it is overweight.
         */
        PermanentlyOverweight: PlainDescriptor<Anonymize<Ienusoeb625ftq>>;
    };
    ParachainSystem: {
        /**
         * The validation function has been scheduled to apply.
         */
        ValidationFunctionStored: PlainDescriptor<undefined>;
        /**
         * The validation function was applied as of the contained relay chain block number.
         */
        ValidationFunctionApplied: PlainDescriptor<Anonymize<Idd7hd99u0ho0n>>;
        /**
         * The relay-chain aborted the upgrade process.
         */
        ValidationFunctionDiscarded: PlainDescriptor<undefined>;
        /**
         * Some downward messages have been received and will be processed.
         */
        DownwardMessagesReceived: PlainDescriptor<Anonymize<Iafscmv8tjf0ou>>;
        /**
         * Downward messages were processed using the given weight.
         */
        DownwardMessagesProcessed: PlainDescriptor<Anonymize<I100l07kaehdlp>>;
        /**
         * An upward message was sent to the relay chain.
         */
        UpwardMessageSent: PlainDescriptor<Anonymize<I6gnbnvip5vvdi>>;
    };
    TransactionPayment: {
        /**
         * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
         * has been paid by `who`.
         */
        TransactionFeePaid: PlainDescriptor<Anonymize<Ier2cke86dqbr2>>;
    };
    Balances: {
        /**
         * An account was created with some free balance.
         */
        Endowed: PlainDescriptor<Anonymize<Icv68aq8841478>>;
        /**
         * An account was removed whose balance was non-zero but below ExistentialDeposit,
         * resulting in an outright loss.
         */
        DustLost: PlainDescriptor<Anonymize<Ic262ibdoec56a>>;
        /**
         * Transfer succeeded.
         */
        Transfer: PlainDescriptor<Anonymize<Iflcfm9b6nlmdd>>;
        /**
         * A balance was set by root.
         */
        BalanceSet: PlainDescriptor<Anonymize<Ijrsf4mnp3eka>>;
        /**
         * Some balance was reserved (moved from free to reserved).
         */
        Reserved: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some balance was unreserved (moved from reserved to free).
         */
        Unreserved: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some balance was moved from the reserve of the first account to the second account.
         * Final argument indicates the destination balance type.
         */
        ReserveRepatriated: PlainDescriptor<Anonymize<I8tjvj9uq4b7hi>>;
        /**
         * Some amount was deposited (e.g. for transaction fees).
         */
        Deposit: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was withdrawn from the account (e.g. for transaction fees).
         */
        Withdraw: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was removed from the account (e.g. for misbehavior).
         */
        Slashed: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was minted into an account.
         */
        Minted: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was burned from an account.
         */
        Burned: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was suspended from an account (it can be restored later).
         */
        Suspended: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was restored into an account.
         */
        Restored: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * An account was upgraded.
         */
        Upgraded: PlainDescriptor<Anonymize<I4cbvqmqadhrea>>;
        /**
         * Total issuance was increased by `amount`, creating a credit to be balanced.
         */
        Issued: PlainDescriptor<Anonymize<I3qt1hgg4djhgb>>;
        /**
         * Total issuance was decreased by `amount`, creating a debt to be balanced.
         */
        Rescinded: PlainDescriptor<Anonymize<I3qt1hgg4djhgb>>;
        /**
         * Some balance was locked.
         */
        Locked: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some balance was unlocked.
         */
        Unlocked: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some balance was frozen.
         */
        Frozen: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some balance was thawed.
         */
        Thawed: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * The `TotalIssuance` was forcefully changed.
         */
        TotalIssuanceForced: PlainDescriptor<Anonymize<I4fooe9dun9o0t>>;
    };
    Vesting: {
        /**
         * The amount vested has been updated. This could indicate a change in funds available.
         * The balance given is the amount which is left unvested (and thus locked).
         */
        VestingUpdated: PlainDescriptor<Anonymize<Ievr89968437gm>>;
        /**
         * An \[account\] has become fully vested.
         */
        VestingCompleted: PlainDescriptor<Anonymize<Icbccs0ug47ilf>>;
    };
    Inflation: {
        /**
         * Inflation parameters have been force changed. This will have effect on the next inflation recalculation.
         */
        InflationParametersForceChanged: PlainDescriptor<undefined>;
        /**
         * Inflation recalculation has been forced.
         */
        ForcedInflationRecalculation: PlainDescriptor<Anonymize<Ibghevfhkqejki>>;
        /**
         * New inflation configuration has been set.
         */
        NewInflationConfiguration: PlainDescriptor<Anonymize<Ibghevfhkqejki>>;
    };
    DappStaking: {
        /**
         * Maintenance mode has been either enabled or disabled.
         */
        MaintenanceMode: PlainDescriptor<Anonymize<I94dejtmu6d72i>>;
        /**
         * New era has started.
         */
        NewEra: PlainDescriptor<Anonymize<I9bur6p3ovq9mo>>;
        /**
         * New subperiod has started.
         */
        NewSubperiod: PlainDescriptor<Anonymize<Id5145c5vjp178>>;
        /**
         * A smart contract has been registered for dApp staking
         */
        DAppRegistered: PlainDescriptor<Anonymize<If1i3n61v0fj26>>;
        /**
         * dApp reward destination has been updated.
         */
        DAppRewardDestinationUpdated: PlainDescriptor<Anonymize<I9ed9v9gosmuvf>>;
        /**
         * dApp owner has been changed.
         */
        DAppOwnerChanged: PlainDescriptor<Anonymize<Ibeb69neo60gk0>>;
        /**
         * dApp has been unregistered
         */
        DAppUnregistered: PlainDescriptor<Anonymize<Ibo4omgp8fpt5t>>;
        /**
         * Account has locked some amount into dApp staking.
         */
        Locked: PlainDescriptor<Anonymize<Ic262ibdoec56a>>;
        /**
         * Account has started the unlocking process for some amount.
         */
        Unlocking: PlainDescriptor<Anonymize<Ic262ibdoec56a>>;
        /**
         * Account has claimed unlocked amount, removing the lock from it.
         */
        ClaimedUnlocked: PlainDescriptor<Anonymize<Ic262ibdoec56a>>;
        /**
         * Account has relocked all of the unlocking chunks.
         */
        Relock: PlainDescriptor<Anonymize<Ic262ibdoec56a>>;
        /**
         * Account has staked some amount on a smart contract.
         */
        Stake: PlainDescriptor<Anonymize<Ie1781ek52afdj>>;
        /**
         * Account has unstaked some amount from a smart contract.
         */
        Unstake: PlainDescriptor<Anonymize<Ie1781ek52afdj>>;
        /**
         * Account has claimed some stake rewards.
         */
        Reward: PlainDescriptor<Anonymize<Ibt2bn2cqg689o>>;
        /**
         * Bonus reward has been paid out to a staker with an eligible bonus status.
         */
        BonusReward: PlainDescriptor<Anonymize<Ia1s76fd38iqae>>;
        /**
         * dApp reward has been paid out to a beneficiary.
         */
        DAppReward: PlainDescriptor<Anonymize<I3lcbm4tpd3c2m>>;
        /**
         * Account has unstaked funds from an unregistered smart contract
         */
        UnstakeFromUnregistered: PlainDescriptor<Anonymize<Ie1781ek52afdj>>;
        /**
         * Some expired stake entries have been removed from storage.
         */
        ExpiredEntriesRemoved: PlainDescriptor<Anonymize<Ibl1gaa0rn2c67>>;
        /**
         * Privileged origin has forced a new era and possibly a subperiod to start from next block.
         */
        Force: PlainDescriptor<Anonymize<Id0smhn7t7eh6l>>;
        /**
         * Account has moved some stake from a source smart contract to a destination smart contract.
         */
        StakeMoved: PlainDescriptor<Anonymize<I1jtn43phq0dpb>>;
        /**
         * Tier parameters, used to calculate tier configuration, have been updated, and will be applicable from next era.
         */
        NewTierParameters: PlainDescriptor<Anonymize<Iceqdqbv3mc6o0>>;
    };
    Assets: {
        /**
         * Some asset class was created.
         */
        Created: PlainDescriptor<Anonymize<I2f09r4lf5jjh9>>;
        /**
         * Some assets were issued.
         */
        Issued: PlainDescriptor<Anonymize<If6m0o1bjubses>>;
        /**
         * Some assets were transferred.
         */
        Transferred: PlainDescriptor<Anonymize<Ica4tsd7r045b4>>;
        /**
         * Some assets were destroyed.
         */
        Burned: PlainDescriptor<Anonymize<I8lqcc9n1bpf10>>;
        /**
         * The management team changed.
         */
        TeamChanged: PlainDescriptor<Anonymize<Ic756ll6rev3et>>;
        /**
         * The owner changed.
         */
        OwnerChanged: PlainDescriptor<Anonymize<Iabgjddlh1k1hp>>;
        /**
         * Some account `who` was frozen.
         */
        Frozen: PlainDescriptor<Anonymize<Ie04jjjrr8q02l>>;
        /**
         * Some account `who` was thawed.
         */
        Thawed: PlainDescriptor<Anonymize<Ie04jjjrr8q02l>>;
        /**
         * Some asset `asset_id` was frozen.
         */
        AssetFrozen: PlainDescriptor<Anonymize<Ib9karr24cpmca>>;
        /**
         * Some asset `asset_id` was thawed.
         */
        AssetThawed: PlainDescriptor<Anonymize<Ib9karr24cpmca>>;
        /**
         * Accounts were destroyed for given asset.
         */
        AccountsDestroyed: PlainDescriptor<Anonymize<Ifstva0urnm27g>>;
        /**
         * Approvals were destroyed for given asset.
         */
        ApprovalsDestroyed: PlainDescriptor<Anonymize<I4lpo3encq7fn8>>;
        /**
         * An asset class is in the process of being destroyed.
         */
        DestructionStarted: PlainDescriptor<Anonymize<Ib9karr24cpmca>>;
        /**
         * An asset class was destroyed.
         */
        Destroyed: PlainDescriptor<Anonymize<Ib9karr24cpmca>>;
        /**
         * Some asset class was force-created.
         */
        ForceCreated: PlainDescriptor<Anonymize<Iabgjddlh1k1hp>>;
        /**
         * New metadata has been set for an asset.
         */
        MetadataSet: PlainDescriptor<Anonymize<Icd1cghie6s8nr>>;
        /**
         * Metadata has been cleared for an asset.
         */
        MetadataCleared: PlainDescriptor<Anonymize<Ib9karr24cpmca>>;
        /**
         * (Additional) funds have been approved for transfer to a destination account.
         */
        ApprovedTransfer: PlainDescriptor<Anonymize<I7vvm3he225ppt>>;
        /**
         * An approval for account `delegate` was cancelled by `owner`.
         */
        ApprovalCancelled: PlainDescriptor<Anonymize<Iaui349lsh3clk>>;
        /**
         * An `amount` was transferred in its entirety from `owner` to `destination` by
         * the approved `delegate`.
         */
        TransferredApproved: PlainDescriptor<Anonymize<Ifbddfv84nkppg>>;
        /**
         * An asset has had its attributes changed by the `Force` origin.
         */
        AssetStatusChanged: PlainDescriptor<Anonymize<Ib9karr24cpmca>>;
        /**
         * The min_balance of an asset has been updated by the asset owner.
         */
        AssetMinBalanceChanged: PlainDescriptor<Anonymize<Iil3sdsh8fk7l>>;
        /**
         * Some account `who` was created with a deposit from `depositor`.
         */
        Touched: PlainDescriptor<Anonymize<I85i3hdo5nsfi5>>;
        /**
         * Some account `who` was blocked.
         */
        Blocked: PlainDescriptor<Anonymize<Ie04jjjrr8q02l>>;
        /**
         * Some assets were deposited (e.g. for transaction fees).
         */
        Deposited: PlainDescriptor<Anonymize<Ic65advfoqjhk7>>;
        /**
         * Some assets were withdrawn from the account (e.g. for transaction fees).
         */
        Withdrawn: PlainDescriptor<Anonymize<Ic65advfoqjhk7>>;
    };
    PriceAggregator: {
        /**
         * New average native currency value has been calculated and pushed into the moving average buffer.
         */
        AverageAggregatedValue: PlainDescriptor<Anonymize<Ie5v6njpckr05b>>;
    };
    Oracle: {
        /**
         * New feed data is submitted.
         */
        NewFeedData: PlainDescriptor<Anonymize<I8sde2gqm7dqqh>>;
    };
    OracleMembership: {
        /**
         * The given member was added; see the transaction for who.
         */
        MemberAdded: PlainDescriptor<undefined>;
        /**
         * The given member was removed; see the transaction for who.
         */
        MemberRemoved: PlainDescriptor<undefined>;
        /**
         * Two members were swapped; see the transaction for who.
         */
        MembersSwapped: PlainDescriptor<undefined>;
        /**
         * The membership was reset; see the transaction for who the new set is.
         */
        MembersReset: PlainDescriptor<undefined>;
        /**
         * One of the members' keys changed.
         */
        KeyChanged: PlainDescriptor<undefined>;
        /**
         * Phantom member, never used.
         */
        Dummy: PlainDescriptor<undefined>;
    };
    CollatorSelection: {
        /**
         * New invulnerables candidates were set.
         */
        NewInvulnerables: PlainDescriptor<Anonymize<Ia2lhg7l2hilo3>>;
        /**
         * The number of desired candidates was set.
         */
        NewDesiredCandidates: PlainDescriptor<number>;
        /**
         * The candidacy bond was set.
         */
        NewCandidacyBond: PlainDescriptor<bigint>;
        /**
         * A new candidate joined.
         */
        CandidateAdded: PlainDescriptor<Anonymize<I95l2k9b1re95f>>;
        /**
         * A candidate was removed.
         */
        CandidateRemoved: PlainDescriptor<SS58String>;
        /**
         * A candidate was slashed.
         */
        CandidateSlashed: PlainDescriptor<SS58String>;
    };
    Session: {
        /**
         * New session has happened. Note that the argument is the session index, not the
         * block number as the type might suggest.
         */
        NewSession: PlainDescriptor<Anonymize<I2hq50pu2kdjpo>>;
    };
    XcmpQueue: {
        /**
         * An HRMP message was sent to a sibling parachain.
         */
        XcmpMessageSent: PlainDescriptor<Anonymize<I137t1cld92pod>>;
    };
    PolkadotXcm: {
        /**
         * Execution of an XCM message was attempted.
         */
        Attempted: PlainDescriptor<Anonymize<Ia72eet39sf8j9>>;
        /**
         * A XCM message was sent.
         */
        Sent: PlainDescriptor<Anonymize<If8u5kl4h8070m>>;
        /**
         * Query response received which does not match a registered query. This may be because a
         * matching query was never registered, it may be because it is a duplicate response, or
         * because the query timed out.
         */
        UnexpectedResponse: PlainDescriptor<Anonymize<Icl7nl1rfeog3i>>;
        /**
         * Query response has been received and is ready for taking with `take_response`. There is
         * no registered notification call.
         */
        ResponseReady: PlainDescriptor<Anonymize<Iasr6pj6shs0fl>>;
        /**
         * Query response has been received and query is removed. The registered notification has
         * been dispatched and executed successfully.
         */
        Notified: PlainDescriptor<Anonymize<I2uqmls7kcdnii>>;
        /**
         * Query response has been received and query is removed. The registered notification
         * could not be dispatched because the dispatch weight is greater than the maximum weight
         * originally budgeted by this runtime for the query result.
         */
        NotifyOverweight: PlainDescriptor<Anonymize<Idg69klialbkb8>>;
        /**
         * Query response has been received and query is removed. There was a general error with
         * dispatching the notification call.
         */
        NotifyDispatchError: PlainDescriptor<Anonymize<I2uqmls7kcdnii>>;
        /**
         * Query response has been received and query is removed. The dispatch was unable to be
         * decoded into a `Call`; this might be due to dispatch function having a signature which
         * is not `(origin, QueryId, Response)`.
         */
        NotifyDecodeFailed: PlainDescriptor<Anonymize<I2uqmls7kcdnii>>;
        /**
         * Expected query response has been received but the origin location of the response does
         * not match that expected. The query remains registered for a later, valid, response to
         * be received and acted upon.
         */
        InvalidResponder: PlainDescriptor<Anonymize<I7r6b7145022pp>>;
        /**
         * Expected query response has been received but the expected origin location placed in
         * storage by this runtime previously cannot be decoded. The query remains registered.
         *
         * This is unexpected (since a location placed in storage in a previously executing
         * runtime should be readable prior to query timeout) and dangerous since the possibly
         * valid response will be dropped. Manual governance intervention is probably going to be
         * needed.
         */
        InvalidResponderVersion: PlainDescriptor<Anonymize<Icl7nl1rfeog3i>>;
        /**
         * Received query response has been read and removed.
         */
        ResponseTaken: PlainDescriptor<Anonymize<I30pg328m00nr3>>;
        /**
         * Some assets have been placed in an asset trap.
         */
        AssetsTrapped: PlainDescriptor<Anonymize<Icmrn7bogp28cs>>;
        /**
         * An XCM version change notification message has been attempted to be sent.
         *
         * The cost of sending it (borne by the chain) is included.
         */
        VersionChangeNotified: PlainDescriptor<Anonymize<I7m9b5plj4h5ot>>;
        /**
         * The supported version of a location has been changed. This might be through an
         * automatic notification or a manual intervention.
         */
        SupportedVersionChanged: PlainDescriptor<Anonymize<I9kt8c221c83ln>>;
        /**
         * A given location which had a version change subscription was dropped owing to an error
         * sending the notification to it.
         */
        NotifyTargetSendFail: PlainDescriptor<Anonymize<I9onhk772nfs4f>>;
        /**
         * A given location which had a version change subscription was dropped owing to an error
         * migrating the location to our new XCM format.
         */
        NotifyTargetMigrationFail: PlainDescriptor<Anonymize<I3l6bnksrmt56r>>;
        /**
         * Expected query response has been received but the expected querier location placed in
         * storage by this runtime previously cannot be decoded. The query remains registered.
         *
         * This is unexpected (since a location placed in storage in a previously executing
         * runtime should be readable prior to query timeout) and dangerous since the possibly
         * valid response will be dropped. Manual governance intervention is probably going to be
         * needed.
         */
        InvalidQuerierVersion: PlainDescriptor<Anonymize<Icl7nl1rfeog3i>>;
        /**
         * Expected query response has been received but the querier location of the response does
         * not match the expected. The query remains registered for a later, valid, response to
         * be received and acted upon.
         */
        InvalidQuerier: PlainDescriptor<Anonymize<Idh09k0l2pmdcg>>;
        /**
         * A remote has requested XCM version change notification from us and we have honored it.
         * A version information message is sent to them and its cost is included.
         */
        VersionNotifyStarted: PlainDescriptor<Anonymize<I7uoiphbm0tj4r>>;
        /**
         * We have requested that a remote chain send us XCM version change notifications.
         */
        VersionNotifyRequested: PlainDescriptor<Anonymize<I7uoiphbm0tj4r>>;
        /**
         * We have requested that a remote chain stops sending us XCM version change
         * notifications.
         */
        VersionNotifyUnrequested: PlainDescriptor<Anonymize<I7uoiphbm0tj4r>>;
        /**
         * Fees were paid from a location for an operation (often for using `SendXcm`).
         */
        FeesPaid: PlainDescriptor<Anonymize<I512p1n7qt24l8>>;
        /**
         * Some assets have been claimed from an asset trap
         */
        AssetsClaimed: PlainDescriptor<Anonymize<Icmrn7bogp28cs>>;
        /**
         * A XCM version migration finished.
         */
        VersionMigrationFinished: PlainDescriptor<Anonymize<I6s1nbislhk619>>;
    };
    CumulusXcm: {
        /**
         * Downward message is invalid XCM.
         * \[ id \]
         */
        InvalidFormat: PlainDescriptor<FixedSizeBinary<32>>;
        /**
         * Downward message is unsupported version of XCM.
         * \[ id \]
         */
        UnsupportedVersion: PlainDescriptor<FixedSizeBinary<32>>;
        /**
         * Downward message executed with the given outcome.
         * \[ id, outcome \]
         */
        ExecutedDownward: PlainDescriptor<Anonymize<Ibeto40kl3r5j7>>;
    };
    XcAssetConfig: {
        /**
         * Registed mapping between asset type and asset Id.
         */
        AssetRegistered: PlainDescriptor<Anonymize<I6j92ua76m1ueo>>;
        /**
         * Changed the amount of units we are charging per execution second for an asset
         */
        UnitsPerSecondChanged: PlainDescriptor<Anonymize<Ifrvl64m5kq433>>;
        /**
         * Changed the asset type mapping for a given asset id
         */
        AssetLocationChanged: PlainDescriptor<Anonymize<I1k922b8al78rb>>;
        /**
         * Supported asset type for fee payment removed.
         */
        SupportedAssetRemoved: PlainDescriptor<Anonymize<Ibmjtl75ptu606>>;
        /**
         * Removed all information related to an asset Id
         */
        AssetRemoved: PlainDescriptor<Anonymize<I6j92ua76m1ueo>>;
    };
    XTokens: {
        /**
         * Transferred `Asset` with fee.
         */
        TransferredAssets: PlainDescriptor<Anonymize<I1hgaklii9a5gl>>;
    };
    MessageQueue: {
        /**
         * Message discarded due to an error in the `MessageProcessor` (usually a format error).
         */
        ProcessingFailed: PlainDescriptor<Anonymize<I1rvj4ubaplho0>>;
        /**
         * Message is processed.
         */
        Processed: PlainDescriptor<Anonymize<Ia3uu7lqcc1q1i>>;
        /**
         * Message placed in overweight queue.
         */
        OverweightEnqueued: PlainDescriptor<Anonymize<I7crucfnonitkn>>;
        /**
         * This page was reaped.
         */
        PageReaped: PlainDescriptor<Anonymize<I7tmrp94r9sq4n>>;
    };
    EVM: {
        /**
         * Ethereum events from contracts.
         */
        Log: PlainDescriptor<Anonymize<Ifmc9boeeia623>>;
        /**
         * A contract has been created at given address.
         */
        Created: PlainDescriptor<Anonymize<Itmchvgqfl28g>>;
        /**
         * A contract was attempted to be created, but the execution failed.
         */
        CreatedFailed: PlainDescriptor<Anonymize<Itmchvgqfl28g>>;
        /**
         * A contract has been executed successfully with states applied.
         */
        Executed: PlainDescriptor<Anonymize<Itmchvgqfl28g>>;
        /**
         * A contract has been executed with errors. States are reverted with only gas fees applied.
         */
        ExecutedFailed: PlainDescriptor<Anonymize<Itmchvgqfl28g>>;
    };
    Ethereum: {
        /**
         * An ethereum transaction was successfully executed.
         */
        Executed: PlainDescriptor<Anonymize<Iea4g5ovhnolus>>;
    };
    DynamicEvmBaseFee: {
        /**
         * New `base fee per gas` value has been force-set.
         */
        NewBaseFeePerGas: PlainDescriptor<Anonymize<I7vi74gbubc8u5>>;
    };
    Contracts: {
        /**
         * Contract deployed by address at the specified address.
         */
        Instantiated: PlainDescriptor<Anonymize<Ie5222qfrr24ek>>;
        /**
         * Contract has been removed.
         *
         * # Note
         *
         * The only way for a contract to be removed and emitting this event is by calling
         * `seal_terminate`.
         */
        Terminated: PlainDescriptor<Anonymize<I28g8sphdu312k>>;
        /**
         * Code with the specified hash has been stored.
         */
        CodeStored: PlainDescriptor<Anonymize<Idqbjt2c6r46t6>>;
        /**
         * A custom event emitted by the contract.
         */
        ContractEmitted: PlainDescriptor<Anonymize<I853aigjva3f0t>>;
        /**
         * A code with the specified hash was removed.
         */
        CodeRemoved: PlainDescriptor<Anonymize<I9uehhems5hkqm>>;
        /**
         * A contract's code was updated.
         */
        ContractCodeUpdated: PlainDescriptor<Anonymize<I7q5qk4uoanhof>>;
        /**
         * A contract was called either by a plain account or another contract.
         *
         * # Note
         *
         * Please keep in mind that like all events this is only emitted for successful
         * calls. This is because on failure all storage changes including events are
         * rolled back.
         */
        Called: PlainDescriptor<Anonymize<Iehpbs40l3jkit>>;
        /**
         * A contract delegate called a code hash.
         *
         * # Note
         *
         * Please keep in mind that like all events this is only emitted for successful
         * calls. This is because on failure all storage changes including events are
         * rolled back.
         */
        DelegateCalled: PlainDescriptor<Anonymize<Idht9upmipvd4j>>;
        /**
         * Some funds have been transferred and held as storage deposit.
         */
        StorageDepositTransferredAndHeld: PlainDescriptor<Anonymize<Iflcfm9b6nlmdd>>;
        /**
         * Some storage deposit funds have been transferred and released.
         */
        StorageDepositTransferredAndReleased: PlainDescriptor<Anonymize<Iflcfm9b6nlmdd>>;
    };
    Preimage: {
        /**
         * A preimage has been noted.
         */
        Noted: PlainDescriptor<Anonymize<I1jm8m1rh9e20v>>;
        /**
         * A preimage has been requested.
         */
        Requested: PlainDescriptor<Anonymize<I1jm8m1rh9e20v>>;
        /**
         * A preimage has ben cleared.
         */
        Cleared: PlainDescriptor<Anonymize<I1jm8m1rh9e20v>>;
    };
    Sudo: {
        /**
         * A sudo call just took place.
         */
        Sudid: PlainDescriptor<Anonymize<I77pq1trv3c4k2>>;
        /**
         * The sudo key has been updated.
         */
        KeyChanged: PlainDescriptor<Anonymize<I5rtkmhm2dng4u>>;
        /**
         * The key was permanently removed.
         */
        KeyRemoved: PlainDescriptor<undefined>;
        /**
         * A [sudo_as](Pallet::sudo_as) call just took place.
         */
        SudoAsDone: PlainDescriptor<Anonymize<I77pq1trv3c4k2>>;
    };
    CouncilMembership: {
        /**
         * The given member was added; see the transaction for who.
         */
        MemberAdded: PlainDescriptor<undefined>;
        /**
         * The given member was removed; see the transaction for who.
         */
        MemberRemoved: PlainDescriptor<undefined>;
        /**
         * Two members were swapped; see the transaction for who.
         */
        MembersSwapped: PlainDescriptor<undefined>;
        /**
         * The membership was reset; see the transaction for who the new set is.
         */
        MembersReset: PlainDescriptor<undefined>;
        /**
         * One of the members' keys changed.
         */
        KeyChanged: PlainDescriptor<undefined>;
        /**
         * Phantom member, never used.
         */
        Dummy: PlainDescriptor<undefined>;
    };
    TechnicalCommitteeMembership: {
        /**
         * The given member was added; see the transaction for who.
         */
        MemberAdded: PlainDescriptor<undefined>;
        /**
         * The given member was removed; see the transaction for who.
         */
        MemberRemoved: PlainDescriptor<undefined>;
        /**
         * Two members were swapped; see the transaction for who.
         */
        MembersSwapped: PlainDescriptor<undefined>;
        /**
         * The membership was reset; see the transaction for who the new set is.
         */
        MembersReset: PlainDescriptor<undefined>;
        /**
         * One of the members' keys changed.
         */
        KeyChanged: PlainDescriptor<undefined>;
        /**
         * Phantom member, never used.
         */
        Dummy: PlainDescriptor<undefined>;
    };
    CommunityCouncilMembership: {
        /**
         * The given member was added; see the transaction for who.
         */
        MemberAdded: PlainDescriptor<undefined>;
        /**
         * The given member was removed; see the transaction for who.
         */
        MemberRemoved: PlainDescriptor<undefined>;
        /**
         * Two members were swapped; see the transaction for who.
         */
        MembersSwapped: PlainDescriptor<undefined>;
        /**
         * The membership was reset; see the transaction for who the new set is.
         */
        MembersReset: PlainDescriptor<undefined>;
        /**
         * One of the members' keys changed.
         */
        KeyChanged: PlainDescriptor<undefined>;
        /**
         * Phantom member, never used.
         */
        Dummy: PlainDescriptor<undefined>;
    };
    Council: {
        /**
         * A motion (given hash) has been proposed (by given account) with a threshold (given
         * `MemberCount`).
         */
        Proposed: PlainDescriptor<Anonymize<Ift6f10887nk72>>;
        /**
         * A motion (given hash) has been voted on by given account, leaving
         * a tally (yes votes and no votes given respectively as `MemberCount`).
         */
        Voted: PlainDescriptor<Anonymize<I7qc53b1tvqjg2>>;
        /**
         * A motion was approved by the required threshold.
         */
        Approved: PlainDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * A motion was not approved by the required threshold.
         */
        Disapproved: PlainDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * A motion was executed; result will be `Ok` if it returned without error.
         */
        Executed: PlainDescriptor<Anonymize<Ib6om1rg7gaum1>>;
        /**
         * A single member did some action; result will be `Ok` if it returned without error.
         */
        MemberExecuted: PlainDescriptor<Anonymize<Ib6om1rg7gaum1>>;
        /**
         * A proposal was closed because its threshold was reached or after its duration was up.
         */
        Closed: PlainDescriptor<Anonymize<Iak7fhrgb9jnnq>>;
        /**
         * A proposal was killed.
         */
        Killed: PlainDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * Some cost for storing a proposal was burned.
         */
        ProposalCostBurned: PlainDescriptor<Anonymize<I9ad1o9mv4cm3>>;
        /**
         * Some cost for storing a proposal was released.
         */
        ProposalCostReleased: PlainDescriptor<Anonymize<I9ad1o9mv4cm3>>;
    };
    TechnicalCommittee: {
        /**
         * A motion (given hash) has been proposed (by given account) with a threshold (given
         * `MemberCount`).
         */
        Proposed: PlainDescriptor<Anonymize<Ift6f10887nk72>>;
        /**
         * A motion (given hash) has been voted on by given account, leaving
         * a tally (yes votes and no votes given respectively as `MemberCount`).
         */
        Voted: PlainDescriptor<Anonymize<I7qc53b1tvqjg2>>;
        /**
         * A motion was approved by the required threshold.
         */
        Approved: PlainDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * A motion was not approved by the required threshold.
         */
        Disapproved: PlainDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * A motion was executed; result will be `Ok` if it returned without error.
         */
        Executed: PlainDescriptor<Anonymize<Ib6om1rg7gaum1>>;
        /**
         * A single member did some action; result will be `Ok` if it returned without error.
         */
        MemberExecuted: PlainDescriptor<Anonymize<Ib6om1rg7gaum1>>;
        /**
         * A proposal was closed because its threshold was reached or after its duration was up.
         */
        Closed: PlainDescriptor<Anonymize<Iak7fhrgb9jnnq>>;
        /**
         * A proposal was killed.
         */
        Killed: PlainDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * Some cost for storing a proposal was burned.
         */
        ProposalCostBurned: PlainDescriptor<Anonymize<I9ad1o9mv4cm3>>;
        /**
         * Some cost for storing a proposal was released.
         */
        ProposalCostReleased: PlainDescriptor<Anonymize<I9ad1o9mv4cm3>>;
    };
    CommunityCouncil: {
        /**
         * A motion (given hash) has been proposed (by given account) with a threshold (given
         * `MemberCount`).
         */
        Proposed: PlainDescriptor<Anonymize<Ift6f10887nk72>>;
        /**
         * A motion (given hash) has been voted on by given account, leaving
         * a tally (yes votes and no votes given respectively as `MemberCount`).
         */
        Voted: PlainDescriptor<Anonymize<I7qc53b1tvqjg2>>;
        /**
         * A motion was approved by the required threshold.
         */
        Approved: PlainDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * A motion was not approved by the required threshold.
         */
        Disapproved: PlainDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * A motion was executed; result will be `Ok` if it returned without error.
         */
        Executed: PlainDescriptor<Anonymize<Ib6om1rg7gaum1>>;
        /**
         * A single member did some action; result will be `Ok` if it returned without error.
         */
        MemberExecuted: PlainDescriptor<Anonymize<Ib6om1rg7gaum1>>;
        /**
         * A proposal was closed because its threshold was reached or after its duration was up.
         */
        Closed: PlainDescriptor<Anonymize<Iak7fhrgb9jnnq>>;
        /**
         * A proposal was killed.
         */
        Killed: PlainDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * Some cost for storing a proposal was burned.
         */
        ProposalCostBurned: PlainDescriptor<Anonymize<I9ad1o9mv4cm3>>;
        /**
         * Some cost for storing a proposal was released.
         */
        ProposalCostReleased: PlainDescriptor<Anonymize<I9ad1o9mv4cm3>>;
    };
    Democracy: {
        /**
         * A motion has been proposed by a public account.
         */
        Proposed: PlainDescriptor<Anonymize<I3peh714diura8>>;
        /**
         * A public proposal has been tabled for referendum vote.
         */
        Tabled: PlainDescriptor<Anonymize<I3peh714diura8>>;
        /**
         * An external proposal has been tabled.
         */
        ExternalTabled: PlainDescriptor<undefined>;
        /**
         * A referendum has begun.
         */
        Started: PlainDescriptor<Anonymize<I62ffgu6q2478o>>;
        /**
         * A proposal has been approved by referendum.
         */
        Passed: PlainDescriptor<Anonymize<Ied9mja4bq7va8>>;
        /**
         * A proposal has been rejected by referendum.
         */
        NotPassed: PlainDescriptor<Anonymize<Ied9mja4bq7va8>>;
        /**
         * A referendum has been cancelled.
         */
        Cancelled: PlainDescriptor<Anonymize<Ied9mja4bq7va8>>;
        /**
         * An account has delegated their vote to another account.
         */
        Delegated: PlainDescriptor<Anonymize<I10r7il4gvbcae>>;
        /**
         * An account has cancelled a previous delegation operation.
         */
        Undelegated: PlainDescriptor<Anonymize<Icbccs0ug47ilf>>;
        /**
         * An external proposal has been vetoed.
         */
        Vetoed: PlainDescriptor<Anonymize<I2c00i2bngegk9>>;
        /**
         * A proposal_hash has been blacklisted permanently.
         */
        Blacklisted: PlainDescriptor<Anonymize<I2ev73t79f46tb>>;
        /**
         * An account has voted in a referendum
         */
        Voted: PlainDescriptor<Anonymize<Iet7kfijhihjik>>;
        /**
         * An account has seconded a proposal
         */
        Seconded: PlainDescriptor<Anonymize<I2vrbos7ogo6ps>>;
        /**
         * A proposal got canceled.
         */
        ProposalCanceled: PlainDescriptor<Anonymize<I9mnj4k4u8ls2c>>;
        /**
         * Metadata for a proposal or a referendum has been set.
         */
        MetadataSet: PlainDescriptor<Anonymize<Iffeo46j957abe>>;
        /**
         * Metadata for a proposal or a referendum has been cleared.
         */
        MetadataCleared: PlainDescriptor<Anonymize<Iffeo46j957abe>>;
        /**
         * Metadata has been transferred to new owner.
         */
        MetadataTransferred: PlainDescriptor<Anonymize<I4ljshcevmm3p2>>;
    };
    Treasury: {
        /**
         * New proposal.
         */
        Proposed: PlainDescriptor<Anonymize<I44hc4lgsn4o1j>>;
        /**
         * We have ended a spend period and will now allocate funds.
         */
        Spending: PlainDescriptor<Anonymize<I8iksqi3eani0a>>;
        /**
         * Some funds have been allocated.
         */
        Awarded: PlainDescriptor<Anonymize<I16enopmju1p0q>>;
        /**
         * A proposal was rejected; funds were slashed.
         */
        Rejected: PlainDescriptor<Anonymize<Ifgqhle2413de7>>;
        /**
         * Some of our funds have been burnt.
         */
        Burnt: PlainDescriptor<Anonymize<I43kq8qudg7pq9>>;
        /**
         * Spending has finished; this is the amount that rolls over until next spend.
         */
        Rollover: PlainDescriptor<Anonymize<I76riseemre533>>;
        /**
         * Some funds have been deposited.
         */
        Deposit: PlainDescriptor<Anonymize<Ie5v6njpckr05b>>;
        /**
         * A new spend proposal has been approved.
         * The inactive funds of the pallet have been updated.
         */
        UpdatedInactive: PlainDescriptor<Anonymize<I4hcillge8de5f>>;
    };
    CommunityTreasury: {
        /**
         * New proposal.
         */
        Proposed: PlainDescriptor<Anonymize<I44hc4lgsn4o1j>>;
        /**
         * We have ended a spend period and will now allocate funds.
         */
        Spending: PlainDescriptor<Anonymize<I8iksqi3eani0a>>;
        /**
         * Some funds have been allocated.
         */
        Awarded: PlainDescriptor<Anonymize<I16enopmju1p0q>>;
        /**
         * A proposal was rejected; funds were slashed.
         */
        Rejected: PlainDescriptor<Anonymize<Ifgqhle2413de7>>;
        /**
         * Some of our funds have been burnt.
         */
        Burnt: PlainDescriptor<Anonymize<I43kq8qudg7pq9>>;
        /**
         * Spending has finished; this is the amount that rolls over until next spend.
         */
        Rollover: PlainDescriptor<Anonymize<I76riseemre533>>;
        /**
         * Some funds have been deposited.
         */
        Deposit: PlainDescriptor<Anonymize<Ie5v6njpckr05b>>;
        /**
         * A new spend proposal has been approved.
         * The inactive funds of the pallet have been updated.
         */
        UpdatedInactive: PlainDescriptor<Anonymize<I4hcillge8de5f>>;
    };
    CollectiveProxy: {
        /**
         * Community proxy call executed successfully.
         */
        CollectiveProxyExecuted: PlainDescriptor<Anonymize<Ib3728pnlm2cie>>;
    };
    SafeMode: {
        /**
         * The safe-mode was entered until inclusively this block.
         */
        Entered: PlainDescriptor<Anonymize<I20e9ph536u7ti>>;
        /**
         * The safe-mode was extended until inclusively this block.
         */
        Extended: PlainDescriptor<Anonymize<I20e9ph536u7ti>>;
        /**
         * Exited the safe-mode for a specific reason.
         */
        Exited: PlainDescriptor<Anonymize<I8kcpmsh450rp>>;
        /**
         * An account reserved funds for either entering or extending the safe-mode.
         */
        DepositPlaced: PlainDescriptor<Anonymize<Ic262ibdoec56a>>;
        /**
         * An account had a reserve released that was reserved.
         */
        DepositReleased: PlainDescriptor<Anonymize<Ic262ibdoec56a>>;
        /**
         * An account had reserve slashed that was reserved.
         */
        DepositSlashed: PlainDescriptor<Anonymize<Ic262ibdoec56a>>;
        /**
         * Could not hold funds for entering or extending the safe-mode.
         *
         * This error comes from the underlying `Currency`.
         */
        CannotDeposit: PlainDescriptor<undefined>;
        /**
         * Could not release funds for entering or extending the safe-mode.
         *
         * This error comes from the underlying `Currency`.
         */
        CannotRelease: PlainDescriptor<undefined>;
    };
    TxPause: {
        /**
         * This pallet, or a specific call is now paused.
         */
        CallPaused: PlainDescriptor<Anonymize<Iba7pefg0d11kh>>;
        /**
         * This pallet, or a specific call is now unpaused.
         */
        CallUnpaused: PlainDescriptor<Anonymize<Iba7pefg0d11kh>>;
    };
    MultiBlockMigrations: {
        /**
         * A Runtime upgrade started.
         *
         * Its end is indicated by `UpgradeCompleted` or `UpgradeFailed`.
         */
        UpgradeStarted: PlainDescriptor<Anonymize<If1co0pilmi7oq>>;
        /**
         * The current runtime upgrade completed.
         *
         * This implies that all of its migrations completed successfully as well.
         */
        UpgradeCompleted: PlainDescriptor<undefined>;
        /**
         * Runtime upgrade failed.
         *
         * This is very bad and will require governance intervention.
         */
        UpgradeFailed: PlainDescriptor<undefined>;
        /**
         * A migration was skipped since it was already executed in the past.
         */
        MigrationSkipped: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A migration progressed.
         */
        MigrationAdvanced: PlainDescriptor<Anonymize<Iae74gjak1qibn>>;
        /**
         * A Migration completed.
         */
        MigrationCompleted: PlainDescriptor<Anonymize<Iae74gjak1qibn>>;
        /**
         * A Migration failed.
         *
         * This implies that the whole upgrade failed and governance intervention is required.
         */
        MigrationFailed: PlainDescriptor<Anonymize<Iae74gjak1qibn>>;
        /**
         * The set of historical migrations has been cleared.
         */
        HistoricCleared: PlainDescriptor<Anonymize<I3escdojpj0551>>;
    };
};
type IError = {
    System: {
        /**
         * The name of specification does not match between the current runtime
         * and the new runtime.
         */
        InvalidSpecName: PlainDescriptor<undefined>;
        /**
         * The specification version is not allowed to decrease between the current runtime
         * and the new runtime.
         */
        SpecVersionNeedsToIncrease: PlainDescriptor<undefined>;
        /**
         * Failed to extract the runtime version from the new runtime.
         *
         * Either calling `Core_version` or decoding `RuntimeVersion` failed.
         */
        FailedToExtractRuntimeVersion: PlainDescriptor<undefined>;
        /**
         * Suicide called when the account has non-default composite data.
         */
        NonDefaultComposite: PlainDescriptor<undefined>;
        /**
         * There is a non-zero reference count preventing the account from being purged.
         */
        NonZeroRefCount: PlainDescriptor<undefined>;
        /**
         * The origin filter prevent the call to be dispatched.
         */
        CallFiltered: PlainDescriptor<undefined>;
        /**
         * A multi-block migration is ongoing and prevents the current code from being replaced.
         */
        MultiBlockMigrationsOngoing: PlainDescriptor<undefined>;
        /**
         * No upgrade authorized.
         */
        NothingAuthorized: PlainDescriptor<undefined>;
        /**
         * The submitted code is not authorized.
         */
        Unauthorized: PlainDescriptor<undefined>;
    };
    Utility: {
        /**
         * Too many calls batched.
         */
        TooManyCalls: PlainDescriptor<undefined>;
    };
    Identity: {
        /**
         * Too many subs-accounts.
         */
        TooManySubAccounts: PlainDescriptor<undefined>;
        /**
         * Account isn't found.
         */
        NotFound: PlainDescriptor<undefined>;
        /**
         * Account isn't named.
         */
        NotNamed: PlainDescriptor<undefined>;
        /**
         * Empty index.
         */
        EmptyIndex: PlainDescriptor<undefined>;
        /**
         * Fee is changed.
         */
        FeeChanged: PlainDescriptor<undefined>;
        /**
         * No identity found.
         */
        NoIdentity: PlainDescriptor<undefined>;
        /**
         * Sticky judgement.
         */
        StickyJudgement: PlainDescriptor<undefined>;
        /**
         * Judgement given.
         */
        JudgementGiven: PlainDescriptor<undefined>;
        /**
         * Invalid judgement.
         */
        InvalidJudgement: PlainDescriptor<undefined>;
        /**
         * The index is invalid.
         */
        InvalidIndex: PlainDescriptor<undefined>;
        /**
         * The target is invalid.
         */
        InvalidTarget: PlainDescriptor<undefined>;
        /**
         * Maximum amount of registrars reached. Cannot add any more.
         */
        TooManyRegistrars: PlainDescriptor<undefined>;
        /**
         * Account ID is already named.
         */
        AlreadyClaimed: PlainDescriptor<undefined>;
        /**
         * Sender is not a sub-account.
         */
        NotSub: PlainDescriptor<undefined>;
        /**
         * Sub-account isn't owned by sender.
         */
        NotOwned: PlainDescriptor<undefined>;
        /**
         * The provided judgement was for a different identity.
         */
        JudgementForDifferentIdentity: PlainDescriptor<undefined>;
        /**
         * Error that occurs when there is an issue paying for judgement.
         */
        JudgementPaymentFailed: PlainDescriptor<undefined>;
        /**
         * The provided suffix is too long.
         */
        InvalidSuffix: PlainDescriptor<undefined>;
        /**
         * The sender does not have permission to issue a username.
         */
        NotUsernameAuthority: PlainDescriptor<undefined>;
        /**
         * The authority cannot allocate any more usernames.
         */
        NoAllocation: PlainDescriptor<undefined>;
        /**
         * The signature on a username was not valid.
         */
        InvalidSignature: PlainDescriptor<undefined>;
        /**
         * Setting this username requires a signature, but none was provided.
         */
        RequiresSignature: PlainDescriptor<undefined>;
        /**
         * The username does not meet the requirements.
         */
        InvalidUsername: PlainDescriptor<undefined>;
        /**
         * The username is already taken.
         */
        UsernameTaken: PlainDescriptor<undefined>;
        /**
         * The requested username does not exist.
         */
        NoUsername: PlainDescriptor<undefined>;
        /**
         * The username cannot be forcefully removed because it can still be accepted.
         */
        NotExpired: PlainDescriptor<undefined>;
        /**
         * The username cannot be removed because it's still in the grace period.
         */
        TooEarly: PlainDescriptor<undefined>;
        /**
         * The username cannot be removed because it is not unbinding.
         */
        NotUnbinding: PlainDescriptor<undefined>;
        /**
         * The username cannot be unbound because it is already unbinding.
         */
        AlreadyUnbinding: PlainDescriptor<undefined>;
        /**
         * The action cannot be performed because of insufficient privileges (e.g. authority
         * trying to unbind a username provided by the system).
         */
        InsufficientPrivileges: PlainDescriptor<undefined>;
    };
    Multisig: {
        /**
         * Threshold must be 2 or greater.
         */
        MinimumThreshold: PlainDescriptor<undefined>;
        /**
         * Call is already approved by this signatory.
         */
        AlreadyApproved: PlainDescriptor<undefined>;
        /**
         * Call doesn't need any (more) approvals.
         */
        NoApprovalsNeeded: PlainDescriptor<undefined>;
        /**
         * There are too few signatories in the list.
         */
        TooFewSignatories: PlainDescriptor<undefined>;
        /**
         * There are too many signatories in the list.
         */
        TooManySignatories: PlainDescriptor<undefined>;
        /**
         * The signatories were provided out of order; they should be ordered.
         */
        SignatoriesOutOfOrder: PlainDescriptor<undefined>;
        /**
         * The sender was contained in the other signatories; it shouldn't be.
         */
        SenderInSignatories: PlainDescriptor<undefined>;
        /**
         * Multisig operation not found when attempting to cancel.
         */
        NotFound: PlainDescriptor<undefined>;
        /**
         * Only the account that originally created the multisig is able to cancel it.
         */
        NotOwner: PlainDescriptor<undefined>;
        /**
         * No timepoint was given, yet the multisig operation is already underway.
         */
        NoTimepoint: PlainDescriptor<undefined>;
        /**
         * A different timepoint was given to the multisig operation that is underway.
         */
        WrongTimepoint: PlainDescriptor<undefined>;
        /**
         * A timepoint was given, yet no multisig operation is underway.
         */
        UnexpectedTimepoint: PlainDescriptor<undefined>;
        /**
         * The maximum weight information provided was too low.
         */
        MaxWeightTooLow: PlainDescriptor<undefined>;
        /**
         * The data to be stored is already stored.
         */
        AlreadyStored: PlainDescriptor<undefined>;
    };
    Proxy: {
        /**
         * There are too many proxies registered or too many announcements pending.
         */
        TooMany: PlainDescriptor<undefined>;
        /**
         * Proxy registration not found.
         */
        NotFound: PlainDescriptor<undefined>;
        /**
         * Sender is not a proxy of the account to be proxied.
         */
        NotProxy: PlainDescriptor<undefined>;
        /**
         * A call which is incompatible with the proxy type's filter was attempted.
         */
        Unproxyable: PlainDescriptor<undefined>;
        /**
         * Account is already a proxy.
         */
        Duplicate: PlainDescriptor<undefined>;
        /**
         * Call may not be made by proxy because it may escalate its privileges.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * Announcement, if made at all, was made too recently.
         */
        Unannounced: PlainDescriptor<undefined>;
        /**
         * Cannot add self as proxy.
         */
        NoSelfProxy: PlainDescriptor<undefined>;
    };
    Scheduler: {
        /**
         * Failed to schedule a call
         */
        FailedToSchedule: PlainDescriptor<undefined>;
        /**
         * Cannot find the scheduled call.
         */
        NotFound: PlainDescriptor<undefined>;
        /**
         * Given target block number is in the past.
         */
        TargetBlockNumberInPast: PlainDescriptor<undefined>;
        /**
         * Reschedule failed because it does not change scheduled time.
         */
        RescheduleNoChange: PlainDescriptor<undefined>;
        /**
         * Attempt to use a non-named function on a named task.
         */
        Named: PlainDescriptor<undefined>;
    };
    ParachainSystem: {
        /**
         * Attempt to upgrade validation function while existing upgrade pending.
         */
        OverlappingUpgrades: PlainDescriptor<undefined>;
        /**
         * Polkadot currently prohibits this parachain from upgrading its validation function.
         */
        ProhibitedByPolkadot: PlainDescriptor<undefined>;
        /**
         * The supplied validation function has compiled into a blob larger than Polkadot is
         * willing to run.
         */
        TooBig: PlainDescriptor<undefined>;
        /**
         * The inherent which supplies the validation data did not run this block.
         */
        ValidationDataNotAvailable: PlainDescriptor<undefined>;
        /**
         * The inherent which supplies the host configuration did not run this block.
         */
        HostConfigurationNotAvailable: PlainDescriptor<undefined>;
        /**
         * No validation function upgrade is currently scheduled.
         */
        NotScheduled: PlainDescriptor<undefined>;
        /**
         * No code upgrade has been authorized.
         */
        NothingAuthorized: PlainDescriptor<undefined>;
        /**
         * The given code upgrade has not been authorized.
         */
        Unauthorized: PlainDescriptor<undefined>;
    };
    Balances: {
        /**
         * Vesting balance too high to send value.
         */
        VestingBalance: PlainDescriptor<undefined>;
        /**
         * Account liquidity restrictions prevent withdrawal.
         */
        LiquidityRestrictions: PlainDescriptor<undefined>;
        /**
         * Balance too low to send value.
         */
        InsufficientBalance: PlainDescriptor<undefined>;
        /**
         * Value too low to create account due to existential deposit.
         */
        ExistentialDeposit: PlainDescriptor<undefined>;
        /**
         * Transfer/payment would kill account.
         */
        Expendability: PlainDescriptor<undefined>;
        /**
         * A vesting schedule already exists for this account.
         */
        ExistingVestingSchedule: PlainDescriptor<undefined>;
        /**
         * Beneficiary account must pre-exist.
         */
        DeadAccount: PlainDescriptor<undefined>;
        /**
         * Number of named reserves exceed `MaxReserves`.
         */
        TooManyReserves: PlainDescriptor<undefined>;
        /**
         * Number of holds exceed `VariantCountOf<T::RuntimeHoldReason>`.
         */
        TooManyHolds: PlainDescriptor<undefined>;
        /**
         * Number of freezes exceed `MaxFreezes`.
         */
        TooManyFreezes: PlainDescriptor<undefined>;
        /**
         * The issuance cannot be modified since it is already deactivated.
         */
        IssuanceDeactivated: PlainDescriptor<undefined>;
        /**
         * The delta cannot be zero.
         */
        DeltaZero: PlainDescriptor<undefined>;
    };
    Vesting: {
        /**
         * The account given is not vesting.
         */
        NotVesting: PlainDescriptor<undefined>;
        /**
         * The account already has `MaxVestingSchedules` count of schedules and thus
         * cannot add another one. Consider merging existing schedules in order to add another.
         */
        AtMaxVestingSchedules: PlainDescriptor<undefined>;
        /**
         * Amount being transferred is too low to create a vesting schedule.
         */
        AmountLow: PlainDescriptor<undefined>;
        /**
         * An index was out of bounds of the vesting schedules.
         */
        ScheduleIndexOutOfBounds: PlainDescriptor<undefined>;
        /**
         * Failed to create a new schedule because some parameter was invalid.
         */
        InvalidScheduleParams: PlainDescriptor<undefined>;
    };
    Inflation: {
        /**
         * Sum of all parts must be one whole (100%).
         */
        InvalidInflationParameters: PlainDescriptor<undefined>;
    };
    DappStaking: {
        /**
         * Pallet is disabled/in maintenance mode.
         */
        Disabled: PlainDescriptor<undefined>;
        /**
         * Smart contract already exists within dApp staking protocol.
         */
        ContractAlreadyExists: PlainDescriptor<undefined>;
        /**
         * Maximum number of smart contracts has been reached.
         */
        ExceededMaxNumberOfContracts: PlainDescriptor<undefined>;
        /**
         * Not possible to assign a new dApp Id.
         * This should never happen since current type can support up to 65536 - 1 unique dApps.
         */
        NewDAppIdUnavailable: PlainDescriptor<undefined>;
        /**
         * Specified smart contract does not exist in dApp staking.
         */
        ContractNotFound: PlainDescriptor<undefined>;
        /**
         * Call origin is not dApp owner.
         */
        OriginNotOwner: PlainDescriptor<undefined>;
        /**
         * Performing locking or staking with 0 amount.
         */
        ZeroAmount: PlainDescriptor<undefined>;
        /**
         * Total locked amount for staker is below minimum threshold.
         */
        LockedAmountBelowThreshold: PlainDescriptor<undefined>;
        /**
         * Account is not allowed to participate in dApp staking due to some external reason (e.g. account is already a collator).
         */
        AccountNotAvailableForDappStaking: PlainDescriptor<undefined>;
        /**
         * Cannot add additional unlocking chunks due to capacity limit.
         */
        TooManyUnlockingChunks: PlainDescriptor<undefined>;
        /**
         * Remaining stake prevents entire balance of starting the unlocking process.
         */
        RemainingStakePreventsFullUnlock: PlainDescriptor<undefined>;
        /**
         * There are no eligible unlocked chunks to claim. This can happen either if no eligible chunks exist, or if user has no chunks at all.
         */
        NoUnlockedChunksToClaim: PlainDescriptor<undefined>;
        /**
         * There are no unlocking chunks available to relock.
         */
        NoUnlockingChunks: PlainDescriptor<undefined>;
        /**
         * The amount being staked is too large compared to what's available for staking.
         */
        UnavailableStakeFunds: PlainDescriptor<undefined>;
        /**
         * There are unclaimed rewards remaining from past eras or periods. They should be claimed before attempting any stake modification again.
         */
        UnclaimedRewards: PlainDescriptor<undefined>;
        /**
         * An unexpected error occurred while trying to stake.
         */
        InternalStakeError: PlainDescriptor<undefined>;
        /**
         * Total staked amount on contract is below the minimum required value.
         */
        InsufficientStakeAmount: PlainDescriptor<undefined>;
        /**
         * Stake operation is rejected since period ends in the next era.
         */
        PeriodEndsInNextEra: PlainDescriptor<undefined>;
        /**
         * Unstaking is rejected since the period in which past stake was active has passed.
         */
        UnstakeFromPastPeriod: PlainDescriptor<undefined>;
        /**
         * Unstake amount is greater than the staked amount.
         */
        UnstakeAmountTooLarge: PlainDescriptor<undefined>;
        /**
         * Account has no staking information for the contract.
         */
        NoStakingInfo: PlainDescriptor<undefined>;
        /**
         * An unexpected error occurred while trying to unstake.
         */
        InternalUnstakeError: PlainDescriptor<undefined>;
        /**
         * Rewards are no longer claimable since they are too old.
         */
        RewardExpired: PlainDescriptor<undefined>;
        /**
         * Reward payout has failed due to an unexpected reason.
         */
        RewardPayoutFailed: PlainDescriptor<undefined>;
        /**
         * There are no claimable rewards.
         */
        NoClaimableRewards: PlainDescriptor<undefined>;
        /**
         * An unexpected error occurred while trying to claim staker rewards.
         */
        InternalClaimStakerError: PlainDescriptor<undefined>;
        /**
         * Account is has no eligible stake amount for bonus reward.
         */
        NotEligibleForBonusReward: PlainDescriptor<undefined>;
        /**
         * An unexpected error occurred while trying to claim bonus reward.
         */
        InternalClaimBonusError: PlainDescriptor<undefined>;
        /**
         * Claim era is invalid - it must be in history, and rewards must exist for it.
         */
        InvalidClaimEra: PlainDescriptor<undefined>;
        /**
         * No dApp tier info exists for the specified era. This can be because era has expired
         * or because during the specified era there were no eligible rewards or protocol wasn't active.
         */
        NoDAppTierInfo: PlainDescriptor<undefined>;
        /**
         * An unexpected error occurred while trying to claim dApp reward.
         */
        InternalClaimDAppError: PlainDescriptor<undefined>;
        /**
         * Contract is still active, not unregistered.
         */
        ContractStillActive: PlainDescriptor<undefined>;
        /**
         * There are too many contract stake entries for the account. This can be cleaned up by either unstaking or cleaning expired entries.
         */
        TooManyStakedContracts: PlainDescriptor<undefined>;
        /**
         * There are no expired entries to cleanup for the account.
         */
        NoExpiredEntries: PlainDescriptor<undefined>;
        /**
         * Force call is not allowed in production.
         */
        ForceNotAllowed: PlainDescriptor<undefined>;
        /**
         * Invalid tier parameters were provided. This can happen if any number exceeds 100% or if number of elements does not match the number of tiers.
         */
        InvalidTierParams: PlainDescriptor<undefined>;
        /**
         * Same contract specified as source and destination.
         */
        SameContracts: PlainDescriptor<undefined>;
    };
    Assets: {
        /**
         * Account balance must be greater than or equal to the transfer amount.
         */
        BalanceLow: PlainDescriptor<undefined>;
        /**
         * The account to alter does not exist.
         */
        NoAccount: PlainDescriptor<undefined>;
        /**
         * The signing account has no permission to do the operation.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * The given asset ID is unknown.
         */
        Unknown: PlainDescriptor<undefined>;
        /**
         * The origin account is frozen.
         */
        Frozen: PlainDescriptor<undefined>;
        /**
         * The asset ID is already taken.
         */
        InUse: PlainDescriptor<undefined>;
        /**
         * Invalid witness data given.
         */
        BadWitness: PlainDescriptor<undefined>;
        /**
         * Minimum balance should be non-zero.
         */
        MinBalanceZero: PlainDescriptor<undefined>;
        /**
         * Unable to increment the consumer reference counters on the account. Either no provider
         * reference exists to allow a non-zero balance of a non-self-sufficient asset, or one
         * fewer then the maximum number of consumers has been reached.
         */
        UnavailableConsumer: PlainDescriptor<undefined>;
        /**
         * Invalid metadata given.
         */
        BadMetadata: PlainDescriptor<undefined>;
        /**
         * No approval exists that would allow the transfer.
         */
        Unapproved: PlainDescriptor<undefined>;
        /**
         * The source account would not survive the transfer and it needs to stay alive.
         */
        WouldDie: PlainDescriptor<undefined>;
        /**
         * The asset-account already exists.
         */
        AlreadyExists: PlainDescriptor<undefined>;
        /**
         * The asset-account doesn't have an associated deposit.
         */
        NoDeposit: PlainDescriptor<undefined>;
        /**
         * The operation would result in funds being burned.
         */
        WouldBurn: PlainDescriptor<undefined>;
        /**
         * The asset is a live asset and is actively being used. Usually emit for operations such
         * as `start_destroy` which require the asset to be in a destroying state.
         */
        LiveAsset: PlainDescriptor<undefined>;
        /**
         * The asset is not live, and likely being destroyed.
         */
        AssetNotLive: PlainDescriptor<undefined>;
        /**
         * The asset status is not the expected status.
         */
        IncorrectStatus: PlainDescriptor<undefined>;
        /**
         * The asset should be frozen before the given operation.
         */
        NotFrozen: PlainDescriptor<undefined>;
        /**
         * Callback action resulted in error
         */
        CallbackFailed: PlainDescriptor<undefined>;
        /**
         * The asset ID must be equal to the [`NextAssetId`].
         */
        BadAssetId: PlainDescriptor<undefined>;
    };
    Oracle: {
        /**
         * Sender does not have permission
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * Feeder has already feeded at this block
         */
        AlreadyFeeded: PlainDescriptor<undefined>;
    };
    OracleMembership: {
        /**
         * Already a member.
         */
        AlreadyMember: PlainDescriptor<undefined>;
        /**
         * Not a member.
         */
        NotMember: PlainDescriptor<undefined>;
        /**
         * Too many members.
         */
        TooManyMembers: PlainDescriptor<undefined>;
    };
    CollatorSelection: {
        /**
         * Too many candidates
         */
        TooManyCandidates: PlainDescriptor<undefined>;
        /**
         * Too few candidates
         */
        TooFewCandidates: PlainDescriptor<undefined>;
        /**
         * Unknown error
         */
        Unknown: PlainDescriptor<undefined>;
        /**
         * Permission issue
         */
        Permission: PlainDescriptor<undefined>;
        /**
         * User is already a candidate
         */
        AlreadyCandidate: PlainDescriptor<undefined>;
        /**
         * User is not a candidate
         */
        NotCandidate: PlainDescriptor<undefined>;
        /**
         * User is already an Invulnerable
         */
        AlreadyInvulnerable: PlainDescriptor<undefined>;
        /**
         * User is not an Invulnerable
         */
        NotInvulnerable: PlainDescriptor<undefined>;
        /**
         * Account has no associated validator ID
         */
        NoAssociatedValidatorId: PlainDescriptor<undefined>;
        /**
         * Validator ID is not yet registered
         */
        ValidatorNotRegistered: PlainDescriptor<undefined>;
        /**
         * Account is now allowed to be a candidate due to an external reason (e.g. it might be participating in dApp staking)
         */
        NotAllowedCandidate: PlainDescriptor<undefined>;
        /**
         * The candidacy bond is currently in the un-bonding period.
         */
        BondStillLocked: PlainDescriptor<undefined>;
        /**
         * No candidacy bond available for withdrawal.
         */
        NoCandidacyBond: PlainDescriptor<undefined>;
    };
    Session: {
        /**
         * Invalid ownership proof.
         */
        InvalidProof: PlainDescriptor<undefined>;
        /**
         * No associated validator ID for account.
         */
        NoAssociatedValidatorId: PlainDescriptor<undefined>;
        /**
         * Registered duplicate key.
         */
        DuplicatedKey: PlainDescriptor<undefined>;
        /**
         * No keys are associated with this account.
         */
        NoKeys: PlainDescriptor<undefined>;
        /**
         * Key setting account is not live, so it's impossible to associate keys.
         */
        NoAccount: PlainDescriptor<undefined>;
    };
    XcmpQueue: {
        /**
         * Setting the queue config failed since one of its values was invalid.
         */
        BadQueueConfig: PlainDescriptor<undefined>;
        /**
         * The execution is already suspended.
         */
        AlreadySuspended: PlainDescriptor<undefined>;
        /**
         * The execution is already resumed.
         */
        AlreadyResumed: PlainDescriptor<undefined>;
        /**
         * There are too many active outbound channels.
         */
        TooManyActiveOutboundChannels: PlainDescriptor<undefined>;
        /**
         * The message is too big.
         */
        TooBig: PlainDescriptor<undefined>;
    };
    PolkadotXcm: {
        /**
         * The desired destination was unreachable, generally because there is a no way of routing
         * to it.
         */
        Unreachable: PlainDescriptor<undefined>;
        /**
         * There was some other issue (i.e. not to do with routing) in sending the message.
         * Perhaps a lack of space for buffering the message.
         */
        SendFailure: PlainDescriptor<undefined>;
        /**
         * The message execution fails the filter.
         */
        Filtered: PlainDescriptor<undefined>;
        /**
         * The message's weight could not be determined.
         */
        UnweighableMessage: PlainDescriptor<undefined>;
        /**
         * The destination `Location` provided cannot be inverted.
         */
        DestinationNotInvertible: PlainDescriptor<undefined>;
        /**
         * The assets to be sent are empty.
         */
        Empty: PlainDescriptor<undefined>;
        /**
         * Could not re-anchor the assets to declare the fees for the destination chain.
         */
        CannotReanchor: PlainDescriptor<undefined>;
        /**
         * Too many assets have been attempted for transfer.
         */
        TooManyAssets: PlainDescriptor<undefined>;
        /**
         * Origin is invalid for sending.
         */
        InvalidOrigin: PlainDescriptor<undefined>;
        /**
         * The version of the `Versioned` value used is not able to be interpreted.
         */
        BadVersion: PlainDescriptor<undefined>;
        /**
         * The given location could not be used (e.g. because it cannot be expressed in the
         * desired version of XCM).
         */
        BadLocation: PlainDescriptor<undefined>;
        /**
         * The referenced subscription could not be found.
         */
        NoSubscription: PlainDescriptor<undefined>;
        /**
         * The location is invalid since it already has a subscription from us.
         */
        AlreadySubscribed: PlainDescriptor<undefined>;
        /**
         * Could not check-out the assets for teleportation to the destination chain.
         */
        CannotCheckOutTeleport: PlainDescriptor<undefined>;
        /**
         * The owner does not own (all) of the asset that they wish to do the operation on.
         */
        LowBalance: PlainDescriptor<undefined>;
        /**
         * The asset owner has too many locks on the asset.
         */
        TooManyLocks: PlainDescriptor<undefined>;
        /**
         * The given account is not an identifiable sovereign account for any location.
         */
        AccountNotSovereign: PlainDescriptor<undefined>;
        /**
         * The operation required fees to be paid which the initiator could not meet.
         */
        FeesNotMet: PlainDescriptor<undefined>;
        /**
         * A remote lock with the corresponding data could not be found.
         */
        LockNotFound: PlainDescriptor<undefined>;
        /**
         * The unlock operation cannot succeed because there are still consumers of the lock.
         */
        InUse: PlainDescriptor<undefined>;
        /**
         * Invalid asset, reserve chain could not be determined for it.
         */
        InvalidAssetUnknownReserve: PlainDescriptor<undefined>;
        /**
         * Invalid asset, do not support remote asset reserves with different fees reserves.
         */
        InvalidAssetUnsupportedReserve: PlainDescriptor<undefined>;
        /**
         * Too many assets with different reserve locations have been attempted for transfer.
         */
        TooManyReserves: PlainDescriptor<undefined>;
        /**
         * Local XCM execution incomplete.
         */
        LocalExecutionIncomplete: PlainDescriptor<undefined>;
    };
    XcAssetConfig: {
        /**
         * Asset is already registered.
         */
        AssetAlreadyRegistered: PlainDescriptor<undefined>;
        /**
         * Asset does not exist (hasn't been registered).
         */
        AssetDoesNotExist: PlainDescriptor<undefined>;
        /**
         * Failed to convert to latest versioned Location
         */
        MultiLocationNotSupported: PlainDescriptor<undefined>;
    };
    XTokens: {
        /**
         * Asset has no reserve location.
         */
        AssetHasNoReserve: PlainDescriptor<undefined>;
        /**
         * Not cross-chain transfer.
         */
        NotCrossChainTransfer: PlainDescriptor<undefined>;
        /**
         * Invalid transfer destination.
         */
        InvalidDest: PlainDescriptor<undefined>;
        /**
         * Currency is not cross-chain transferable.
         */
        NotCrossChainTransferableCurrency: PlainDescriptor<undefined>;
        /**
         * The message's weight could not be determined.
         */
        UnweighableMessage: PlainDescriptor<undefined>;
        /**
         * XCM execution failed.
         */
        XcmExecutionFailed: PlainDescriptor<undefined>;
        /**
         * Could not re-anchor the assets to declare the fees for the
         * destination chain.
         */
        CannotReanchor: PlainDescriptor<undefined>;
        /**
         * Could not get ancestry of asset reserve location.
         */
        InvalidAncestry: PlainDescriptor<undefined>;
        /**
         * The Asset is invalid.
         */
        InvalidAsset: PlainDescriptor<undefined>;
        /**
         * The destination `Location` provided cannot be inverted.
         */
        DestinationNotInvertible: PlainDescriptor<undefined>;
        /**
         * The version of the `Versioned` value used is not able to be
         * interpreted.
         */
        BadVersion: PlainDescriptor<undefined>;
        /**
         * We tried sending distinct asset and fee but they have different
         * reserve chains.
         */
        DistinctReserveForAssetAndFee: PlainDescriptor<undefined>;
        /**
         * The fee is zero.
         */
        ZeroFee: PlainDescriptor<undefined>;
        /**
         * The transfering asset amount is zero.
         */
        ZeroAmount: PlainDescriptor<undefined>;
        /**
         * The number of assets to be sent is over the maximum.
         */
        TooManyAssetsBeingSent: PlainDescriptor<undefined>;
        /**
         * The specified index does not exist in a Assets struct.
         */
        AssetIndexNonExistent: PlainDescriptor<undefined>;
        /**
         * Fee is not enough.
         */
        FeeNotEnough: PlainDescriptor<undefined>;
        /**
         * Not supported Location
         */
        NotSupportedLocation: PlainDescriptor<undefined>;
        /**
         * MinXcmFee not registered for certain reserve location
         */
        MinXcmFeeNotDefined: PlainDescriptor<undefined>;
        /**
         * Asset transfer is limited by RateLimiter.
         */
        RateLimited: PlainDescriptor<undefined>;
    };
    MessageQueue: {
        /**
         * Page is not reapable because it has items remaining to be processed and is not old
         * enough.
         */
        NotReapable: PlainDescriptor<undefined>;
        /**
         * Page to be reaped does not exist.
         */
        NoPage: PlainDescriptor<undefined>;
        /**
         * The referenced message could not be found.
         */
        NoMessage: PlainDescriptor<undefined>;
        /**
         * The message was already processed and cannot be processed again.
         */
        AlreadyProcessed: PlainDescriptor<undefined>;
        /**
         * The message is queued for future execution.
         */
        Queued: PlainDescriptor<undefined>;
        /**
         * There is temporarily not enough weight to continue servicing messages.
         */
        InsufficientWeight: PlainDescriptor<undefined>;
        /**
         * This message is temporarily unprocessable.
         *
         * Such errors are expected, but not guaranteed, to resolve themselves eventually through
         * retrying.
         */
        TemporarilyUnprocessable: PlainDescriptor<undefined>;
        /**
         * The queue is paused and no message can be executed from it.
         *
         * This can change at any time and may resolve in the future by re-trying.
         */
        QueuePaused: PlainDescriptor<undefined>;
        /**
         * Another call is in progress and needs to finish before this call can happen.
         */
        RecursiveDisallowed: PlainDescriptor<undefined>;
    };
    EVM: {
        /**
         * Not enough balance to perform action
         */
        BalanceLow: PlainDescriptor<undefined>;
        /**
         * Calculating total fee overflowed
         */
        FeeOverflow: PlainDescriptor<undefined>;
        /**
         * Calculating total payment overflowed
         */
        PaymentOverflow: PlainDescriptor<undefined>;
        /**
         * Withdraw fee failed
         */
        WithdrawFailed: PlainDescriptor<undefined>;
        /**
         * Gas price is too low.
         */
        GasPriceTooLow: PlainDescriptor<undefined>;
        /**
         * Nonce is invalid
         */
        InvalidNonce: PlainDescriptor<undefined>;
        /**
         * Gas limit is too low.
         */
        GasLimitTooLow: PlainDescriptor<undefined>;
        /**
         * Gas limit is too high.
         */
        GasLimitTooHigh: PlainDescriptor<undefined>;
        /**
         * The chain id is invalid.
         */
        InvalidChainId: PlainDescriptor<undefined>;
        /**
         * the signature is invalid.
         */
        InvalidSignature: PlainDescriptor<undefined>;
        /**
         * EVM reentrancy
         */
        Reentrancy: PlainDescriptor<undefined>;
        /**
         * EIP-3607,
         */
        TransactionMustComeFromEOA: PlainDescriptor<undefined>;
        /**
         * Undefined error.
         */
        Undefined: PlainDescriptor<undefined>;
    };
    Ethereum: {
        /**
         * Signature is invalid.
         */
        InvalidSignature: PlainDescriptor<undefined>;
        /**
         * Pre-log is present, therefore transact is not allowed.
         */
        PreLogExists: PlainDescriptor<undefined>;
    };
    DynamicEvmBaseFee: {
        /**
         * Specified value is outside of the allowed range.
         */
        ValueOutOfBounds: PlainDescriptor<undefined>;
    };
    Contracts: {
        /**
         * Invalid schedule supplied, e.g. with zero weight of a basic operation.
         */
        InvalidSchedule: PlainDescriptor<undefined>;
        /**
         * Invalid combination of flags supplied to `seal_call` or `seal_delegate_call`.
         */
        InvalidCallFlags: PlainDescriptor<undefined>;
        /**
         * The executed contract exhausted its gas limit.
         */
        OutOfGas: PlainDescriptor<undefined>;
        /**
         * The output buffer supplied to a contract API call was too small.
         */
        OutputBufferTooSmall: PlainDescriptor<undefined>;
        /**
         * Performing the requested transfer failed. Probably because there isn't enough
         * free balance in the sender's account.
         */
        TransferFailed: PlainDescriptor<undefined>;
        /**
         * Performing a call was denied because the calling depth reached the limit
         * of what is specified in the schedule.
         */
        MaxCallDepthReached: PlainDescriptor<undefined>;
        /**
         * No contract was found at the specified address.
         */
        ContractNotFound: PlainDescriptor<undefined>;
        /**
         * The code supplied to `instantiate_with_code` exceeds the limit specified in the
         * current schedule.
         */
        CodeTooLarge: PlainDescriptor<undefined>;
        /**
         * No code could be found at the supplied code hash.
         */
        CodeNotFound: PlainDescriptor<undefined>;
        /**
         * No code info could be found at the supplied code hash.
         */
        CodeInfoNotFound: PlainDescriptor<undefined>;
        /**
         * A buffer outside of sandbox memory was passed to a contract API function.
         */
        OutOfBounds: PlainDescriptor<undefined>;
        /**
         * Input passed to a contract API function failed to decode as expected type.
         */
        DecodingFailed: PlainDescriptor<undefined>;
        /**
         * Contract trapped during execution.
         */
        ContractTrapped: PlainDescriptor<undefined>;
        /**
         * The size defined in `T::MaxValueSize` was exceeded.
         */
        ValueTooLarge: PlainDescriptor<undefined>;
        /**
         * Termination of a contract is not allowed while the contract is already
         * on the call stack. Can be triggered by `seal_terminate`.
         */
        TerminatedWhileReentrant: PlainDescriptor<undefined>;
        /**
         * `seal_call` forwarded this contracts input. It therefore is no longer available.
         */
        InputForwarded: PlainDescriptor<undefined>;
        /**
         * The subject passed to `seal_random` exceeds the limit.
         */
        RandomSubjectTooLong: PlainDescriptor<undefined>;
        /**
         * The amount of topics passed to `seal_deposit_events` exceeds the limit.
         */
        TooManyTopics: PlainDescriptor<undefined>;
        /**
         * The chain does not provide a chain extension. Calling the chain extension results
         * in this error. Note that this usually  shouldn't happen as deploying such contracts
         * is rejected.
         */
        NoChainExtension: PlainDescriptor<undefined>;
        /**
         * Failed to decode the XCM program.
         */
        XCMDecodeFailed: PlainDescriptor<undefined>;
        /**
         * A contract with the same AccountId already exists.
         */
        DuplicateContract: PlainDescriptor<undefined>;
        /**
         * A contract self destructed in its constructor.
         *
         * This can be triggered by a call to `seal_terminate`.
         */
        TerminatedInConstructor: PlainDescriptor<undefined>;
        /**
         * A call tried to invoke a contract that is flagged as non-reentrant.
         * The only other cause is that a call from a contract into the runtime tried to call back
         * into `pallet-contracts`. This would make the whole pallet reentrant with regard to
         * contract code execution which is not supported.
         */
        ReentranceDenied: PlainDescriptor<undefined>;
        /**
         * A contract attempted to invoke a state modifying API while being in read-only mode.
         */
        StateChangeDenied: PlainDescriptor<undefined>;
        /**
         * Origin doesn't have enough balance to pay the required storage deposits.
         */
        StorageDepositNotEnoughFunds: PlainDescriptor<undefined>;
        /**
         * More storage was created than allowed by the storage deposit limit.
         */
        StorageDepositLimitExhausted: PlainDescriptor<undefined>;
        /**
         * Code removal was denied because the code is still in use by at least one contract.
         */
        CodeInUse: PlainDescriptor<undefined>;
        /**
         * The contract ran to completion but decided to revert its storage changes.
         * Please note that this error is only returned from extrinsics. When called directly
         * or via RPC an `Ok` will be returned. In this case the caller needs to inspect the flags
         * to determine whether a reversion has taken place.
         */
        ContractReverted: PlainDescriptor<undefined>;
        /**
         * The contract's code was found to be invalid during validation.
         *
         * The most likely cause of this is that an API was used which is not supported by the
         * node. This happens if an older node is used with a new version of ink!. Try updating
         * your node to the newest available version.
         *
         * A more detailed error can be found on the node console if debug messages are enabled
         * by supplying `-lruntime::contracts=debug`.
         */
        CodeRejected: PlainDescriptor<undefined>;
        /**
         * An indeterministic code was used in a context where this is not permitted.
         */
        Indeterministic: PlainDescriptor<undefined>;
        /**
         * A pending migration needs to complete before the extrinsic can be called.
         */
        MigrationInProgress: PlainDescriptor<undefined>;
        /**
         * Migrate dispatch call was attempted but no migration was performed.
         */
        NoMigrationPerformed: PlainDescriptor<undefined>;
        /**
         * The contract has reached its maximum number of delegate dependencies.
         */
        MaxDelegateDependenciesReached: PlainDescriptor<undefined>;
        /**
         * The dependency was not found in the contract's delegate dependencies.
         */
        DelegateDependencyNotFound: PlainDescriptor<undefined>;
        /**
         * The contract already depends on the given delegate dependency.
         */
        DelegateDependencyAlreadyExists: PlainDescriptor<undefined>;
        /**
         * Can not add a delegate dependency to the code hash of the contract itself.
         */
        CannotAddSelfAsDelegateDependency: PlainDescriptor<undefined>;
        /**
         * Can not add more data to transient storage.
         */
        OutOfTransientStorage: PlainDescriptor<undefined>;
    };
    Preimage: {
        /**
         * Preimage is too large to store on-chain.
         */
        TooBig: PlainDescriptor<undefined>;
        /**
         * Preimage has already been noted on-chain.
         */
        AlreadyNoted: PlainDescriptor<undefined>;
        /**
         * The user is not authorized to perform this action.
         */
        NotAuthorized: PlainDescriptor<undefined>;
        /**
         * The preimage cannot be removed since it has not yet been noted.
         */
        NotNoted: PlainDescriptor<undefined>;
        /**
         * A preimage may not be removed when there are outstanding requests.
         */
        Requested: PlainDescriptor<undefined>;
        /**
         * The preimage request cannot be removed since no outstanding requests exist.
         */
        NotRequested: PlainDescriptor<undefined>;
        /**
         * More than `MAX_HASH_UPGRADE_BULK_COUNT` hashes were requested to be upgraded at once.
         */
        TooMany: PlainDescriptor<undefined>;
        /**
         * Too few hashes were requested to be upgraded (i.e. zero).
         */
        TooFew: PlainDescriptor<undefined>;
    };
    Sudo: {
        /**
         * Sender must be the Sudo account.
         */
        RequireSudo: PlainDescriptor<undefined>;
    };
    CouncilMembership: {
        /**
         * Already a member.
         */
        AlreadyMember: PlainDescriptor<undefined>;
        /**
         * Not a member.
         */
        NotMember: PlainDescriptor<undefined>;
        /**
         * Too many members.
         */
        TooManyMembers: PlainDescriptor<undefined>;
    };
    TechnicalCommitteeMembership: {
        /**
         * Already a member.
         */
        AlreadyMember: PlainDescriptor<undefined>;
        /**
         * Not a member.
         */
        NotMember: PlainDescriptor<undefined>;
        /**
         * Too many members.
         */
        TooManyMembers: PlainDescriptor<undefined>;
    };
    CommunityCouncilMembership: {
        /**
         * Already a member.
         */
        AlreadyMember: PlainDescriptor<undefined>;
        /**
         * Not a member.
         */
        NotMember: PlainDescriptor<undefined>;
        /**
         * Too many members.
         */
        TooManyMembers: PlainDescriptor<undefined>;
    };
    Council: {
        /**
         * Account is not a member
         */
        NotMember: PlainDescriptor<undefined>;
        /**
         * Duplicate proposals not allowed
         */
        DuplicateProposal: PlainDescriptor<undefined>;
        /**
         * Proposal must exist
         */
        ProposalMissing: PlainDescriptor<undefined>;
        /**
         * Mismatched index
         */
        WrongIndex: PlainDescriptor<undefined>;
        /**
         * Duplicate vote ignored
         */
        DuplicateVote: PlainDescriptor<undefined>;
        /**
         * Members are already initialized!
         */
        AlreadyInitialized: PlainDescriptor<undefined>;
        /**
         * The close call was made too early, before the end of the voting.
         */
        TooEarly: PlainDescriptor<undefined>;
        /**
         * There can only be a maximum of `MaxProposals` active proposals.
         */
        TooManyProposals: PlainDescriptor<undefined>;
        /**
         * The given weight bound for the proposal was too low.
         */
        WrongProposalWeight: PlainDescriptor<undefined>;
        /**
         * The given length bound for the proposal was too low.
         */
        WrongProposalLength: PlainDescriptor<undefined>;
        /**
         * Prime account is not a member
         */
        PrimeAccountNotMember: PlainDescriptor<undefined>;
        /**
         * Proposal is still active.
         */
        ProposalActive: PlainDescriptor<undefined>;
    };
    TechnicalCommittee: {
        /**
         * Account is not a member
         */
        NotMember: PlainDescriptor<undefined>;
        /**
         * Duplicate proposals not allowed
         */
        DuplicateProposal: PlainDescriptor<undefined>;
        /**
         * Proposal must exist
         */
        ProposalMissing: PlainDescriptor<undefined>;
        /**
         * Mismatched index
         */
        WrongIndex: PlainDescriptor<undefined>;
        /**
         * Duplicate vote ignored
         */
        DuplicateVote: PlainDescriptor<undefined>;
        /**
         * Members are already initialized!
         */
        AlreadyInitialized: PlainDescriptor<undefined>;
        /**
         * The close call was made too early, before the end of the voting.
         */
        TooEarly: PlainDescriptor<undefined>;
        /**
         * There can only be a maximum of `MaxProposals` active proposals.
         */
        TooManyProposals: PlainDescriptor<undefined>;
        /**
         * The given weight bound for the proposal was too low.
         */
        WrongProposalWeight: PlainDescriptor<undefined>;
        /**
         * The given length bound for the proposal was too low.
         */
        WrongProposalLength: PlainDescriptor<undefined>;
        /**
         * Prime account is not a member
         */
        PrimeAccountNotMember: PlainDescriptor<undefined>;
        /**
         * Proposal is still active.
         */
        ProposalActive: PlainDescriptor<undefined>;
    };
    CommunityCouncil: {
        /**
         * Account is not a member
         */
        NotMember: PlainDescriptor<undefined>;
        /**
         * Duplicate proposals not allowed
         */
        DuplicateProposal: PlainDescriptor<undefined>;
        /**
         * Proposal must exist
         */
        ProposalMissing: PlainDescriptor<undefined>;
        /**
         * Mismatched index
         */
        WrongIndex: PlainDescriptor<undefined>;
        /**
         * Duplicate vote ignored
         */
        DuplicateVote: PlainDescriptor<undefined>;
        /**
         * Members are already initialized!
         */
        AlreadyInitialized: PlainDescriptor<undefined>;
        /**
         * The close call was made too early, before the end of the voting.
         */
        TooEarly: PlainDescriptor<undefined>;
        /**
         * There can only be a maximum of `MaxProposals` active proposals.
         */
        TooManyProposals: PlainDescriptor<undefined>;
        /**
         * The given weight bound for the proposal was too low.
         */
        WrongProposalWeight: PlainDescriptor<undefined>;
        /**
         * The given length bound for the proposal was too low.
         */
        WrongProposalLength: PlainDescriptor<undefined>;
        /**
         * Prime account is not a member
         */
        PrimeAccountNotMember: PlainDescriptor<undefined>;
        /**
         * Proposal is still active.
         */
        ProposalActive: PlainDescriptor<undefined>;
    };
    Democracy: {
        /**
         * Value too low
         */
        ValueLow: PlainDescriptor<undefined>;
        /**
         * Proposal does not exist
         */
        ProposalMissing: PlainDescriptor<undefined>;
        /**
         * Cannot cancel the same proposal twice
         */
        AlreadyCanceled: PlainDescriptor<undefined>;
        /**
         * Proposal already made
         */
        DuplicateProposal: PlainDescriptor<undefined>;
        /**
         * Proposal still blacklisted
         */
        ProposalBlacklisted: PlainDescriptor<undefined>;
        /**
         * Next external proposal not simple majority
         */
        NotSimpleMajority: PlainDescriptor<undefined>;
        /**
         * Invalid hash
         */
        InvalidHash: PlainDescriptor<undefined>;
        /**
         * No external proposal
         */
        NoProposal: PlainDescriptor<undefined>;
        /**
         * Identity may not veto a proposal twice
         */
        AlreadyVetoed: PlainDescriptor<undefined>;
        /**
         * Vote given for invalid referendum
         */
        ReferendumInvalid: PlainDescriptor<undefined>;
        /**
         * No proposals waiting
         */
        NoneWaiting: PlainDescriptor<undefined>;
        /**
         * The given account did not vote on the referendum.
         */
        NotVoter: PlainDescriptor<undefined>;
        /**
         * The actor has no permission to conduct the action.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * The account is already delegating.
         */
        AlreadyDelegating: PlainDescriptor<undefined>;
        /**
         * Too high a balance was provided that the account cannot afford.
         */
        InsufficientFunds: PlainDescriptor<undefined>;
        /**
         * The account is not currently delegating.
         */
        NotDelegating: PlainDescriptor<undefined>;
        /**
         * The account currently has votes attached to it and the operation cannot succeed until
         * these are removed, either through `unvote` or `reap_vote`.
         */
        VotesExist: PlainDescriptor<undefined>;
        /**
         * The instant referendum origin is currently disallowed.
         */
        InstantNotAllowed: PlainDescriptor<undefined>;
        /**
         * Delegation to oneself makes no sense.
         */
        Nonsense: PlainDescriptor<undefined>;
        /**
         * Invalid upper bound.
         */
        WrongUpperBound: PlainDescriptor<undefined>;
        /**
         * Maximum number of votes reached.
         */
        MaxVotesReached: PlainDescriptor<undefined>;
        /**
         * Maximum number of items reached.
         */
        TooMany: PlainDescriptor<undefined>;
        /**
         * Voting period too low
         */
        VotingPeriodLow: PlainDescriptor<undefined>;
        /**
         * The preimage does not exist.
         */
        PreimageNotExist: PlainDescriptor<undefined>;
    };
    Treasury: {
        /**
         * Proposer's balance is too low.
         */
        InsufficientProposersBalance: PlainDescriptor<undefined>;
        /**
         * No proposal, bounty or spend at that index.
         */
        InvalidIndex: PlainDescriptor<undefined>;
        /**
         * Too many approvals in the queue.
         */
        TooManyApprovals: PlainDescriptor<undefined>;
        /**
         * The spend origin is valid but the amount it is allowed to spend is lower than the
         * amount to be spent.
         */
        InsufficientPermission: PlainDescriptor<undefined>;
        /**
         * Proposal has not been approved.
         */
        ProposalNotApproved: PlainDescriptor<undefined>;
    };
    CommunityTreasury: {
        /**
         * Proposer's balance is too low.
         */
        InsufficientProposersBalance: PlainDescriptor<undefined>;
        /**
         * No proposal, bounty or spend at that index.
         */
        InvalidIndex: PlainDescriptor<undefined>;
        /**
         * Too many approvals in the queue.
         */
        TooManyApprovals: PlainDescriptor<undefined>;
        /**
         * The spend origin is valid but the amount it is allowed to spend is lower than the
         * amount to be spent.
         */
        InsufficientPermission: PlainDescriptor<undefined>;
        /**
         * Proposal has not been approved.
         */
        ProposalNotApproved: PlainDescriptor<undefined>;
    };
    SafeMode: {
        /**
         * The safe-mode is (already or still) entered.
         */
        Entered: PlainDescriptor<undefined>;
        /**
         * The safe-mode is (already or still) exited.
         */
        Exited: PlainDescriptor<undefined>;
        /**
         * This functionality of the pallet is disabled by the configuration.
         */
        NotConfigured: PlainDescriptor<undefined>;
        /**
         * There is no balance reserved.
         */
        NoDeposit: PlainDescriptor<undefined>;
        /**
         * The account already has a deposit reserved and can therefore not enter or extend again.
         */
        AlreadyDeposited: PlainDescriptor<undefined>;
        /**
         * This deposit cannot be released yet.
         */
        CannotReleaseYet: PlainDescriptor<undefined>;
        /**
         * An error from the underlying `Currency`.
         */
        CurrencyError: PlainDescriptor<undefined>;
    };
    TxPause: {
        /**
         * The call is paused.
         */
        IsPaused: PlainDescriptor<undefined>;
        /**
         * The call is unpaused.
         */
        IsUnpaused: PlainDescriptor<undefined>;
        /**
         * The call is whitelisted and cannot be paused.
         */
        Unpausable: PlainDescriptor<undefined>;
        /**
        
         */
        NotFound: PlainDescriptor<undefined>;
    };
    MultiBlockMigrations: {
        /**
         * The operation cannot complete since some MBMs are ongoing.
         */
        Ongoing: PlainDescriptor<undefined>;
    };
};
type IConstants = {
    System: {
        /**
         * Block & extrinsics weights: base values and limits.
         */
        BlockWeights: PlainDescriptor<Anonymize<In7a38730s6qs>>;
        /**
         * The maximum length of a block (in bytes).
         */
        BlockLength: PlainDescriptor<Anonymize<If15el53dd76v9>>;
        /**
         * Maximum number of block number to block hash mappings to keep (oldest pruned first).
         */
        BlockHashCount: PlainDescriptor<number>;
        /**
         * The weight of runtime database operations the runtime can invoke.
         */
        DbWeight: PlainDescriptor<Anonymize<I9s0ave7t0vnrk>>;
        /**
         * Get the chain's in-code version.
         */
        Version: PlainDescriptor<Anonymize<I4fo08joqmcqnm>>;
        /**
         * The designated SS58 prefix of this chain.
         *
         * This replaces the "ss58Format" property declared in the chain spec. Reason is
         * that the runtime should know about the prefix in order to make use of it as
         * an identifier of the chain.
         */
        SS58Prefix: PlainDescriptor<number>;
    };
    Utility: {
        /**
         * The limit on the number of batched calls.
         */
        batched_calls_limit: PlainDescriptor<number>;
    };
    Identity: {
        /**
         * The amount held on deposit for a registered identity.
         */
        BasicDeposit: PlainDescriptor<bigint>;
        /**
         * The amount held on deposit per encoded byte for a registered identity.
         */
        ByteDeposit: PlainDescriptor<bigint>;
        /**
         * The amount held on deposit per registered username. This value should change only in
         * runtime upgrades with proper migration of existing deposits.
         */
        UsernameDeposit: PlainDescriptor<bigint>;
        /**
         * The amount held on deposit for a registered subaccount. This should account for the fact
         * that one storage item's value will increase by the size of an account ID, and there will
         * be another trie item whose value is the size of an account ID plus 32 bytes.
         */
        SubAccountDeposit: PlainDescriptor<bigint>;
        /**
         * The maximum number of sub-accounts allowed per identified account.
         */
        MaxSubAccounts: PlainDescriptor<number>;
        /**
         * Maximum number of registrars allowed in the system. Needed to bound the complexity
         * of, e.g., updating judgements.
         */
        MaxRegistrars: PlainDescriptor<number>;
        /**
         * The number of blocks within which a username grant must be accepted.
         */
        PendingUsernameExpiration: PlainDescriptor<number>;
        /**
         * The number of blocks that must pass to enable the permanent deletion of a username by
         * its respective authority.
         */
        UsernameGracePeriod: PlainDescriptor<number>;
        /**
         * The maximum length of a suffix.
         */
        MaxSuffixLength: PlainDescriptor<number>;
        /**
         * The maximum length of a username, including its suffix and any system-added delimiters.
         */
        MaxUsernameLength: PlainDescriptor<number>;
    };
    Timestamp: {
        /**
         * The minimum period between blocks.
         *
         * Be aware that this is different to the *expected* period that the block production
         * apparatus provides. Your chosen consensus system will generally work with this to
         * determine a sensible block time. For example, in the Aura pallet it will be double this
         * period on default settings.
         */
        MinimumPeriod: PlainDescriptor<bigint>;
    };
    Multisig: {
        /**
         * The base amount of currency needed to reserve for creating a multisig execution or to
         * store a dispatch call for later.
         *
         * This is held for an additional storage item whose value size is
         * `4 + sizeof((BlockNumber, Balance, AccountId))` bytes and whose key size is
         * `32 + sizeof(AccountId)` bytes.
         */
        DepositBase: PlainDescriptor<bigint>;
        /**
         * The amount of currency needed per unit threshold when creating a multisig execution.
         *
         * This is held for adding 32 bytes more into a pre-existing storage value.
         */
        DepositFactor: PlainDescriptor<bigint>;
        /**
         * The maximum amount of signatories allowed in the multisig.
         */
        MaxSignatories: PlainDescriptor<number>;
    };
    Proxy: {
        /**
         * The base amount of currency needed to reserve for creating a proxy.
         *
         * This is held for an additional storage item whose value size is
         * `sizeof(Balance)` bytes and whose key size is `sizeof(AccountId)` bytes.
         */
        ProxyDepositBase: PlainDescriptor<bigint>;
        /**
         * The amount of currency needed per proxy added.
         *
         * This is held for adding 32 bytes plus an instance of `ProxyType` more into a
         * pre-existing storage value. Thus, when configuring `ProxyDepositFactor` one should take
         * into account `32 + proxy_type.encode().len()` bytes of data.
         */
        ProxyDepositFactor: PlainDescriptor<bigint>;
        /**
         * The maximum amount of proxies allowed for a single account.
         */
        MaxProxies: PlainDescriptor<number>;
        /**
         * The maximum amount of time-delayed announcements that are allowed to be pending.
         */
        MaxPending: PlainDescriptor<number>;
        /**
         * The base amount of currency needed to reserve for creating an announcement.
         *
         * This is held when a new storage item holding a `Balance` is created (typically 16
         * bytes).
         */
        AnnouncementDepositBase: PlainDescriptor<bigint>;
        /**
         * The amount of currency needed per announcement made.
         *
         * This is held for adding an `AccountId`, `Hash` and `BlockNumber` (typically 68 bytes)
         * into a pre-existing storage value.
         */
        AnnouncementDepositFactor: PlainDescriptor<bigint>;
    };
    Scheduler: {
        /**
         * The maximum weight that may be scheduled per block for any dispatchables.
         */
        MaximumWeight: PlainDescriptor<Anonymize<I4q39t5hn830vp>>;
        /**
         * The maximum number of scheduled calls in the queue for a single block.
         *
         * NOTE:
         * + Dependent pallets' benchmarks might require a higher limit for the setting. Set a
         * higher limit under `runtime-benchmarks` feature.
         */
        MaxScheduledPerBlock: PlainDescriptor<number>;
    };
    ParachainSystem: {
        /**
         * Returns the parachain ID we are running with.
         */
        SelfParaId: PlainDescriptor<number>;
    };
    TransactionPayment: {
        /**
         * A fee multiplier for `Operational` extrinsics to compute "virtual tip" to boost their
         * `priority`
         *
         * This value is multiplied by the `final_fee` to obtain a "virtual tip" that is later
         * added to a tip component in regular `priority` calculations.
         * It means that a `Normal` transaction can front-run a similarly-sized `Operational`
         * extrinsic (with no tip), by including a tip value greater than the virtual tip.
         *
         * ```rust,ignore
         * // For `Normal`
         * let priority = priority_calc(tip);
         *
         * // For `Operational`
         * let virtual_tip = (inclusion_fee + tip) * OperationalFeeMultiplier;
         * let priority = priority_calc(tip + virtual_tip);
         * ```
         *
         * Note that since we use `final_fee` the multiplier applies also to the regular `tip`
         * sent with the transaction. So, not only does the transaction get a priority bump based
         * on the `inclusion_fee`, but we also amplify the impact of tips applied to `Operational`
         * transactions.
         */
        OperationalFeeMultiplier: PlainDescriptor<number>;
    };
    Balances: {
        /**
         * The minimum amount required to keep an account open. MUST BE GREATER THAN ZERO!
         *
         * If you *really* need it to be zero, you can enable the feature `insecure_zero_ed` for
         * this pallet. However, you do so at your own risk: this will open up a major DoS vector.
         * In case you have multiple sources of provider references, you may also get unexpected
         * behaviour if you set this to zero.
         *
         * Bottom line: Do yourself a favour and make it at least one!
         */
        ExistentialDeposit: PlainDescriptor<bigint>;
        /**
         * The maximum number of locks that should exist on an account.
         * Not strictly enforced, but used for weight estimation.
         *
         * Use of locks is deprecated in favour of freezes. See `https://github.com/paritytech/substrate/pull/12951/`
         */
        MaxLocks: PlainDescriptor<number>;
        /**
         * The maximum number of named reserves that can exist on an account.
         *
         * Use of reserves is deprecated in favour of holds. See `https://github.com/paritytech/substrate/pull/12951/`
         */
        MaxReserves: PlainDescriptor<number>;
        /**
         * The maximum number of individual freeze locks that can exist on an account at any time.
         */
        MaxFreezes: PlainDescriptor<number>;
    };
    Vesting: {
        /**
         * The minimum amount transferred to call `vested_transfer`.
         */
        MinVestedTransfer: PlainDescriptor<bigint>;
        /**
        
         */
        MaxVestingSchedules: PlainDescriptor<number>;
    };
    DappStaking: {
        /**
         * Base native currency price used to calculate base number of slots.
         * This is used to adjust tier configuration, tier thresholds specifically, based on the native token price changes.
         *
         * When dApp staking thresholds were modeled, a base price was set from which the initial configuration is derived.
         * E.g. for a price of 0.05$, we get 100 slots, and certain tier thresholds.
         * Using these values as the base, we can adjust the configuration based on the current price.
         *
         * This is connected with the `TierSlots` associated type, since it's used to calculate the total number of slots for the given price.
         */
        BaseNativeCurrencyPrice: PlainDescriptor<bigint>;
        /**
         * Maximum length of a single era reward span length entry.
         */
        EraRewardSpanLength: PlainDescriptor<number>;
        /**
         * Number of periods for which we keep rewards available for claiming.
         * After that period, they are no longer claimable.
         */
        RewardRetentionInPeriods: PlainDescriptor<number>;
        /**
         * Maximum number of contracts that can be integrated into dApp staking at once.
         */
        MaxNumberOfContracts: PlainDescriptor<number>;
        /**
         * Maximum number of unlocking chunks that can exist per account at a time.
         */
        MaxUnlockingChunks: PlainDescriptor<number>;
        /**
         * Minimum amount an account has to lock in dApp staking in order to participate.
         */
        MinimumLockedAmount: PlainDescriptor<bigint>;
        /**
         * Number of standard eras that need to pass before unlocking chunk can be claimed.
         * Even though it's expressed in 'eras', it's actually measured in number of blocks.
         */
        UnlockingPeriod: PlainDescriptor<number>;
        /**
         * Maximum amount of stake contract entries an account is allowed to have at once.
         */
        MaxNumberOfStakedContracts: PlainDescriptor<number>;
        /**
         * Minimum amount staker can stake on a contract.
         */
        MinimumStakeAmount: PlainDescriptor<bigint>;
        /**
         * Number of different tiers.
         */
        NumberOfTiers: PlainDescriptor<number>;
        /**
         * Tier ranking enabled.
         */
        RankingEnabled: PlainDescriptor<boolean>;
        /**
         * The maximum number of 'safe move actions' allowed within a single period while
         * retaining eligibility for bonus rewards. Exceeding this limit will result in the
         * forfeiture of the bonus rewards for the affected stake.
         */
        MaxBonusSafeMovesPerPeriod: PlainDescriptor<number>;
    };
    Assets: {
        /**
         * Max number of items to destroy per `destroy_accounts` and `destroy_approvals` call.
         *
         * Must be configured to result in a weight that makes each call fit in a block.
         */
        RemoveItemsLimit: PlainDescriptor<number>;
        /**
         * The basic amount of funds that must be reserved for an asset.
         */
        AssetDeposit: PlainDescriptor<bigint>;
        /**
         * The amount of funds that must be reserved for a non-provider asset account to be
         * maintained.
         */
        AssetAccountDeposit: PlainDescriptor<bigint>;
        /**
         * The basic amount of funds that must be reserved when adding metadata to your asset.
         */
        MetadataDepositBase: PlainDescriptor<bigint>;
        /**
         * The additional funds that must be reserved for the number of bytes you store in your
         * metadata.
         */
        MetadataDepositPerByte: PlainDescriptor<bigint>;
        /**
         * The amount of funds that must be reserved when creating a new approval.
         */
        ApprovalDeposit: PlainDescriptor<bigint>;
        /**
         * The maximum length of a name or symbol stored on-chain.
         */
        StringLimit: PlainDescriptor<number>;
    };
    PriceAggregator: {
        /**
         * Maximum number of distinct currency values we can store during a single block.
         */
        MaxValuesPerBlock: PlainDescriptor<number>;
        /**
         * Maximum length of the circular buffer used to calculate the moving average.
         */
        CircularBufferLength: PlainDescriptor<number>;
        /**
         * Duration of aggregation period expressed in the number of blocks.
         * During this time, currency values are aggregated, and are then used to calculate the average value.
         */
        AggregationDuration: PlainDescriptor<number>;
    };
    Oracle: {
        /**
         * The root operator account id, record all sudo feeds on this account.
         */
        RootOperatorAccountId: PlainDescriptor<SS58String>;
        /**
         * Maximum size of HasDispatched
         */
        MaxHasDispatchedSize: PlainDescriptor<number>;
        /**
         * Maximum size the vector used for feed values
         */
        MaxFeedValues: PlainDescriptor<number>;
    };
    Aura: {
        /**
         * The slot duration Aura should run with, expressed in milliseconds.
         * The effective value of this type should not change while the chain is running.
         *
         * For backwards compatibility either use [`MinimumPeriodTimesTwo`] or a const.
         */
        SlotDuration: PlainDescriptor<bigint>;
    };
    XcmpQueue: {
        /**
         * The maximum number of inbound XCMP channels that can be suspended simultaneously.
         *
         * Any further channel suspensions will fail and messages may get dropped without further
         * notice. Choosing a high value (1000) is okay; the trade-off that is described in
         * [`InboundXcmpSuspended`] still applies at that scale.
         */
        MaxInboundSuspended: PlainDescriptor<number>;
        /**
         * Maximal number of outbound XCMP channels that can have messages queued at the same time.
         *
         * If this is reached, then no further messages can be sent to channels that do not yet
         * have a message queued. This should be set to the expected maximum of outbound channels
         * which is determined by [`Self::ChannelInfo`]. It is important to set this large enough,
         * since otherwise the congestion control protocol will not work as intended and messages
         * may be dropped. This value increases the PoV and should therefore not be picked too
         * high. Governance needs to pay attention to not open more channels than this value.
         */
        MaxActiveOutboundChannels: PlainDescriptor<number>;
        /**
         * The maximal page size for HRMP message pages.
         *
         * A lower limit can be set dynamically, but this is the hard-limit for the PoV worst case
         * benchmarking. The limit for the size of a message is slightly below this, since some
         * overhead is incurred for encoding the format.
         */
        MaxPageSize: PlainDescriptor<number>;
    };
    XTokens: {
        /**
         * Self chain location.
         */
        SelfLocation: PlainDescriptor<Anonymize<If9iqq7i64mur8>>;
        /**
         * Base XCM weight.
         *
         * The actually weight for an XCM message is `T::BaseXcmWeight +
         * T::Weigher::weight(&msg)`.
         */
        BaseXcmWeight: PlainDescriptor<Anonymize<I4q39t5hn830vp>>;
        /**
         * The id of the RateLimiter.
         */
        RateLimiterId: PlainDescriptor<undefined>;
    };
    MessageQueue: {
        /**
         * The size of the page; this implies the maximum message size which can be sent.
         *
         * A good value depends on the expected message sizes, their weights, the weight that is
         * available for processing them and the maximal needed message size. The maximal message
         * size is slightly lower than this as defined by [`MaxMessageLenOf`].
         */
        HeapSize: PlainDescriptor<number>;
        /**
         * The maximum number of stale pages (i.e. of overweight messages) allowed before culling
         * can happen. Once there are more stale pages than this, then historical pages may be
         * dropped, even if they contain unprocessed overweight messages.
         */
        MaxStale: PlainDescriptor<number>;
        /**
         * The amount of weight (if any) which should be provided to the message queue for
         * servicing enqueued items `on_initialize`.
         *
         * This may be legitimately `None` in the case that you will call
         * `ServiceQueues::service_queues` manually or set [`Self::IdleMaxServiceWeight`] to have
         * it run in `on_idle`.
         */
        ServiceWeight: PlainDescriptor<Anonymize<Iasb8k6ash5mjn>>;
        /**
         * The maximum amount of weight (if any) to be used from remaining weight `on_idle` which
         * should be provided to the message queue for servicing enqueued items `on_idle`.
         * Useful for parachains to process messages at the same block they are received.
         *
         * If `None`, it will not call `ServiceQueues::service_queues` in `on_idle`.
         */
        IdleMaxServiceWeight: PlainDescriptor<Anonymize<Iasb8k6ash5mjn>>;
    };
    Contracts: {
        /**
         * Cost schedule and limits.
         */
        Schedule: PlainDescriptor<Anonymize<Ijc5n210o8bbf>>;
        /**
         * The amount of balance a caller has to pay for each byte of storage.
         *
         * # Note
         *
         * Changing this value for an existing chain might need a storage migration.
         */
        DepositPerByte: PlainDescriptor<bigint>;
        /**
         * Fallback value to limit the storage deposit if it's not being set by the caller.
         */
        DefaultDepositLimit: PlainDescriptor<bigint>;
        /**
         * The amount of balance a caller has to pay for each storage item.
         *
         * # Note
         *
         * Changing this value for an existing chain might need a storage migration.
         */
        DepositPerItem: PlainDescriptor<bigint>;
        /**
         * The percentage of the storage deposit that should be held for using a code hash.
         * Instantiating a contract, or calling [`chain_extension::Ext::lock_delegate_dependency`]
         * protects the code from being removed. In order to prevent abuse these actions are
         * protected with a percentage of the code deposit.
         */
        CodeHashLockupDepositPercent: PlainDescriptor<number>;
        /**
         * The maximum length of a contract code in bytes.
         *
         * The value should be chosen carefully taking into the account the overall memory limit
         * your runtime has, as well as the [maximum allowed callstack
         * depth](#associatedtype.CallStack). Look into the `integrity_test()` for some insights.
         */
        MaxCodeLen: PlainDescriptor<number>;
        /**
         * The maximum allowable length in bytes for storage keys.
         */
        MaxStorageKeyLen: PlainDescriptor<number>;
        /**
         * The maximum size of the transient storage in bytes.
         * This includes keys, values, and previous entries used for storage rollback.
         */
        MaxTransientStorageSize: PlainDescriptor<number>;
        /**
         * The maximum number of delegate_dependencies that a contract can lock with
         * [`chain_extension::Ext::lock_delegate_dependency`].
         */
        MaxDelegateDependencies: PlainDescriptor<number>;
        /**
         * Make contract callable functions marked as `#[unstable]` available.
         *
         * Contracts that use `#[unstable]` functions won't be able to be uploaded unless
         * this is set to `true`. This is only meant for testnets and dev nodes in order to
         * experiment with new features.
         *
         * # Warning
         *
         * Do **not** set to `true` on productions chains.
         */
        UnsafeUnstableInterface: PlainDescriptor<boolean>;
        /**
         * The maximum length of the debug buffer in bytes.
         */
        MaxDebugBufferLen: PlainDescriptor<number>;
        /**
         * Type that bundles together all the runtime configurable interface types.
         *
         * This is not a real config. We just mention the type here as constant so that
         * its type appears in the metadata. Only valid value is `()`.
         */
        Environment: PlainDescriptor<Anonymize<I3m5sq54sjdlso>>;
        /**
         * The version of the HostFn APIs that are available in the runtime.
         *
         * Only valid value is `()`.
         */
        ApiVersion: PlainDescriptor<number>;
    };
    Council: {
        /**
         * The maximum weight of a dispatch call that can be proposed and executed.
         */
        MaxProposalWeight: PlainDescriptor<Anonymize<I4q39t5hn830vp>>;
    };
    TechnicalCommittee: {
        /**
         * The maximum weight of a dispatch call that can be proposed and executed.
         */
        MaxProposalWeight: PlainDescriptor<Anonymize<I4q39t5hn830vp>>;
    };
    CommunityCouncil: {
        /**
         * The maximum weight of a dispatch call that can be proposed and executed.
         */
        MaxProposalWeight: PlainDescriptor<Anonymize<I4q39t5hn830vp>>;
    };
    Democracy: {
        /**
         * The period between a proposal being approved and enacted.
         *
         * It should generally be a little more than the unstake period to ensure that
         * voting stakers have an opportunity to remove themselves from the system in the case
         * where they are on the losing side of a vote.
         */
        EnactmentPeriod: PlainDescriptor<number>;
        /**
         * How often (in blocks) new public referenda are launched.
         */
        LaunchPeriod: PlainDescriptor<number>;
        /**
         * How often (in blocks) to check for new votes.
         */
        VotingPeriod: PlainDescriptor<number>;
        /**
         * The minimum period of vote locking.
         *
         * It should be no shorter than enactment period to ensure that in the case of an approval,
         * those successful voters are locked into the consequences that their votes entail.
         */
        VoteLockingPeriod: PlainDescriptor<number>;
        /**
         * The minimum amount to be used as a deposit for a public referendum proposal.
         */
        MinimumDeposit: PlainDescriptor<bigint>;
        /**
         * Indicator for whether an emergency origin is even allowed to happen. Some chains may
         * want to set this permanently to `false`, others may want to condition it on things such
         * as an upgrade having happened recently.
         */
        InstantAllowed: PlainDescriptor<boolean>;
        /**
         * Minimum voting period allowed for a fast-track referendum.
         */
        FastTrackVotingPeriod: PlainDescriptor<number>;
        /**
         * Period in blocks where an external proposal may not be re-submitted after being vetoed.
         */
        CooloffPeriod: PlainDescriptor<number>;
        /**
         * The maximum number of votes for an account.
         *
         * Also used to compute weight, an overly big value can
         * lead to extrinsic with very big weight: see `delegate` for instance.
         */
        MaxVotes: PlainDescriptor<number>;
        /**
         * The maximum number of public proposals that can exist at any time.
         */
        MaxProposals: PlainDescriptor<number>;
        /**
         * The maximum number of deposits a public proposal may have at any time.
         */
        MaxDeposits: PlainDescriptor<number>;
        /**
         * The maximum number of items which can be blacklisted.
         */
        MaxBlacklisted: PlainDescriptor<number>;
    };
    Treasury: {
        /**
         * Fraction of a proposal's value that should be bonded in order to place the proposal.
         * An accepted proposal gets these back. A rejected proposal does not.
         */
        ProposalBond: PlainDescriptor<number>;
        /**
         * Minimum amount of funds that should be placed in a deposit for making a proposal.
         */
        ProposalBondMinimum: PlainDescriptor<bigint>;
        /**
         * Maximum amount of funds that should be placed in a deposit for making a proposal.
         */
        ProposalBondMaximum: PlainDescriptor<Anonymize<I35p85j063s0il>>;
        /**
         * Period between successive spends.
         */
        SpendPeriod: PlainDescriptor<number>;
        /**
         * Percentage of spare funds (if any) that are burnt per spend period.
         */
        Burn: PlainDescriptor<number>;
        /**
         * The treasury's pallet id, used for deriving its sovereign account ID.
         */
        PalletId: PlainDescriptor<FixedSizeBinary<8>>;
        /**
         * The maximum number of approvals that can wait in the spending queue.
         *
         * NOTE: This parameter is also used within the Bounties Pallet extension if enabled.
         */
        MaxApprovals: PlainDescriptor<number>;
    };
    CommunityTreasury: {
        /**
         * Fraction of a proposal's value that should be bonded in order to place the proposal.
         * An accepted proposal gets these back. A rejected proposal does not.
         */
        ProposalBond: PlainDescriptor<number>;
        /**
         * Minimum amount of funds that should be placed in a deposit for making a proposal.
         */
        ProposalBondMinimum: PlainDescriptor<bigint>;
        /**
         * Maximum amount of funds that should be placed in a deposit for making a proposal.
         */
        ProposalBondMaximum: PlainDescriptor<Anonymize<I35p85j063s0il>>;
        /**
         * Period between successive spends.
         */
        SpendPeriod: PlainDescriptor<number>;
        /**
         * Percentage of spare funds (if any) that are burnt per spend period.
         */
        Burn: PlainDescriptor<number>;
        /**
         * The treasury's pallet id, used for deriving its sovereign account ID.
         */
        PalletId: PlainDescriptor<FixedSizeBinary<8>>;
        /**
         * The maximum number of approvals that can wait in the spending queue.
         *
         * NOTE: This parameter is also used within the Bounties Pallet extension if enabled.
         */
        MaxApprovals: PlainDescriptor<number>;
    };
    SafeMode: {
        /**
         * For how many blocks the safe-mode will be entered by [`Pallet::enter`].
         */
        EnterDuration: PlainDescriptor<number>;
        /**
         * For how many blocks the safe-mode can be extended by each [`Pallet::extend`] call.
         *
         * This does not impose a hard limit as the safe-mode can be extended multiple times.
         */
        ExtendDuration: PlainDescriptor<number>;
        /**
         * The amount that will be reserved upon calling [`Pallet::enter`].
         *
         * `None` disallows permissionlessly enabling the safe-mode and is a sane default.
         */
        EnterDepositAmount: PlainDescriptor<Anonymize<I35p85j063s0il>>;
        /**
         * The amount that will be reserved upon calling [`Pallet::extend`].
         *
         * `None` disallows permissionlessly extending the safe-mode and is a sane default.
         */
        ExtendDepositAmount: PlainDescriptor<Anonymize<I35p85j063s0il>>;
        /**
         * The minimal duration a deposit will remain reserved after safe-mode is entered or
         * extended, unless [`Pallet::force_release_deposit`] is successfully called sooner.
         *
         * Every deposit is tied to a specific activation or extension, thus each deposit can be
         * released independently after the delay for it has passed.
         *
         * `None` disallows permissionlessly releasing the safe-mode deposits and is a sane
         * default.
         */
        ReleaseDelay: PlainDescriptor<Anonymize<I4arjljr6dpflb>>;
    };
    TxPause: {
        /**
         * Maximum length for pallet name and call name SCALE encoded string names.
         *
         * TOO LONG NAMES WILL BE TREATED AS PAUSED.
         */
        MaxNameLen: PlainDescriptor<number>;
    };
    MultiBlockMigrations: {
        /**
         * The maximal length of an encoded cursor.
         *
         * A good default needs to selected such that no migration will ever have a cursor with MEL
         * above this limit. This is statically checked in `integrity_test`.
         */
        CursorMaxLen: PlainDescriptor<number>;
        /**
         * The maximal length of an encoded identifier.
         *
         * A good default needs to selected such that no migration will ever have an identifier
         * with MEL above this limit. This is statically checked in `integrity_test`.
         */
        IdentifierMaxLen: PlainDescriptor<number>;
    };
};
type IViewFns = {};
type IRuntimeCalls = {
    /**
     * The `Core` runtime api that every Substrate runtime needs to implement.
     */
    Core: {
        /**
         * Returns the version of the runtime.
         */
        version: RuntimeDescriptor<[], Anonymize<I4fo08joqmcqnm>>;
        /**
         * Execute the given block.
         */
        execute_block: RuntimeDescriptor<[block: Anonymize<Iaqet9jc3ihboe>], undefined>;
        /**
         * Initialize a block with the given header and return the runtime executive mode.
         */
        initialize_block: RuntimeDescriptor<[header: Anonymize<Ic952bubvq4k7d>], Anonymize<I2v50gu3s1aqk6>>;
    };
    /**
     * The `Metadata` api trait that returns metadata for the runtime.
     */
    Metadata: {
        /**
         * Returns the metadata of a runtime.
         */
        metadata: RuntimeDescriptor<[], Binary>;
        /**
         * Returns the metadata at a given version.
         *
         * If the given `version` isn't supported, this will return `None`.
         * Use [`Self::metadata_versions`] to find out about supported metadata version of the runtime.
         */
        metadata_at_version: RuntimeDescriptor<[version: number], Anonymize<Iabpgqcjikia83>>;
        /**
         * Returns the supported metadata versions.
         *
         * This can be used to call `metadata_at_version`.
         */
        metadata_versions: RuntimeDescriptor<[], Anonymize<Icgljjb6j82uhn>>;
    };
    /**
     * API necessary for block authorship with aura.
     */
    AuraApi: {
        /**
         * Returns the slot duration for Aura.
         *
         * Currently, only the value provided by this type at genesis will be used.
         */
        slot_duration: RuntimeDescriptor<[], bigint>;
        /**
         * Return the current set of authorities.
         */
        authorities: RuntimeDescriptor<[], Anonymize<Ic5m5lp1oioo8r>>;
    };
    /**
     * This runtime API is used to inform potential block authors whether they will
     * have the right to author at a slot, assuming they have claimed the slot.
     *
     * In particular, this API allows Aura-based parachains to regulate their "unincluded segment",
     * which is the section of the head of the chain which has not yet been made available in the
     * relay chain.
     *
     * When the unincluded segment is short, Aura chains will allow authors to create multiple
     * blocks per slot in order to build a backlog. When it is saturated, this API will limit
     * the amount of blocks that can be created.
     */
    AuraUnincludedSegmentApi: {
        /**
         * Whether it is legal to extend the chain, assuming the given block is the most
         * recently included one as-of the relay parent that will be built against, and
         * the given slot.
         *
         * This should be consistent with the logic the runtime uses when validating blocks to
         * avoid issues.
         *
         * When the unincluded segment is empty, i.e. `included_hash == at`, where at is the block
         * whose state we are querying against, this must always return `true` as long as the slot
         * is more recent than the included block itself.
         */
        can_build_upon: RuntimeDescriptor<[included_hash: FixedSizeBinary<32>, slot: bigint], boolean>;
    };
    /**
     * The `BlockBuilder` api trait that provides the required functionality for building a block.
     */
    BlockBuilder: {
        /**
         * Apply the given extrinsic.
         *
         * Returns an inclusion outcome which specifies if this extrinsic is included in
         * this block or not.
         */
        apply_extrinsic: RuntimeDescriptor<[extrinsic: Binary], Anonymize<Iedigu6rpmlqgi>>;
        /**
         * Finish the current block.
         */
        finalize_block: RuntimeDescriptor<[], Anonymize<Ic952bubvq4k7d>>;
        /**
         * Generate inherent extrinsics. The inherent data will vary from chain to chain.
         */
        inherent_extrinsics: RuntimeDescriptor<[inherent: Anonymize<If7uv525tdvv7a>], Anonymize<Itom7fk49o0c9>>;
        /**
         * Check that the inherents are valid. The inherent data will vary from chain to chain.
         */
        check_inherents: RuntimeDescriptor<[block: Anonymize<Iaqet9jc3ihboe>, data: Anonymize<If7uv525tdvv7a>], Anonymize<I2an1fs2eiebjp>>;
    };
    /**
     * The `TaggedTransactionQueue` api trait for interfering with the transaction queue.
     */
    TaggedTransactionQueue: {
        /**
         * Validate the transaction.
         *
         * This method is invoked by the transaction pool to learn details about given transaction.
         * The implementation should make sure to verify the correctness of the transaction
         * against current state. The given `block_hash` corresponds to the hash of the block
         * that is used as current state.
         *
         * Note that this call may be performed by the pool multiple times and transactions
         * might be verified in any possible order.
         */
        validate_transaction: RuntimeDescriptor<[source: TransactionValidityTransactionSource, tx: Binary, block_hash: FixedSizeBinary<32>], Anonymize<I9ask1o4tfvcvs>>;
    };
    /**
     * The offchain worker api.
     */
    OffchainWorkerApi: {
        /**
         * Starts the off-chain task for given block header.
         */
        offchain_worker: RuntimeDescriptor<[header: Anonymize<Ic952bubvq4k7d>], undefined>;
    };
    /**
     * The API to query account nonce.
     */
    AccountNonceApi: {
        /**
         * Get current account nonce of given `AccountId`.
         */
        account_nonce: RuntimeDescriptor<[account: SS58String], number>;
    };
    /**
    
     */
    TransactionPaymentApi: {
        /**
        
         */
        query_info: RuntimeDescriptor<[uxt: Binary, len: number], Anonymize<I6spmpef2c7svf>>;
        /**
        
         */
        query_fee_details: RuntimeDescriptor<[uxt: Binary, len: number], Anonymize<Iei2mvq0mjvt81>>;
        /**
        
         */
        query_weight_to_fee: RuntimeDescriptor<[weight: Anonymize<I4q39t5hn830vp>], bigint>;
        /**
        
         */
        query_length_to_fee: RuntimeDescriptor<[length: number], bigint>;
    };
    /**
    
     */
    TransactionPaymentCallApi: {
        /**
         * Query information of a dispatch class, weight, and fee of a given encoded `Call`.
         */
        query_call_info: RuntimeDescriptor<[call: Anonymize<Iedia33gem7v9i>, len: number], Anonymize<I6spmpef2c7svf>>;
        /**
         * Query fee details of a given encoded `Call`.
         */
        query_call_fee_details: RuntimeDescriptor<[call: Anonymize<Iedia33gem7v9i>, len: number], Anonymize<Iei2mvq0mjvt81>>;
        /**
         * Query the output of the current `WeightToFee` given some input.
         */
        query_weight_to_fee: RuntimeDescriptor<[weight: Anonymize<I4q39t5hn830vp>], bigint>;
        /**
         * Query the output of the current `LengthToFee` given some input.
         */
        query_length_to_fee: RuntimeDescriptor<[length: number], bigint>;
    };
    /**
     * Session keys runtime api.
     */
    SessionKeys: {
        /**
         * Generate a set of session keys with optionally using the given seed.
         * The keys should be stored within the keystore exposed via runtime
         * externalities.
         *
         * The seed needs to be a valid `utf8` string.
         *
         * Returns the concatenated SCALE encoded public keys.
         */
        generate_session_keys: RuntimeDescriptor<[seed: Anonymize<Iabpgqcjikia83>], Binary>;
        /**
         * Decode the given public session keys.
         *
         * Returns the list of public raw public keys + key type.
         */
        decode_session_keys: RuntimeDescriptor<[encoded: Binary], Anonymize<Icerf8h8pdu8ss>>;
    };
    /**
     * Runtime api to collect information about a collation.
     */
    CollectCollationInfo: {
        /**
         * Collect information about a collation.
         *
         * The given `header` is the header of the built block for that
         * we are collecting the collation info for.
         */
        collect_collation_info: RuntimeDescriptor<[header: Anonymize<Ic952bubvq4k7d>], Anonymize<Ic1d4u2opv3fst>>;
    };
    /**
     * API necessary for Ethereum-compatibility layer.
     */
    EthereumRuntimeRPCApi: {
        /**
         * Returns runtime defined pallet_evm::ChainId.
         */
        chain_id: RuntimeDescriptor<[], bigint>;
        /**
         * Returns pallet_evm::Accounts by address.
         */
        account_basic: RuntimeDescriptor<[address: FixedSizeBinary<20>], Anonymize<If08sfhqn8ujfr>>;
        /**
         * Returns FixedGasPrice::min_gas_price
         */
        gas_price: RuntimeDescriptor<[], Anonymize<I4totqt881mlti>>;
        /**
         * For a given account address, returns pallet_evm::AccountCodes.
         */
        account_code_at: RuntimeDescriptor<[address: FixedSizeBinary<20>], Binary>;
        /**
         * Returns the converted FindAuthor::find_author authority id.
         */
        author: RuntimeDescriptor<[], FixedSizeBinary<20>>;
        /**
         * For a given account address and index, returns pallet_evm::AccountStorages.
         */
        storage_at: RuntimeDescriptor<[address: FixedSizeBinary<20>, index: Anonymize<I4totqt881mlti>], FixedSizeBinary<32>>;
        /**
        
         */
        call: RuntimeDescriptor<[from: FixedSizeBinary<20>, to: FixedSizeBinary<20>, data: Binary, value: Anonymize<I4totqt881mlti>, gas_limit: Anonymize<I4totqt881mlti>, max_fee_per_gas: Anonymize<Ic4rgfgksgmm3e>, max_priority_fee_per_gas: Anonymize<Ic4rgfgksgmm3e>, nonce: Anonymize<Ic4rgfgksgmm3e>, estimate: boolean, access_list: Anonymize<I3dj14b7k3rkm5>], Anonymize<I55hda2igh2kpe>>;
        /**
        
         */
        create: RuntimeDescriptor<[from: FixedSizeBinary<20>, data: Binary, value: Anonymize<I4totqt881mlti>, gas_limit: Anonymize<I4totqt881mlti>, max_fee_per_gas: Anonymize<Ic4rgfgksgmm3e>, max_priority_fee_per_gas: Anonymize<Ic4rgfgksgmm3e>, nonce: Anonymize<Ic4rgfgksgmm3e>, estimate: boolean, access_list: Anonymize<I3dj14b7k3rkm5>], Anonymize<Ib5fuj3h6uddcc>>;
        /**
         * Return the current block.
         */
        current_block: RuntimeDescriptor<[], Anonymize<Ifogockjiq4b3>>;
        /**
         * Return the current receipt.
         */
        current_receipts: RuntimeDescriptor<[], Anonymize<I2r0n4gcrs974b>>;
        /**
         * Return the current transaction status.
         */
        current_transaction_statuses: RuntimeDescriptor<[], Anonymize<Ie6kgk6f04rsvk>>;
        /**
        
         */
        current_all: RuntimeDescriptor<[], Anonymize<Ibkook56hopvp8>>;
        /**
         * Receives a `Vec<OpaqueExtrinsic>` and filters all the ethereum transactions.
         */
        extrinsic_filter: RuntimeDescriptor<[xts: Anonymize<Itom7fk49o0c9>], Anonymize<I1fl9qh2r1hf29>>;
        /**
         * Return the elasticity multiplier.
         */
        elasticity: RuntimeDescriptor<[], Anonymize<I4arjljr6dpflb>>;
        /**
         * Used to determine if gas limit multiplier for non-transactional calls (eth_call/estimateGas)
         * is supported.
         */
        gas_limit_multiplier_support: RuntimeDescriptor<[], undefined>;
        /**
         * Return the pending block.
         */
        pending_block: RuntimeDescriptor<[xts: Anonymize<Itom7fk49o0c9>], Anonymize<I45rl58hfs7m0h>>;
        /**
         * Initialize the pending block.
         * The behavior should be the same as the runtime api Core_initialize_block but
         * for a "pending" block.
         * If your project don't need to have a different behavior to initialize "pending" blocks,
         * you can copy your Core_initialize_block implementation.
         */
        initialize_pending_block: RuntimeDescriptor<[header: Anonymize<Ic952bubvq4k7d>], undefined>;
    };
    /**
    
     */
    ConvertTransactionRuntimeApi: {
        /**
        
         */
        convert_transaction: RuntimeDescriptor<[transaction: Anonymize<I6fr2mqud652ga>], Binary>;
    };
    /**
     * The API used to dry-run contract interactions.
     */
    ContractsApi: {
        /**
         * Perform a call from a specified account to a given contract.
         *
         * See [`crate::Pallet::bare_call`].
         */
        call: RuntimeDescriptor<[origin: SS58String, dest: SS58String, value: bigint, gas_limit: Anonymize<Iasb8k6ash5mjn>, storage_deposit_limit: Anonymize<I35p85j063s0il>, input_data: Binary], Anonymize<I6pj5ltvn0n3ld>>;
        /**
         * Instantiate a new contract.
         *
         * See `[crate::Pallet::bare_instantiate]`.
         */
        instantiate: RuntimeDescriptor<[origin: SS58String, value: bigint, gas_limit: Anonymize<Iasb8k6ash5mjn>, storage_deposit_limit: Anonymize<I35p85j063s0il>, code: Anonymize<I9sijb8gfrns29>, data: Binary, salt: Binary], Anonymize<I9cuhvnfjpga8u>>;
        /**
         * Upload new code without instantiating a contract from it.
         *
         * See [`crate::Pallet::bare_upload_code`].
         */
        upload_code: RuntimeDescriptor<[origin: SS58String, code: Binary, storage_deposit_limit: Anonymize<I35p85j063s0il>, determinism: Anonymize<I2dfliekq1ed7e>], Anonymize<Idmj5j6lk1d68c>>;
        /**
         * Query a given storage key in a given contract.
         *
         * Returns `Ok(Some(Vec<u8>))` if the storage value exists under the given key in the
         * specified account and `Ok(None)` if it doesn't. If the account specified by the address
         * doesn't exist, or doesn't have a contract then `Err` is returned.
         */
        get_storage: RuntimeDescriptor<[address: SS58String, key: Binary], Anonymize<I9u22scd4ksrjm>>;
    };
    /**
     * dApp Staking Api.
     *
     * Used to provide information otherwise not available via RPC.
     */
    DappStakingApi: {
        /**
         * How many periods are there in one cycle.
         */
        periods_per_cycle: RuntimeDescriptor<[], number>;
        /**
         * For how many standard era lengths does the voting subperiod last.
         */
        eras_per_voting_subperiod: RuntimeDescriptor<[], number>;
        /**
         * How many standard eras are there in the build&earn subperiod.
         */
        eras_per_build_and_earn_subperiod: RuntimeDescriptor<[], number>;
        /**
         * How many blocks are there per standard era.
         */
        blocks_per_era: RuntimeDescriptor<[], number>;
        /**
         * Get dApp ranked tier assignment for the given dApp.
         */
        get_dapp_tier_assignment: RuntimeDescriptor<[], Anonymize<Iep4uo61810hfs>>;
    };
    /**
     * A trait of XCM payment API.
     *
     * API provides functionality for obtaining:
     *
     * * the weight required to execute an XCM message,
     * * a list of acceptable `AssetId`s for message execution payment,
     * * the cost of the weight in the specified acceptable `AssetId`.
     * * the fees for an XCM message delivery.
     *
     * To determine the execution weight of the calls required for
     * [`xcm::latest::Instruction::Transact`] instruction, `TransactionPaymentCallApi` can be used.
     */
    XcmPaymentApi: {
        /**
         * Returns a list of acceptable payment assets.
         *
         * # Arguments
         *
         * * `xcm_version`: Version.
         */
        query_acceptable_payment_assets: RuntimeDescriptor<[xcm_version: number], Anonymize<Iftvbctbo05fu4>>;
        /**
         * Returns a weight needed to execute a XCM.
         *
         * # Arguments
         *
         * * `message`: `VersionedXcm`.
         */
        query_xcm_weight: RuntimeDescriptor<[message: XcmVersionedXcm], Anonymize<Ic0c3req3mlc1l>>;
        /**
         * Converts a weight into a fee for the specified `AssetId`.
         *
         * # Arguments
         *
         * * `weight`: convertible `Weight`.
         * * `asset`: `VersionedAssetId`.
         */
        query_weight_to_asset_fee: RuntimeDescriptor<[weight: Anonymize<I4q39t5hn830vp>, asset: XcmVersionedAssetId], Anonymize<I7ocn4njqde3v5>>;
        /**
         * Get delivery fees for sending a specific `message` to a `destination`.
         * These always come in a specific asset, defined by the chain.
         *
         * # Arguments
         * * `message`: The message that'll be sent, necessary because most delivery fees are based on the
         * size of the message.
         * * `destination`: The destination to send the message to. Different destinations may use
         * different senders that charge different fees.
         */
        query_delivery_fees: RuntimeDescriptor<[destination: XcmVersionedLocation, message: XcmVersionedXcm], Anonymize<Iek7ha36da9mf5>>;
    };
    /**
     * API for dry-running extrinsics and XCM programs to get the programs that need to be passed to the fees API.
     *
     * All calls return a vector of tuples (location, xcm) where each "xcm" is executed in "location".
     * If there's local execution, the location will be "Here".
     * This vector can be used to calculate both execution and delivery fees.
     *
     * Calls or XCMs might fail when executed, this doesn't mean the result of these calls will be an `Err`.
     * In those cases, there might still be a valid result, with the execution error inside it.
     * The only reasons why these calls might return an error are listed in the [`Error`] enum.
     */
    DryRunApi: {
        /**
         * Dry run call V2.
         */
        dry_run_call: RuntimeDescriptor<[origin: Anonymize<Iekimmnjq021gh>, call: Anonymize<Iedia33gem7v9i>, result_xcms_version: number], Anonymize<I60mpf7i0nq9h4>>;
        /**
         * Dry run XCM program
         */
        dry_run_xcm: RuntimeDescriptor<[origin_location: XcmVersionedLocation, xcm: XcmVersionedXcm], Anonymize<Icvhoqf7i84h1r>>;
    };
    /**
    
     */
    TrustedQueryApi: {
        /**
         * Returns if the location is a trusted reserve for the asset.
         *
         * # Arguments
         * * `asset`: `VersionedAsset`.
         * * `location`: `VersionedLocation`.
         */
        is_trusted_reserve: RuntimeDescriptor<[asset: XcmVersionedAsset, location: XcmVersionedLocation], Anonymize<Icujp6hmv35vbn>>;
        /**
         * Returns if the asset can be teleported to the location.
         *
         * # Arguments
         * * `asset`: `VersionedAsset`.
         * * `location`: `VersionedLocation`.
         */
        is_trusted_teleporter: RuntimeDescriptor<[asset: XcmVersionedAsset, location: XcmVersionedLocation], Anonymize<Icujp6hmv35vbn>>;
    };
    /**
     * API to interact with `RuntimeGenesisConfig` for the runtime
     */
    GenesisBuilder: {
        /**
         * Build `RuntimeGenesisConfig` from a JSON blob not using any defaults and store it in the
         * storage.
         *
         * In the case of a FRAME-based runtime, this function deserializes the full
         * `RuntimeGenesisConfig` from the given JSON blob and puts it into the storage. If the
         * provided JSON blob is incorrect or incomplete or the deserialization fails, an error
         * is returned.
         *
         * Please note that provided JSON blob must contain all `RuntimeGenesisConfig` fields, no
         * defaults will be used.
         */
        build_state: RuntimeDescriptor<[json: Binary], Anonymize<Ie9sr1iqcg3cgm>>;
        /**
         * Returns a JSON blob representation of the built-in `RuntimeGenesisConfig` identified by
         * `id`.
         *
         * If `id` is `None` the function should return JSON blob representation of the default
         * `RuntimeGenesisConfig` struct of the runtime. Implementation must provide default
         * `RuntimeGenesisConfig`.
         *
         * Otherwise function returns a JSON representation of the built-in, named
         * `RuntimeGenesisConfig` preset identified by `id`, or `None` if such preset does not
         * exist. Returned `Vec<u8>` contains bytes of JSON blob (patch) which comprises a list of
         * (potentially nested) key-value pairs that are intended for customizing the default
         * runtime genesis config. The patch shall be merged (rfc7386) with the JSON representation
         * of the default `RuntimeGenesisConfig` to create a comprehensive genesis config that can
         * be used in `build_state` method.
         */
        get_preset: RuntimeDescriptor<[id: Anonymize<I1mqgk2tmnn9i2>], Anonymize<Iabpgqcjikia83>>;
        /**
         * Returns a list of identifiers for available builtin `RuntimeGenesisConfig` presets.
         *
         * The presets from the list can be queried with [`GenesisBuilder::get_preset`] method. If
         * no named presets are provided by the runtime the list is empty.
         */
        preset_names: RuntimeDescriptor<[], Anonymize<I6lr8sctk0bi4e>>;
    };
};
type IAsset = PlainDescriptor<void>;
export type AstarDispatchError = Anonymize<Ia0b5t2n4b7jh8>;
type PalletsTypedef = {
    __storage: IStorage;
    __tx: ICalls;
    __event: IEvent;
    __error: IError;
    __const: IConstants;
    __view: IViewFns;
};
type IDescriptors = {
    descriptors: {
        pallets: PalletsTypedef;
        apis: IRuntimeCalls;
    } & Promise<any>;
    metadataTypes: Promise<Uint8Array>;
    asset: IAsset;
    getMetadata: () => Promise<Uint8Array>;
    genesis: string | undefined;
};
declare const _allDescriptors: IDescriptors;
export default _allDescriptors;
export type AstarApis = ApisFromDef<IRuntimeCalls>;
export type AstarQueries = QueryFromPalletsDef<PalletsTypedef>;
export type AstarCalls = TxFromPalletsDef<PalletsTypedef>;
export type AstarEvents = EventsFromPalletsDef<PalletsTypedef>;
export type AstarErrors = ErrorsFromPalletsDef<PalletsTypedef>;
export type AstarConstants = ConstFromPalletsDef<PalletsTypedef>;
export type AstarViewFns = ViewFnsFromPalletsDef<PalletsTypedef>;
export type AstarCallData = Anonymize<Iedia33gem7v9i> & {
    value: {
        type: string;
    };
};
export type AstarWhitelistEntry = PalletKey | ApiKey<IRuntimeCalls> | `query.${NestedKey<PalletsTypedef['__storage']>}` | `tx.${NestedKey<PalletsTypedef['__tx']>}` | `event.${NestedKey<PalletsTypedef['__event']>}` | `error.${NestedKey<PalletsTypedef['__error']>}` | `const.${NestedKey<PalletsTypedef['__const']>}` | `view.${NestedKey<PalletsTypedef['__view']>}`;
type PalletKey = `*.${keyof (IStorage & ICalls & IEvent & IError & IConstants & IRuntimeCalls & IViewFns)}`;
type NestedKey<D extends Record<string, Record<string, any>>> = "*" | {
    [P in keyof D & string]: `${P}.*` | {
        [N in keyof D[P] & string]: `${P}.${N}`;
    }[keyof D[P] & string];
}[keyof D & string];
type ApiKey<D extends Record<string, Record<string, any>>> = "api.*" | {
    [P in keyof D & string]: `api.${P}.*` | {
        [N in keyof D[P] & string]: `api.${P}.${N}`;
    }[keyof D[P] & string];
}[keyof D & string];
