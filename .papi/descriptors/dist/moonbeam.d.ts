import { StorageDescriptor, PlainDescriptor, TxDescriptor, RuntimeDescriptor, Enum, ApisFromDef, QueryFromPalletsDef, TxFromPalletsDef, EventsFromPalletsDef, ErrorsFromPalletsDef, ConstFromPalletsDef, ViewFnsFromPalletsDef, HexString, FixedSizeBinary, Binary, FixedSizeArray } from "polkadot-api";
import { I5sesotjlssv2d, Iffmde3ekjedi9, I4mddgoa69c0a2, Ifjt5n168dqvjr, I95g6i7ilua7lq, Ieniouoqkq4icf, Phase, Ibgl04rn6nbfm6, I1v7jbnil3tjns, I8jgj1nhcr2dg8, Ifn6q3equiq9qi, Ia3sb0vgvovhtg, Iav8k1edbj86k7, Itom7fk49o0c9, I4i91h98n3cv1b, I4iumukclgj8ej, Iqnbvitf7a7l3, I6r5cbv8ttrb09, I4q39t5hn830vp, I1q8tnt1cluu5j, I8ds64oj6581v0, I5rp0aladdbrpc, Ie0j5apjs41eea, I9bin2jc70qt6q, TransactionPaymentReleases, I35tvldomfrgo6, I4k7tm7j6vdt7e, I6knmt844a3vbi, I45jh0r7cgpsjj, I6jltko73jemrp, I6jst4duko1p6f, I15qcqgmilpii9, I55luuvb7oq2a3, Icthrrn1e819l6, I82d8q70phr5qc, I7kej5hvj859dg, Iffrjmlp7d020q, I5h9039rqpeali, Ic9tuh1kf9enop, I36nb9b8a306lm, Iakad189l4ah9s, I6cs1itejju2vv, Ifg4nud9sun9ud, I1rjlrctbmbkv6, I4ftk0glls7946, Ic42splpg0rgdk, I4v65mt1qihbrb, Id5475igfi6cio, I2506ik7f9ukdl, Idhgvqu0hhernj, I7sft4mmcq61ka, I3ks2fimshchoe, I1f5dukd42n5v5, I78cuhvqqvjqpp, I7afhi9d8kt8k, I7jidl7qnnq87c, I82cps8ng2jtug, Ifitc0q6ckjb3j, Idi27giun0mb9q, Idud3fdh64aqp9, Ie7atdsih6q14b, I4totqt881mlti, I2p91o4c53gcqm, I56u24ncejr5kt, I9jd27rnpm8ttv, Ib2al60cdrpa3j, I1o0pm60kdcf2f, I4pact7n2e9a0i, Iab4eusbjjnf3n, I5isiedqd5giej, If9jidduiuq7vv, I6f39mehvlsbu3, Ic5m5lp1oioo8r, Iaqmpqm6nl9dad, Ifd4n2fqmntemu, I7pc2or9t0j7rj, I1fhhvus3f3pq9, Icgljjb6j82uhn, I9e1k9mfd924m0, Ibrauvtsisstbp, Ib77b0fp1a6mjr, I5g2vv0ckl2m8b, Ifup3lg9ro8a0f, I5qfubnuvrnqn6, I8t3u2dv73ahbd, I7vlvrrl2pnbgk, Ie0rpl5bahldfk, XcmPalletVersionMigrationStage, I7e5oaj2qi4kl1, I8e1rrqvum82k2, Iat62vud7hlod2, Ict03eedr8de9s, Icksgi86tt9bmn, I7pi9qrc9a6rbn, Ie7gvtu33pdnbd, I4s6jkha20aoh0, Ifjamgt3ponn9a, I78s05f59eoi8b, Ics9mfhmor8iso, Icf5eq2v7aoc8g, If9iqq7i64mur8, I121rub4n25k05, Idh2ug6ou4a8og, Iejeo53sea6n4q, I53esa2ms463bk, Ib4jhb8tt3uung, I3nt43q1felhpo, I8k4t3g0d1is9p, I7m9dkorbfsjro, I24au772a01k9n, Iepbsvlk3qceij, Iapo0cnvtli5i0, I4s6vifaf8k998, Iu5urbma3d3as, I316f7rqm1ifg1, I4p5t2krb1gmvp, I67smi4kj2jg4u, I74nture9pgqeq, Ibqjcgmcid3dll, Id15d558jgoqcl, Icdpdqb1rbmstf, Idb24blqv4khu3, I84l6vdi7riqfe, I1udtl7slp3rsi, I3bv0ejtjh5f9r, In7a38730s6qs, If15el53dd76v9, I9s0ave7t0vnrk, I4fo08joqmcqnm, I35p85j063s0il, Ibafpkl9hhno69, Iasb8k6ash5mjn, I4arjljr6dpflb, I8ofcg5rbj0g2c, I4adgbll7gku4i, I6pjjpfvhvcfru, I9pj91mj79qekl, I39uah9nss64h9, Ik64dknsq7k08, Ib51vk42m1po4n, I60v7bikk54tpu, Ifpj261e8s63m3, Idcr6u6361oad9, Ienjibnb78vnl0, Ibt8o5hb5hjbe0, I6emd42ofsah91, I69gs3ob8t125g, Ibnba9cres7tu, If07oirptjds1e, I86uimfcgksrk4, I5u8olqbbvfnvf, I5utcetro501ir, I6m4od67mjs4l8, I19e29tp35ff1j, I1h1ih5obm3cs, I3vh014cqgmrfd, I4vasl07tasls, I98vh5ccjtf1ev, I5ulcu9n58tsgp, Ievnk06j48hi6e, Ibrbas2gu3j75d, Ifcg60143soedq, I1jkfh0p9s7jk5, I5ib1pr87frhq4, I5in2p1j2slcin, I80codtbn0f4cb, Icelrbjjshs48m, I8af27or8sm75g, I6k6pg4oqio6oi, I9g0k5dg67b5dd, Iejqbff9jjd9h3, Id6m22i33hbgnr, I6gquroigvp00t, Iarl2feri6t3b9, I70etqpqbirlcf, Ic2l2vequpbumk, If4amksile11f8, Ib8en2d082q0uj, I3h01on2mas005, Ib9331h90g5b7e, I70t72khole5qd, Ibup5hc9m4kv4l, Io22o6h1g8ak4, Iavauuvpf6t3di, Idffocn2l23ful, I87r60dm6orh5i, Iehj01u80rci5u, I13jnl8irgeqkf, I64i34r0tn439a, I2kds5jji7slh8, I53ptv16c5mql7, I9l2s4klu0831o, I2ctrt5nqb8o7c, I711qahikocb1c, If885dhtb970mp, Id6gojh30v9ib2, Iess0pqcp8gkv8, Ibfkgq22t8bv8o, I22bk115c518rb, I25koabvo0egr8, Icq68a2na3ck8n, I540aqt3mhve7m, I1psn9kso0ag4m, Ie5l999tf7t2te, I5i8muthp7fh92, Ibdpqtl9rd54ba, I7brssfgjtq1ru, Icg7jk7nhmoong, Itmchvgqfl28g, Ic6v0pfadj60db, Idcabvplu05lea, I2ncccle6pmhd9, I92bnd3pe0civj, Ic84i538n8bl8j, Ia8ogbeici6lip, I3rugmro417cu2, I5n4sebgkfr760, I3uta02p49metg, Ifs1i5fk9cqvr6, I40fcd8ps9ksvh, Ie5p66h8puh1a7, Ieg3fd8p4pkt10, I8kg5ll427kfqq, I467333262q1l9, I82nfqfkd48n10, I1jm8m1rh9e20v, I3o5j3bli1pd8e, Idnsr2pndm36h0, I355vkhso2qs3n, I8steo882k7qns, I3ncitsp8frod4, I5f178ab6b89t3, I7qq8pedqs675e, I6qgv3p5m0m38b, I666bl2fqjkejo, Icbio0e1f0034b, I8c0vkqjjipnuj, I1adbcfi5uc62r, Ibf6ucefn8fh49, I7f7jli6vo6drv, I76b4rvmflooij, Idjsbeet1fe39m, Iflbk67akqs4pf, I2dtrijkm5601t, I2ev73t79f46tb, Ib2obgji960euh, I6nsmehln1kagc, Icm9m0qeemu66d, I9tebiigv8mfq3, Idnuqgq0sjkv0o, I1nl40o8rqtu3p, I63sne46ecs10u, I90duks9ein583, Ifs0pcpedmadns, Ia5cotcvi888ln, I21jsa919m88fd, Iegif7m3upfe1k, I9kt8c221c83ln, Ic76kfh5ebqkpl, Icscpmubum33bq, I21d2olof7eb60, Ibgm4rnf22lal1, Ie68np0vpihith, I9bnv6lu0crf1q, I6j6svr1mcma8b, I4e3fcbllc550c, I4ov6e94l79mbg, I91ebagm7eg2of, Idktplkgk9qubb, I46clc78rtmjag, Ifhl8qqlpgmrgk, Ie4fskhkb19lqm, Ifv4apklf5icev, I55kkfv5j6l61n, I87vll2k0a91o2, Iekaug5vo6n1jh, I6olidsoliung0, I32vkhn5265cl8, I13irkvjha30nl, I4dko4hu09aovh, I1he1llr4em5k8, Ib98qbv23c0tst, Iebdnbvufodnev, I9nrp6rbq1k4eb, I6sa7pko9va4d9, Ifsq5hnrgk1fhu, I53muj3qku75an, I7ftla9uldpsck, I6hso490tnm9h4, I4d8r6ni3smvbq, I5jipnfinnrumu, Iehad3aaamosq5, If6qluggsjqn24, Ibmjtl75ptu606, I7rec93lud546q, I5d5ame4o328hi, I6pm4ngit6p3fq, I4g6atvguddvkt, I40pqum1mu8qg3, I1r4c2ghbtvjuc, I379npf8sk9t8, Ic0s0pur65t3iu, Iatf3353k2f8t7, Ib9karr24cpmca, I83vh5qua5oulp, I2adkav4nfpltp, Ibou4u1engb441, Id6nbvqoqdj4o2, I95iqep3b8snn9, I29mlfpi57nes9, I9n8t62ile2km9, Iv53je8etqh25, Id3fgg5dtq3ja9, I7hl2ljcti73p2, I19i0akqkvu7h8, I4pbpsirgl3tci, I1be5fgduvh91i, If7h5asiehgc1m, Ib2r5rmd2kb5rr, I8enps0nf0j3o4, I6c1udb33nvkg9, Ifha513j297q5e, Ia82mnkmeo2rhc, Iun9l0lrnqvtt, Ift7k6k1vpbi63, Idd7hd99u0ho0n, Iafscmv8tjf0ou, I100l07kaehdlp, I6gnbnvip5vvdi, I3ecpih42i9ued, Idagmf1s3t818e, Iata20h6b309vv, I2933v5hnardc0, Ibvv65jm0gurrm, I4rsmslqkgb8qr, I3qt1hgg4djhgb, I4fooe9dun9o0t, I97pnebnn4tkhc, I68vefv6bi40pm, Iftkfae30kugcq, I17ukutvof0ve2, Ibvvl72jn681iq, Ie613ancv0jknl, I5sm0lt4vndrm9, I3llnd78pv2h9v, Idl5sk5t49u4vk, I3c0ak1g99r7mq, Ifc77bq577konn, Idh9lqfad8a2aq, I1p078p7cgor9k, Ifsfg9vjdv536v, I4hf4jr1nooq2i, I8q8go5ssttd5d, I6a9r4se514q6d, Ibjcii86jf2m74, I4jpr41fkr2iv2, I4ktb62ucg8r8v, I2l9i7suo53kao, I2mcpbv0ik4rbq, Icrvh9hsc9dfs0, I8jjc8aeseo568, Ia48s8or178ack, I6fomjr8ghrs40, I25jemnddpsl99, I39l6hn1m2g7p1, I91f3georfm7vn, I1d9e1b2lo88g3, Idhmv574kgr1en, Iamgbscgq9tk2s, Irqmq32c6bt43, I5aaf7rm6pdsdh, Iclnv1rm3j1ibs, I8u7aielas35pf, Ifs4v0043l9sa5, Ic41o5tfkjki24, I9qviu560vg4dt, Ifuev5pidklrr3, I1v10g1nq7dong, I9i38hjanm6j9f, Ic2pdjj0snhgp1, Itvt1jsipv0lc, I26b3hgj509l2q, Iabvuost5sn5bf, If6gpndc4hkjk, I980npvt4ko2oj, Icojbcdrmo8g9n, I4tp79beg36bon, I46oelk9rchag6, Iffoqstodvgb9c, Iavnfpaburegqq, If198fd3vrqn7u, Ib1i3vscnt2kp4, Ia55fgto645bva, I35njf1jhf1ie8, I8isor8208eull, I5nnh4168qqjsk, Ifmc9boeeia623, Iea4g5ovhnolus, Ifo07lib6rv8j3, Ia3c82eadg79bj, Ienusoeb625ftq, I5b6sd80djbc64, Ibhldvmubmjth2, I229ijht536qdu, Iepmkf5d8a0b7i, I9cg2delv92pvq, Ilhp45uime5tp, I4f1hv034jf1dt, Icdoijbojtaksl, I7kfspda96roem, I3gfupbmrg231o, Ia08e1l4rehsh9, Iak7fhrgb9jnnq, I36i15sa21ipvt, I8iksqi3eani0a, Iktsi3p12r1nf, I43kq8qudg7pq9, I76riseemre533, Ie5v6njpckr05b, I56jvc7p0b0306, I4hcillge8de5f, I9of9chdpickkl, Ic2o7gh4sgom1k, I4moiumda17j4k, I20nlejbovhut6, I137t1cld92pod, Ibeto40kl3r5j7, Ia72eet39sf8j9, If8u5kl4h8070m, Icl7nl1rfeog3i, Iasr6pj6shs0fl, I2uqmls7kcdnii, Idg69klialbkb8, I7r6b7145022pp, I30pg328m00nr3, Icmrn7bogp28cs, I7m9b5plj4h5ot, I9onhk772nfs4f, I3l6bnksrmt56r, Idh09k0l2pmdcg, I7uoiphbm0tj4r, I512p1n7qt24l8, I6s1nbislhk619, Idh8b393kqmj7j, Ielv09e10u0hs2, I6g4mum1jlnvc1, I3fprcgugsmetj, Ic5n87r88749i9, I56o6rrhe8jc9p, Ifk0u9gb6g0mb2, Ifstva0urnm27g, I4lpo3encq7fn8, Icd1cghie6s8nr, I6h2hvtgcdifdu, I624mqthj1is3k, Ibb83anngn8kjs, Iil3sdsh8fk7l, I2i7q7k387rgn8, Id9dkj6pnhun40, Ifg57078c09fmj, Iemia6jnjjt9pk, Ibp1rmkdg27gch, Ibb592400fjaeq, Id06b279ssr1kc, Ic0kmabrt5gmed, I7mnb4b8me3to9, Igss9t88pmg14, Iflkd2j467575k, Ie4l506ob97qll, Ibj2l071rn1t54, I84dsnnkjb0aqp, Ielbsgfbhoi5ci, I1rvj4ubaplho0, Ia3uu7lqcc1q1i, I7crucfnonitkn, I7tmrp94r9sq4n, Ia28js1r46j2jd, I2rh7qrq0i4g18, I8lbbb85osree4, I8sb4e35iir6l5, If1co0pilmi7oq, Iae74gjak1qibn, I3escdojpj0551, Iahnhnerp9kl4i, Ia0eo5esjam6l0, I9ii7g5i3f004f, Id4cm1n8k2kug1, I6p1tq74832j8u, Ij76tvu0faddj, I6r44prunlrgaa, I6b8h9eitutv15, I2epvs8l1lnps1, I5q1vbe7r2d82f, I27v0imulq8cgl, I73r8bg99ccqq4, Ifeve6k9vrdlrh, I8ih4atobnlo2v, Ic2a7mmhqckbbo, I8ac87iu4gllf7, I9l4i4j74aic6u, I6usvuval5ataj, Idcd89crotr3go, TransactionValidityTransactionSource, I9ask1o4tfvcvs, I7gtb9g2qv4r10, Ievrs91su783vi, I7uf2ofmdnm812, I3r3poh6h8vl7n, I74b5o27m5tpv, Iaqet9jc3ihboe, Ic952bubvq4k7d, I2v50gu3s1aqk6, Iabpgqcjikia83, Io4aq6tvaqcc7, If7uv525tdvv7a, I2an1fs2eiebjp, Icerf8h8pdu8ss, I6fr2mqud652ga, Id16ku1poe7q51, Ic4rgfgksgmm3e, I3dj14b7k3rkm5, I2q8ltoai1r4og, If08sfhqn8ujfr, I61suq2euu87ho, I7n8kbohflaod, Ifogockjiq4b3, I2r0n4gcrs974b, Ie6kgk6f04rsvk, Ibkook56hopvp8, I1fl9qh2r1hf29, I45rl58hfs7m0h, I6spmpef2c7svf, Iei2mvq0mjvt81, Ic1d4u2opv3fst, Iftvbctbo05fu4, XcmVersionedXcm, Ic0c3req3mlc1l, XcmVersionedAssetId, I7ocn4njqde3v5, XcmVersionedLocation, Iek7ha36da9mf5, I194p56vr9l05u, I5bgbhp433c8bl, Ifb4t7j7sn57m4, I81ojrtgkds5sl, I68l22felg5oio } from "./common-types";
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
        Account: StorageDescriptor<[Key: HexString], Anonymize<I5sesotjlssv2d>, false, never>;
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
        Events: StorageDescriptor<[], Anonymize<Ifjt5n168dqvjr>, false, never>;
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
    ParachainInfo: {
        /**
        
         */
        ParachainId: StorageDescriptor<[], number, false, never>;
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
        Account: StorageDescriptor<[Key: HexString], Anonymize<I1q8tnt1cluu5j>, false, never>;
        /**
         * Any liquidity locks on some account balances.
         * NOTE: Should only be accessed when setting, changing and freeing a lock.
         *
         * Use of locks is deprecated in favour of freezes. See `https://github.com/paritytech/substrate/pull/12951/`
         */
        Locks: StorageDescriptor<[Key: HexString], Anonymize<I8ds64oj6581v0>, false, never>;
        /**
         * Named reserves on some account balances.
         *
         * Use of reserves is deprecated in favour of holds. See `https://github.com/paritytech/substrate/pull/12951/`
         */
        Reserves: StorageDescriptor<[Key: HexString], Anonymize<I5rp0aladdbrpc>, false, never>;
        /**
         * Holds on account balances.
         */
        Holds: StorageDescriptor<[Key: HexString], Anonymize<Ie0j5apjs41eea>, false, never>;
        /**
         * Freeze locks on account balances.
         */
        Freezes: StorageDescriptor<[Key: HexString], Anonymize<I9bin2jc70qt6q>, false, never>;
    };
    TransactionPayment: {
        /**
        
         */
        NextFeeMultiplier: StorageDescriptor<[], bigint, false, never>;
        /**
        
         */
        StorageVersion: StorageDescriptor<[], TransactionPaymentReleases, false, never>;
    };
    ParachainStaking: {
        /**
         * Commission percent taken off of rewards for all collators
         */
        CollatorCommission: StorageDescriptor<[], number, false, never>;
        /**
         * The total candidates selected every round
         */
        TotalSelected: StorageDescriptor<[], number, false, never>;
        /**
         * Inflation distribution configuration, including accounts that should receive inflation
         * before it is distributed to collators and delegators.
         *
         * The sum of the distribution percents must be less than or equal to 100.
         */
        InflationDistributionInfo: StorageDescriptor<[], Anonymize<I35tvldomfrgo6>, false, never>;
        /**
         * Current round index and next round scheduled transition
         */
        Round: StorageDescriptor<[], Anonymize<I4k7tm7j6vdt7e>, false, never>;
        /**
         * Get delegator state associated with an account if account is delegating else None
         */
        DelegatorState: StorageDescriptor<[Key: HexString], Anonymize<I6knmt844a3vbi>, true, never>;
        /**
         * Get collator candidate info associated with an account if account is candidate else None
         */
        CandidateInfo: StorageDescriptor<[Key: HexString], Anonymize<I45jh0r7cgpsjj>, true, never>;
        /**
         * Stores outstanding delegation requests per collator.
         */
        DelegationScheduledRequests: StorageDescriptor<[Key: HexString], Anonymize<I6jltko73jemrp>, false, never>;
        /**
         * Stores auto-compounding configuration per collator.
         */
        AutoCompoundingDelegations: StorageDescriptor<[Key: HexString], Anonymize<I6jst4duko1p6f>, false, never>;
        /**
         * Top delegations for collator candidate
         */
        TopDelegations: StorageDescriptor<[Key: HexString], Anonymize<I15qcqgmilpii9>, true, never>;
        /**
         * Bottom delegations for collator candidate
         */
        BottomDelegations: StorageDescriptor<[Key: HexString], Anonymize<I15qcqgmilpii9>, true, never>;
        /**
         * The collator candidates selected for the current round
         */
        SelectedCandidates: StorageDescriptor<[], Anonymize<I55luuvb7oq2a3>, false, never>;
        /**
         * Total capital locked by this staking pallet
         */
        Total: StorageDescriptor<[], bigint, false, never>;
        /**
         * The pool of collator candidates, each with their total backing stake
         */
        CandidatePool: StorageDescriptor<[], Anonymize<Icthrrn1e819l6>, false, never>;
        /**
         * Snapshot of collator delegation stake at the start of the round
         */
        AtStake: StorageDescriptor<Anonymize<I7kej5hvj859dg>, Anonymize<I82d8q70phr5qc>, true, never>;
        /**
         * Records collators' inactivity.
         * Data persists for MaxOfflineRounds + 1 rounds before being pruned.
         */
        WasInactive: StorageDescriptor<Anonymize<I7kej5hvj859dg>, null, true, never>;
        /**
         * Delayed payouts
         */
        DelayedPayouts: StorageDescriptor<[Key: number], Anonymize<Iffrjmlp7d020q>, true, never>;
        /**
         * Inflation configuration
         */
        InflationConfig: StorageDescriptor<[], Anonymize<I5h9039rqpeali>, false, never>;
        /**
         * Total points awarded to collators for block production in the round
         */
        Points: StorageDescriptor<[Key: number], number, false, never>;
        /**
         * Points for each collator per round
         */
        AwardedPts: StorageDescriptor<Anonymize<I7kej5hvj859dg>, number, false, never>;
        /**
         * Killswitch to enable/disable marking offline feature.
         */
        EnableMarkingOffline: StorageDescriptor<[], boolean, false, never>;
    };
    AuthorInherent: {
        /**
         * Author of current block.
         */
        Author: StorageDescriptor<[], HexString, true, never>;
        /**
         * Check if the inherent was included
         */
        InherentIncluded: StorageDescriptor<[], boolean, false, never>;
    };
    AuthorFilter: {
        /**
        
         */
        EligibleRatio: StorageDescriptor<[], number, false, never>;
        /**
         * The number of active authors that will be eligible at each height.
         */
        EligibleCount: StorageDescriptor<[], number, false, never>;
    };
    AuthorMapping: {
        /**
         * We maintain a mapping from the NimbusIds used in the consensus layer
         * to the AccountIds runtime.
         */
        MappingWithDeposit: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Ic9tuh1kf9enop>, true, never>;
        /**
         * We maintain a reverse mapping from AccountIds to NimbusIDS
         */
        NimbusLookup: StorageDescriptor<[Key: HexString], FixedSizeBinary<32>, true, never>;
    };
    MoonbeamOrbiters: {
        /**
         * Account lookup override
         */
        AccountLookupOverride: StorageDescriptor<[Key: HexString], Anonymize<I36nb9b8a306lm>, true, never>;
        /**
         * Current orbiters, with their "parent" collator
         */
        CollatorsPool: StorageDescriptor<[Key: HexString], Anonymize<Iakad189l4ah9s>, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForCollatorsPool: StorageDescriptor<[], number, false, never>;
        /**
         * Current round index
         */
        CurrentRound: StorageDescriptor<[], number, false, never>;
        /**
         * If true, it forces the rotation at the next round.
         * A use case: when changing RotatePeriod, you need a migration code that sets this value to
         * true to avoid holes in OrbiterPerRound.
         */
        ForceRotation: StorageDescriptor<[], boolean, false, never>;
        /**
         * Minimum deposit required to be registered as an orbiter
         */
        MinOrbiterDeposit: StorageDescriptor<[], bigint, true, never>;
        /**
         * Store active orbiter per round and per parent collator
         */
        OrbiterPerRound: StorageDescriptor<Anonymize<I7kej5hvj859dg>, HexString, true, never>;
        /**
         * Check if account is an orbiter
         */
        RegisteredOrbiter: StorageDescriptor<[Key: HexString], boolean, true, never>;
    };
    AsyncBacking: {
        /**
         * First tuple element is the highest slot that has been seen in the history of this chain.
         * Second tuple element is the number of authored blocks so far.
         * This is a strictly-increasing value if T::AllowMultipleBlocksPerSlot = false.
         */
        SlotInfo: StorageDescriptor<[], Anonymize<I6cs1itejju2vv>, true, never>;
    };
    Proxy: {
        /**
         * The set of account proxies. Maps the account which has delegated to the accounts
         * which are being delegated to, together with the amount held on deposit.
         */
        Proxies: StorageDescriptor<[Key: HexString], Anonymize<Ifg4nud9sun9ud>, false, never>;
        /**
         * The announcements made by the proxy (key).
         */
        Announcements: StorageDescriptor<[Key: HexString], Anonymize<I1rjlrctbmbkv6>, false, never>;
    };
    MaintenanceMode: {
        /**
         * Whether the site is in maintenance mode
         */
        MaintenanceMode: StorageDescriptor<[], boolean, false, never>;
    };
    Identity: {
        /**
         * Information that is pertinent to identify the entity behind an account. First item is the
         * registration, second is the account's primary username.
         *
         * TWOX-NOTE: OK ― `AccountId` is a secure hash.
         */
        IdentityOf: StorageDescriptor<[Key: HexString], Anonymize<I4ftk0glls7946>, true, never>;
        /**
         * Identifies the primary username of an account.
         */
        UsernameOf: StorageDescriptor<[Key: HexString], Binary, true, never>;
        /**
         * The super-identity of an alternative "sub" identity together with its name, within that
         * context. If the account is not some other account's sub-identity, then just `None`.
         */
        SuperOf: StorageDescriptor<[Key: HexString], Anonymize<Ic42splpg0rgdk>, true, never>;
        /**
         * Alternative "sub" identities of this account.
         *
         * The first item is the deposit, the second is a vector of the accounts.
         *
         * TWOX-NOTE: OK ― `AccountId` is a secure hash.
         */
        SubsOf: StorageDescriptor<[Key: HexString], Anonymize<I4v65mt1qihbrb>, false, never>;
        /**
         * The set of registrars. Not expected to get very big as can only be added through a
         * special origin (likely a council motion).
         *
         * The index into this can be cast to `RegistrarIndex` to get a valid value.
         */
        Registrars: StorageDescriptor<[], Anonymize<Id5475igfi6cio>, false, never>;
        /**
         * A map of the accounts who are authorized to grant usernames.
         */
        AuthorityOf: StorageDescriptor<[Key: Binary], Anonymize<I2506ik7f9ukdl>, true, never>;
        /**
         * Reverse lookup from `username` to the `AccountId` that has registered it and the provider of
         * the username. The `owner` value should be a key in the `UsernameOf` map, but it may not if
         * the user has cleared their username or it has been removed.
         *
         * Multiple usernames may map to the same `AccountId`, but `UsernameOf` will only map to one
         * primary username.
         */
        UsernameInfoOf: StorageDescriptor<[Key: Binary], Anonymize<Idhgvqu0hhernj>, true, never>;
        /**
         * Usernames that an authority has granted, but that the account controller has not confirmed
         * that they want it. Used primarily in cases where the `AccountId` cannot provide a signature
         * because they are a pure proxy, multisig, etc. In order to confirm it, they should call
         * [accept_username](`Call::accept_username`).
         *
         * First tuple item is the account and second is the acceptance deadline.
         */
        PendingUsernames: StorageDescriptor<[Key: Binary], Anonymize<I7sft4mmcq61ka>, true, never>;
        /**
         * Usernames for which the authority that granted them has started the removal process by
         * unbinding them. Each unbinding username maps to its grace period expiry, which is the first
         * block in which the username could be deleted through a
         * [remove_username](`Call::remove_username`) call.
         */
        UnbindingUsernames: StorageDescriptor<[Key: Binary], number, true, never>;
    };
    Migrations: {
        /**
         * True if all required migrations have completed
         */
        FullyUpgraded: StorageDescriptor<[], boolean, false, never>;
        /**
         * MigrationState tracks the progress of a migration.
         * Maps name (Vec<u8>) -> whether or not migration has been completed (bool)
         */
        MigrationState: StorageDescriptor<[Key: Binary], boolean, false, never>;
        /**
         * Temporary value that is set to true at the beginning of the block during which the execution
         * of xcm messages must be paused.
         */
        ShouldPauseXcm: StorageDescriptor<[], boolean, false, never>;
    };
    Multisig: {
        /**
         * The set of open multisig operations.
         */
        Multisigs: StorageDescriptor<Anonymize<I1f5dukd42n5v5>, Anonymize<I3ks2fimshchoe>, true, never>;
    };
    Parameters: {
        /**
         * Stored parameters.
         */
        Parameters: StorageDescriptor<[Key: Anonymize<I7afhi9d8kt8k>], Anonymize<I78cuhvqqvjqpp>, true, never>;
    };
    EthereumChainId: {
        /**
         * The EVM chain ID.
         */
        ChainId: StorageDescriptor<[], bigint, false, never>;
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
    Scheduler: {
        /**
        
         */
        IncompleteSince: StorageDescriptor<[], number, true, never>;
        /**
         * Items to be executed, indexed by the block number that they should be executed on.
         */
        Agenda: StorageDescriptor<[Key: number], Anonymize<I2p91o4c53gcqm>, false, never>;
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
    Preimage: {
        /**
         * The request status of a given hash.
         */
        StatusFor: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Ib2al60cdrpa3j>, true, never>;
        /**
         * The request status of a given hash.
         */
        RequestStatusFor: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<I1o0pm60kdcf2f>, true, never>;
        /**
        
         */
        PreimageFor: StorageDescriptor<[Key: Anonymize<I4pact7n2e9a0i>], Binary, true, never>;
    };
    ConvictionVoting: {
        /**
         * All voting for a particular voter in a particular voting class. We store the balance for the
         * number of votes that we have recorded.
         */
        VotingFor: StorageDescriptor<Anonymize<I5isiedqd5giej>, Anonymize<Iab4eusbjjnf3n>, false, never>;
        /**
         * The voting classes which have a non-zero lock requirement and the lock amounts which they
         * require. The actual amount locked on behalf of this pallet should always be the maximum of
         * this list.
         */
        ClassLocksFor: StorageDescriptor<[Key: HexString], Anonymize<If9jidduiuq7vv>, false, never>;
    };
    Referenda: {
        /**
         * The next free referendum index, aka the number of referenda started so far.
         */
        ReferendumCount: StorageDescriptor<[], number, false, never>;
        /**
         * Information concerning any given referendum.
         */
        ReferendumInfoFor: StorageDescriptor<[Key: number], Anonymize<I6f39mehvlsbu3>, true, never>;
        /**
         * The sorted list of referenda ready to be decided but not yet being decided, ordered by
         * conviction-weighted approvals.
         *
         * This should be empty if `DecidingCount` is less than `TrackInfo::max_deciding`.
         */
        TrackQueue: StorageDescriptor<[Key: number], Anonymize<If9jidduiuq7vv>, false, never>;
        /**
         * The number of referenda being decided currently.
         */
        DecidingCount: StorageDescriptor<[Key: number], number, false, never>;
        /**
         * The metadata is a general information concerning the referendum.
         * The `Hash` refers to the preimage of the `Preimages` provider which can be a JSON
         * dump or IPFS hash of a JSON file.
         *
         * Consider a garbage collection for a metadata of finished referendums to `unrequest` (remove)
         * large preimages.
         */
        MetadataOf: StorageDescriptor<[Key: number], FixedSizeBinary<32>, true, never>;
    };
    Whitelist: {
        /**
        
         */
        WhitelistedCall: StorageDescriptor<[Key: FixedSizeBinary<32>], null, true, never>;
    };
    TreasuryCouncilCollective: {
        /**
         * The hashes of the active proposals.
         */
        Proposals: StorageDescriptor<[], Anonymize<Ic5m5lp1oioo8r>, false, never>;
        /**
         * Actual proposal for a given hash, if it's current.
         */
        ProposalOf: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Iaqmpqm6nl9dad>, true, never>;
        /**
         * Consideration cost created for publishing and storing a proposal.
         *
         * Determined by [Config::Consideration] and may be not present for certain proposals (e.g. if
         * the proposal count at the time of creation was below threshold N).
         */
        CostOf: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Ifd4n2fqmntemu>, true, never>;
        /**
         * Votes on a given proposal, if it is ongoing.
         */
        Voting: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<I7pc2or9t0j7rj>, true, never>;
        /**
         * Proposals so far.
         */
        ProposalCount: StorageDescriptor<[], number, false, never>;
        /**
         * The current members of the collective. This is stored sorted (just by value).
         */
        Members: StorageDescriptor<[], Anonymize<I55luuvb7oq2a3>, false, never>;
        /**
         * The prime member that helps determine the default vote behavior in case of abstentions.
         */
        Prime: StorageDescriptor<[], HexString, true, never>;
    };
    OpenTechCommitteeCollective: {
        /**
         * The hashes of the active proposals.
         */
        Proposals: StorageDescriptor<[], Anonymize<Ic5m5lp1oioo8r>, false, never>;
        /**
         * Actual proposal for a given hash, if it's current.
         */
        ProposalOf: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Iaqmpqm6nl9dad>, true, never>;
        /**
         * Consideration cost created for publishing and storing a proposal.
         *
         * Determined by [Config::Consideration] and may be not present for certain proposals (e.g. if
         * the proposal count at the time of creation was below threshold N).
         */
        CostOf: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Ifd4n2fqmntemu>, true, never>;
        /**
         * Votes on a given proposal, if it is ongoing.
         */
        Voting: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<I7pc2or9t0j7rj>, true, never>;
        /**
         * Proposals so far.
         */
        ProposalCount: StorageDescriptor<[], number, false, never>;
        /**
         * The current members of the collective. This is stored sorted (just by value).
         */
        Members: StorageDescriptor<[], Anonymize<I55luuvb7oq2a3>, false, never>;
        /**
         * The prime member that helps determine the default vote behavior in case of abstentions.
         */
        Prime: StorageDescriptor<[], HexString, true, never>;
    };
    Treasury: {
        /**
         * DEPRECATED: associated with `spend_local` call and will be removed in May 2025.
         * Refer to <https://github.com/paritytech/polkadot-sdk/pull/5961> for migration to `spend`.
         *
         * Number of proposals that have been made.
         */
        ProposalCount: StorageDescriptor<[], number, false, never>;
        /**
         * DEPRECATED: associated with `spend_local` call and will be removed in May 2025.
         * Refer to <https://github.com/paritytech/polkadot-sdk/pull/5961> for migration to `spend`.
         *
         * Proposals that have been made.
         */
        Proposals: StorageDescriptor<[Key: number], Anonymize<I1fhhvus3f3pq9>, true, never>;
        /**
         * The amount which has been reported as inactive to Currency.
         */
        Deactivated: StorageDescriptor<[], bigint, false, never>;
        /**
         * DEPRECATED: associated with `spend_local` call and will be removed in May 2025.
         * Refer to <https://github.com/paritytech/polkadot-sdk/pull/5961> for migration to `spend`.
         *
         * Proposal indices that have been approved but not yet awarded.
         */
        Approvals: StorageDescriptor<[], Anonymize<Icgljjb6j82uhn>, false, never>;
        /**
         * The count of spends that have been made.
         */
        SpendCount: StorageDescriptor<[], number, false, never>;
        /**
         * Spends that have been approved and being processed.
         */
        Spends: StorageDescriptor<[Key: number], Anonymize<I9e1k9mfd924m0>, true, never>;
        /**
         * The blocknumber for the last triggered spend period.
         */
        LastSpendPeriod: StorageDescriptor<[], number, true, never>;
    };
    CrowdloanRewards: {
        /**
        
         */
        AccountsPayable: StorageDescriptor<[Key: HexString], Anonymize<Ibrauvtsisstbp>, true, never>;
        /**
        
         */
        ClaimedRelayChainIds: StorageDescriptor<[Key: FixedSizeBinary<32>], null, true, never>;
        /**
        
         */
        UnassociatedContributions: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Ibrauvtsisstbp>, true, never>;
        /**
        
         */
        Initialized: StorageDescriptor<[], boolean, false, never>;
        /**
         * Vesting block height at the initialization of the pallet
         */
        InitRelayBlock: StorageDescriptor<[], number, false, never>;
        /**
         * Vesting block height at the initialization of the pallet
         */
        EndRelayBlock: StorageDescriptor<[], number, false, never>;
        /**
         * Total initialized amount so far. We store this to make pallet funds == contributors reward
         * check easier and more efficient
         */
        InitializedRewardAmount: StorageDescriptor<[], bigint, false, never>;
        /**
         * Total number of contributors to aid hinting benchmarking
         */
        TotalContributors: StorageDescriptor<[], number, false, never>;
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
        RemoteLockedFungibles: StorageDescriptor<Anonymize<I8e1rrqvum82k2>, Anonymize<I7e5oaj2qi4kl1>, true, never>;
        /**
         * Fungible assets which we know are locked on this chain.
         */
        LockedFungibles: StorageDescriptor<[Key: HexString], Anonymize<Iat62vud7hlod2>, true, never>;
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
    Assets: {
        /**
         * Details of an asset.
         */
        Asset: StorageDescriptor<[Key: bigint], Anonymize<Icksgi86tt9bmn>, true, never>;
        /**
         * The holdings of a specific account for a specific asset.
         */
        Account: StorageDescriptor<Anonymize<Ie7gvtu33pdnbd>, Anonymize<I7pi9qrc9a6rbn>, true, never>;
        /**
         * Approved balance transfers. First balance is the amount approved for transfer. Second
         * is the amount of `T::Currency` reserved for storing this.
         * First key is the asset ID, second key is the owner and third key is the delegate.
         */
        Approvals: StorageDescriptor<Anonymize<Ifjamgt3ponn9a>, Anonymize<I4s6jkha20aoh0>, true, never>;
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
    AssetManager: {
        /**
         * Mapping from an asset id to asset type.
         * This is mostly used when receiving transaction specifying an asset directly,
         * like transferring an asset from this chain to another.
         */
        AssetIdType: StorageDescriptor<[Key: bigint], Anonymize<Ics9mfhmor8iso>, true, never>;
        /**
         * Reverse mapping of AssetIdType. Mapping from an asset type to an asset id.
         * This is mostly used when receiving a multilocation XCM message to retrieve
         * the corresponding asset in which tokens should me minted.
         */
        AssetTypeId: StorageDescriptor<[Key: Anonymize<Ics9mfhmor8iso>], bigint, true, never>;
    };
    XcmTransactor: {
        /**
         * Since we are using pallet-utility for account derivation (through AsDerivative),
         * we need to provide an index for the account derivation. This storage item stores the index
         * assigned for a given local account. These indices are usable as derivative in the relay chain
         */
        IndexToAccount: StorageDescriptor<[Key: number], HexString, true, never>;
        /**
         * Stores the transact info of a Location. This defines how much extra weight we need to
         * add when we want to transact in the destination chain and maximum amount of weight allowed
         * by the destination chain
         */
        TransactInfoWithWeightLimit: StorageDescriptor<[Key: Anonymize<If9iqq7i64mur8>], Anonymize<Icf5eq2v7aoc8g>, true, never>;
        /**
         * Stores the fee per second for an asset in its reserve chain. This allows us to convert
         * from weight to fee
         */
        DestinationAssetFeePerSecond: StorageDescriptor<[Key: Anonymize<If9iqq7i64mur8>], bigint, true, never>;
        /**
         * Stores the indices of relay chain pallets
         */
        RelayIndices: StorageDescriptor<[], Anonymize<I121rub4n25k05>, false, never>;
    };
    EthereumXcm: {
        /**
         * Global nonce used for building Ethereum transaction payload.
         */
        Nonce: StorageDescriptor<[], Anonymize<I4totqt881mlti>, false, never>;
        /**
         * Whether or not Ethereum-XCM is suspended from executing
         */
        EthereumXcmSuspended: StorageDescriptor<[], boolean, false, never>;
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
    EvmForeignAssets: {
        /**
         * Mapping from an asset id to a Foreign asset type.
         * This is mostly used when receiving transaction specifying an asset directly,
         * like transferring an asset from this chain to another.
         */
        AssetsById: StorageDescriptor<[Key: bigint], Anonymize<If9iqq7i64mur8>, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForAssetsById: StorageDescriptor<[], number, false, never>;
        /**
         * Reverse mapping of AssetsById. Mapping from a foreign asset to an asset id.
         * This is mostly used when receiving a multilocation XCM message to retrieve
         * the corresponding asset in which tokens should me minted.
         */
        AssetsByLocation: StorageDescriptor<[Key: Anonymize<If9iqq7i64mur8>], Anonymize<I3nt43q1felhpo>, true, never>;
        /**
         * Mapping from an asset id to its creation details
         */
        AssetsCreationDetails: StorageDescriptor<[Key: bigint], Anonymize<I8k4t3g0d1is9p>, true, never>;
    };
    XcmWeightTrader: {
        /**
         * Stores all supported assets per XCM Location.
         * The u128 is the asset price relative to native asset with 18 decimals
         * The boolean specify if the support for this asset is active
         */
        SupportedAssets: StorageDescriptor<[Key: Anonymize<If9iqq7i64mur8>], Anonymize<I7m9dkorbfsjro>, true, never>;
    };
    EmergencyParaXcm: {
        /**
         * Whether incoming XCM is enabled or paused
         */
        Mode: StorageDescriptor<[], Anonymize<I24au772a01k9n>, false, never>;
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
    RelayStorageRoots: {
        /**
         * Map of relay block number to relay storage root
         */
        RelayStorageRoot: StorageDescriptor<[Key: number], FixedSizeBinary<32>, true, never>;
        /**
         * List of all the keys in `RelayStorageRoot`.
         * Used to remove the oldest key without having to iterate over all of them.
         */
        RelayStorageRootKeys: StorageDescriptor<[], Anonymize<Icgljjb6j82uhn>, false, never>;
    };
    Randomness: {
        /**
         * Randomness requests not yet fulfilled or purged
         */
        Requests: StorageDescriptor<[Key: bigint], Anonymize<Iapo0cnvtli5i0>, true, never>;
        /**
         * Number of randomness requests made so far, used to generate the next request's uid
         */
        RequestCount: StorageDescriptor<[], bigint, false, never>;
        /**
         * Current local per-block VRF randomness
         * Set in `on_initialize`
         */
        LocalVrfOutput: StorageDescriptor<[], Anonymize<I4s6vifaf8k998>, false, never>;
        /**
         * Relay epoch
         */
        RelayEpoch: StorageDescriptor<[], bigint, false, never>;
        /**
         * Ensures the mandatory inherent was included in the block
         */
        InherentIncluded: StorageDescriptor<[], null, true, never>;
        /**
         * Records whether this is the first block (genesis or runtime upgrade)
         */
        NotFirstBlock: StorageDescriptor<[], null, true, never>;
        /**
         * Snapshot of randomness to fulfill all requests that are for the same raw randomness
         * Removed once $value.request_count == 0
         */
        RandomnessResults: StorageDescriptor<[Key: Anonymize<I316f7rqm1ifg1>], Anonymize<Iu5urbma3d3as>, true, never>;
        /**
         * Previous local per-block VRF randomness
         * Set in `on_finalize` of last block
         */
        PreviousLocalVrfOutput: StorageDescriptor<[], FixedSizeBinary<32>, false, never>;
    };
    BridgeKusamaGrandpa: {
        /**
         * Number of free header submissions that we may yet accept in the current block.
         *
         * If the `FreeHeadersRemaining` hits zero, all following mandatory headers in the
         * current block are accepted with fee (`Pays::Yes` is returned).
         *
         * The `FreeHeadersRemaining` is an ephemeral value that is set to
         * `MaxFreeHeadersPerBlock` at each block initialization and is killed on block
         * finalization. So it never ends up in the storage trie.
         */
        FreeHeadersRemaining: StorageDescriptor<[], number, true, never>;
        /**
         * Hash of the header used to bootstrap the pallet.
         */
        InitialHash: StorageDescriptor<[], FixedSizeBinary<32>, false, never>;
        /**
         * Hash of the best finalized header.
         */
        BestFinalized: StorageDescriptor<[], Anonymize<I4p5t2krb1gmvp>, true, never>;
        /**
         * A ring buffer of imported hashes. Ordered by the insertion time.
         */
        ImportedHashes: StorageDescriptor<[Key: number], FixedSizeBinary<32>, true, never>;
        /**
         * Current ring buffer position.
         */
        ImportedHashesPointer: StorageDescriptor<[], number, false, never>;
        /**
         * Relevant fields of imported headers.
         */
        ImportedHeaders: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<I67smi4kj2jg4u>, true, never>;
        /**
         * The current GRANDPA Authority set.
         */
        CurrentAuthoritySet: StorageDescriptor<[], Anonymize<I74nture9pgqeq>, false, never>;
        /**
         * Optional pallet owner.
         *
         * Pallet owner has a right to halt all pallet operations and then resume it. If it is
         * `None`, then there are no direct ways to halt/resume pallet operations, but other
         * runtime methods may still be used to do that (i.e. democracy::referendum to update halt
         * flag directly or call the `set_operating_mode`).
         */
        PalletOwner: StorageDescriptor<[], HexString, true, never>;
        /**
         * The current operating mode of the pallet.
         *
         * Depending on the mode either all, or no transactions will be allowed.
         */
        PalletOperatingMode: StorageDescriptor<[], Anonymize<Ibqjcgmcid3dll>, false, never>;
    };
    BridgeKusamaParachains: {
        /**
         * Optional pallet owner.
         *
         * Pallet owner has a right to halt all pallet operations and then resume them. If it is
         * `None`, then there are no direct ways to halt/resume pallet operations, but other
         * runtime methods may still be used to do that (i.e. democracy::referendum to update halt
         * flag directly or call the `set_operating_mode`).
         */
        PalletOwner: StorageDescriptor<[], HexString, true, never>;
        /**
         * The current operating mode of the pallet.
         *
         * Depending on the mode either all, or no transactions will be allowed.
         */
        PalletOperatingMode: StorageDescriptor<[], Anonymize<Ibqjcgmcid3dll>, false, never>;
        /**
         * Parachains info.
         *
         * Contains the following info:
         * - best parachain head hash
         * - the head of the `ImportedParaHashes` ring buffer
         */
        ParasInfo: StorageDescriptor<[Key: number], Anonymize<Id15d558jgoqcl>, true, never>;
        /**
         * State roots of parachain heads which have been imported into the pallet.
         */
        ImportedParaHeads: StorageDescriptor<Anonymize<I4p5t2krb1gmvp>, Binary, true, never>;
        /**
         * A ring buffer of imported parachain head hashes. Ordered by the insertion time.
         */
        ImportedParaHashes: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, FixedSizeBinary<32>, true, never>;
    };
    BridgeKusamaMessages: {
        /**
         * Optional pallet owner.
         *
         * Pallet owner has a right to halt all pallet operations and then resume it. If it is
         * `None`, then there are no direct ways to halt/resume pallet operations, but other
         * runtime methods may still be used to do that (i.e. democracy::referendum to update halt
         * flag directly or call the `set_operating_mode`).
         */
        PalletOwner: StorageDescriptor<[], HexString, true, never>;
        /**
         * The current operating mode of the pallet.
         *
         * Depending on the mode either all, some, or no transactions will be allowed.
         */
        PalletOperatingMode: StorageDescriptor<[], Anonymize<Icdpdqb1rbmstf>, false, never>;
        /**
         * Map of lane id => inbound lane data.
         */
        InboundLanes: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Idb24blqv4khu3>, true, never>;
        /**
         * Map of lane id => outbound lane data.
         */
        OutboundLanes: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<I84l6vdi7riqfe>, true, never>;
        /**
         * All queued outbound messages.
         */
        OutboundMessages: StorageDescriptor<[Key: Anonymize<I1udtl7slp3rsi>], Binary, true, never>;
    };
    BridgeXcmOverMoonriver: {
        /**
         * All registered bridges.
         */
        Bridges: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<I3bv0ejtjh5f9r>, true, never>;
        /**
         * All registered `lane_id` and `bridge_id` mappings.
         */
        LaneToBridge: StorageDescriptor<[Key: FixedSizeBinary<32>], FixedSizeBinary<32>, true, never>;
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
    RootTesting: {
        /**
         * A dispatch that will fill the block weight up to the given ratio.
         */
        fill_block: TxDescriptor<Anonymize<Ienjibnb78vnl0>>;
        /**
        
         */
        trigger_defensive: TxDescriptor<undefined>;
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
        transfer_allow_death: TxDescriptor<Anonymize<Ibt8o5hb5hjbe0>>;
        /**
         * Exactly as `transfer_allow_death`, except the origin must be root and the source account
         * may be specified.
         */
        force_transfer: TxDescriptor<Anonymize<I6emd42ofsah91>>;
        /**
         * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
         * kill the origin account.
         *
         * 99% of the time you want [`transfer_allow_death`] instead.
         *
         * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
         */
        transfer_keep_alive: TxDescriptor<Anonymize<Ibt8o5hb5hjbe0>>;
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
        transfer_all: TxDescriptor<Anonymize<I69gs3ob8t125g>>;
        /**
         * Unreserve some balance from a user by force.
         *
         * Can only be called by ROOT.
         */
        force_unreserve: TxDescriptor<Anonymize<Ibnba9cres7tu>>;
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
        upgrade_accounts: TxDescriptor<Anonymize<If07oirptjds1e>>;
        /**
         * Set the regular balance of a given account.
         *
         * The dispatch origin for this call is `root`.
         */
        force_set_balance: TxDescriptor<Anonymize<I86uimfcgksrk4>>;
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
    ParachainStaking: {
        /**
         * Set the expectations for total staked. These expectations determine the issuance for
         * the round according to logic in `fn compute_issuance`
         */
        set_staking_expectations: TxDescriptor<Anonymize<I6m4od67mjs4l8>>;
        /**
         * Set the annual inflation rate to derive per-round inflation
         */
        set_inflation: TxDescriptor<Anonymize<I19e29tp35ff1j>>;
        /**
         * Deprecated: please use `set_inflation_distribution_config` instead.
         *
         * Set the account that will hold funds set aside for parachain bond
         */
        set_parachain_bond_account: TxDescriptor<Anonymize<I1h1ih5obm3cs>>;
        /**
         * Deprecated: please use `set_inflation_distribution_config` instead.
         *
         * Set the percent of inflation set aside for parachain bond
         */
        set_parachain_bond_reserve_percent: TxDescriptor<Anonymize<I3vh014cqgmrfd>>;
        /**
         * Set the total number of collator candidates selected per round
         * - changes are not applied until the start of the next round
         */
        set_total_selected: TxDescriptor<Anonymize<I3vh014cqgmrfd>>;
        /**
         * Set the commission for all collators
         */
        set_collator_commission: TxDescriptor<Anonymize<I3vh014cqgmrfd>>;
        /**
         * Set blocks per round
         * - if called with `new` less than length of current round, will transition immediately
         * in the next block
         * - also updates per-round inflation config
         */
        set_blocks_per_round: TxDescriptor<Anonymize<I3vh014cqgmrfd>>;
        /**
         * Join the set of collator candidates
         */
        join_candidates: TxDescriptor<Anonymize<I4vasl07tasls>>;
        /**
         * Request to leave the set of candidates. If successful, the account is immediately
         * removed from the candidate pool to prevent selection as a collator.
         */
        schedule_leave_candidates: TxDescriptor<Anonymize<I98vh5ccjtf1ev>>;
        /**
         * Execute leave candidates request
         */
        execute_leave_candidates: TxDescriptor<Anonymize<I5ulcu9n58tsgp>>;
        /**
         * Cancel open request to leave candidates
         * - only callable by collator account
         * - result upon successful call is the candidate is active in the candidate pool
         */
        cancel_leave_candidates: TxDescriptor<Anonymize<I98vh5ccjtf1ev>>;
        /**
         * Temporarily leave the set of collator candidates without unbonding
         */
        go_offline: TxDescriptor<undefined>;
        /**
         * Rejoin the set of collator candidates if previously had called `go_offline`
         */
        go_online: TxDescriptor<undefined>;
        /**
         * Increase collator candidate self bond by `more`
         */
        candidate_bond_more: TxDescriptor<Anonymize<Ievnk06j48hi6e>>;
        /**
         * Request by collator candidate to decrease self bond by `less`
         */
        schedule_candidate_bond_less: TxDescriptor<Anonymize<Ibrbas2gu3j75d>>;
        /**
         * Execute pending request to adjust the collator candidate self bond
         */
        execute_candidate_bond_less: TxDescriptor<Anonymize<Ifcg60143soedq>>;
        /**
         * Cancel pending request to adjust the collator candidate self bond
         */
        cancel_candidate_bond_less: TxDescriptor<undefined>;
        /**
         * If caller is not a delegator and not a collator, then join the set of delegators
         * If caller is a delegator, then makes delegation to change their delegation state
         * Sets the auto-compound config for the delegation
         */
        delegate_with_auto_compound: TxDescriptor<Anonymize<I1jkfh0p9s7jk5>>;
        /**
         * Request to revoke an existing delegation. If successful, the delegation is scheduled
         * to be allowed to be revoked via the `execute_delegation_request` extrinsic.
         * The delegation receives no rewards for the rounds while a revoke is pending.
         * A revoke may not be performed if any other scheduled request is pending.
         */
        schedule_revoke_delegation: TxDescriptor<Anonymize<I5ib1pr87frhq4>>;
        /**
         * Bond more for delegators wrt a specific collator candidate.
         */
        delegator_bond_more: TxDescriptor<Anonymize<I5in2p1j2slcin>>;
        /**
         * Request bond less for delegators wrt a specific collator candidate. The delegation's
         * rewards for rounds while the request is pending use the reduced bonded amount.
         * A bond less may not be performed if any other scheduled request is pending.
         */
        schedule_delegator_bond_less: TxDescriptor<Anonymize<I80codtbn0f4cb>>;
        /**
         * Execute pending request to change an existing delegation
         */
        execute_delegation_request: TxDescriptor<Anonymize<Icelrbjjshs48m>>;
        /**
         * Cancel request to change an existing delegation.
         */
        cancel_delegation_request: TxDescriptor<Anonymize<Ifcg60143soedq>>;
        /**
         * Sets the auto-compounding reward percentage for a delegation.
         */
        set_auto_compound: TxDescriptor<Anonymize<I8af27or8sm75g>>;
        /**
         * Hotfix to remove existing empty entries for candidates that have left.
         */
        hotfix_remove_delegation_requests_exited_candidates: TxDescriptor<Anonymize<I6k6pg4oqio6oi>>;
        /**
         * Notify a collator is inactive during MaxOfflineRounds
         */
        notify_inactive_collator: TxDescriptor<Anonymize<I5ib1pr87frhq4>>;
        /**
         * Enable/Disable marking offline feature
         */
        enable_marking_offline: TxDescriptor<Anonymize<I9g0k5dg67b5dd>>;
        /**
         * Force join the set of collator candidates.
         * It will skip the minimum required bond check.
         */
        force_join_candidates: TxDescriptor<Anonymize<Iejqbff9jjd9h3>>;
        /**
         * Set the inflation distribution configuration.
         */
        set_inflation_distribution_config: TxDescriptor<Anonymize<Id6m22i33hbgnr>>;
    };
    AuthorInherent: {
        /**
         * This inherent is a workaround to run code after the "real" inherents have executed,
         * but before transactions are executed.
         */
        kick_off_authorship_validation: TxDescriptor<undefined>;
    };
    AuthorFilter: {
        /**
         * Update the eligible count. Intended to be called by governance.
         */
        set_eligible: TxDescriptor<Anonymize<I3vh014cqgmrfd>>;
    };
    AuthorMapping: {
        /**
         * Register your NimbusId onchain so blocks you author are associated with your account.
         *
         * Users who have been (or will soon be) elected active collators in staking,
         * should submit this extrinsic to have their blocks accepted and earn rewards.
         */
        add_association: TxDescriptor<Anonymize<I6gquroigvp00t>>;
        /**
         * Change your Mapping.
         *
         * This is useful for normal key rotation or for when switching from one physical collator
         * machine to another. No new security deposit is required.
         * This sets keys to new_nimbus_id.into() by default.
         */
        update_association: TxDescriptor<Anonymize<Iarl2feri6t3b9>>;
        /**
         * Clear your Mapping.
         *
         * This is useful when you are no longer an author and would like to re-claim your security
         * deposit.
         */
        clear_association: TxDescriptor<Anonymize<I6gquroigvp00t>>;
        /**
         * Remove your Mapping.
         *
         * This is useful when you are no longer an author and would like to re-claim your security
         * deposit.
         */
        remove_keys: TxDescriptor<undefined>;
        /**
         * Set association and session keys at once.
         *
         * This is useful for key rotation to update Nimbus and VRF keys in one call.
         * No new security deposit is required. Will replace `update_association` which is kept
         * now for backwards compatibility reasons.
         */
        set_keys: TxDescriptor<Anonymize<I70etqpqbirlcf>>;
    };
    MoonbeamOrbiters: {
        /**
         * Add an orbiter in a collator pool
         */
        collator_add_orbiter: TxDescriptor<Anonymize<Ic2l2vequpbumk>>;
        /**
         * Remove an orbiter from the caller collator pool
         */
        collator_remove_orbiter: TxDescriptor<Anonymize<Ic2l2vequpbumk>>;
        /**
         * Remove the caller from the specified collator pool
         */
        orbiter_leave_collator_pool: TxDescriptor<Anonymize<I5ib1pr87frhq4>>;
        /**
         * Registering as an orbiter
         */
        orbiter_register: TxDescriptor<undefined>;
        /**
         * Deregistering from orbiters
         */
        orbiter_unregister: TxDescriptor<Anonymize<If4amksile11f8>>;
        /**
         * Add a collator to orbiters program.
         */
        add_collator: TxDescriptor<Anonymize<I5ib1pr87frhq4>>;
        /**
         * Remove a collator from orbiters program.
         */
        remove_collator: TxDescriptor<Anonymize<I5ib1pr87frhq4>>;
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
        batch: TxDescriptor<Anonymize<Ib8en2d082q0uj>>;
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
        as_derivative: TxDescriptor<Anonymize<I3h01on2mas005>>;
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
        batch_all: TxDescriptor<Anonymize<Ib8en2d082q0uj>>;
        /**
         * Dispatches a function call with a provided origin.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * ## Complexity
         * - O(1).
         */
        dispatch_as: TxDescriptor<Anonymize<Ib9331h90g5b7e>>;
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
        force_batch: TxDescriptor<Anonymize<Ib8en2d082q0uj>>;
        /**
         * Dispatch a function call with a specified weight.
         *
         * This function does not check the weight of the call, and instead allows the
         * Root origin to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        with_weight: TxDescriptor<Anonymize<I70t72khole5qd>>;
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
        proxy: TxDescriptor<Anonymize<Ibup5hc9m4kv4l>>;
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
        add_proxy: TxDescriptor<Anonymize<Io22o6h1g8ak4>>;
        /**
         * Unregister a proxy account for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to remove as a proxy.
         * - `proxy_type`: The permissions currently enabled for the removed proxy account.
         */
        remove_proxy: TxDescriptor<Anonymize<Io22o6h1g8ak4>>;
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
        create_pure: TxDescriptor<Anonymize<Iavauuvpf6t3di>>;
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
        kill_pure: TxDescriptor<Anonymize<Idffocn2l23ful>>;
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
        announce: TxDescriptor<Anonymize<I87r60dm6orh5i>>;
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
        remove_announcement: TxDescriptor<Anonymize<I87r60dm6orh5i>>;
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
        reject_announcement: TxDescriptor<Anonymize<Iehj01u80rci5u>>;
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
        proxy_announced: TxDescriptor<Anonymize<I13jnl8irgeqkf>>;
    };
    MaintenanceMode: {
        /**
         * Place the chain in maintenance mode
         *
         * Weight cost is:
         * * One DB read to ensure we're not already in maintenance mode
         * * Three DB writes - 1 for the mode, 1 for suspending xcm execution, 1 for the event
         */
        enter_maintenance_mode: TxDescriptor<undefined>;
        /**
         * Return the chain to normal operating mode
         *
         * Weight cost is:
         * * One DB read to ensure we're in maintenance mode
         * * Three DB writes - 1 for the mode, 1 for resuming xcm execution, 1 for the event
         */
        resume_normal_operation: TxDescriptor<undefined>;
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
        add_registrar: TxDescriptor<Anonymize<I64i34r0tn439a>>;
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
        set_subs: TxDescriptor<Anonymize<I53ptv16c5mql7>>;
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
        set_account_id: TxDescriptor<Anonymize<If885dhtb970mp>>;
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
        provide_judgement: TxDescriptor<Anonymize<Iess0pqcp8gkv8>>;
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
        kill_identity: TxDescriptor<Anonymize<Ibfkgq22t8bv8o>>;
        /**
         * Add the given account to the sender's subs.
         *
         * Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
         * to the sender.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * sub identity of `sub`.
         */
        add_sub: TxDescriptor<Anonymize<I22bk115c518rb>>;
        /**
         * Alter the associated name of the given sub-account.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * sub identity of `sub`.
         */
        rename_sub: TxDescriptor<Anonymize<I22bk115c518rb>>;
        /**
         * Remove the given account from the sender's subs.
         *
         * Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
         * to the sender.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * sub identity of `sub`.
         */
        remove_sub: TxDescriptor<Anonymize<I25koabvo0egr8>>;
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
        add_username_authority: TxDescriptor<Anonymize<Icq68a2na3ck8n>>;
        /**
         * Remove `authority` from the username authorities.
         */
        remove_username_authority: TxDescriptor<Anonymize<I540aqt3mhve7m>>;
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
        set_username_for: TxDescriptor<Anonymize<I1psn9kso0ag4m>>;
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
        as_multi_threshold_1: TxDescriptor<Anonymize<I5i8muthp7fh92>>;
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
        as_multi: TxDescriptor<Anonymize<Ibdpqtl9rd54ba>>;
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
        approve_as_multi: TxDescriptor<Anonymize<I7brssfgjtq1ru>>;
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
        cancel_as_multi: TxDescriptor<Anonymize<Icg7jk7nhmoong>>;
    };
    MoonbeamLazyMigrations: {
        /**
        
         */
        create_contract_metadata: TxDescriptor<Anonymize<Itmchvgqfl28g>>;
    };
    Parameters: {
        /**
         * Set the value of a parameter.
         *
         * The dispatch origin of this call must be `AdminOrigin` for the given `key`. Values be
         * deleted by setting them to `None`.
         */
        set_parameter: TxDescriptor<Anonymize<Ic6v0pfadj60db>>;
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
    Scheduler: {
        /**
         * Anonymously schedule a task.
         */
        schedule: TxDescriptor<Anonymize<I3rugmro417cu2>>;
        /**
         * Cancel an anonymously scheduled task.
         */
        cancel: TxDescriptor<Anonymize<I5n4sebgkfr760>>;
        /**
         * Schedule a named task.
         */
        schedule_named: TxDescriptor<Anonymize<I3uta02p49metg>>;
        /**
         * Cancel a named scheduled task.
         */
        cancel_named: TxDescriptor<Anonymize<Ifs1i5fk9cqvr6>>;
        /**
         * Anonymously schedule a task after a delay.
         */
        schedule_after: TxDescriptor<Anonymize<I40fcd8ps9ksvh>>;
        /**
         * Schedule a named task after a delay.
         */
        schedule_named_after: TxDescriptor<Anonymize<Ie5p66h8puh1a7>>;
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
    ConvictionVoting: {
        /**
         * Vote in a poll. If `vote.is_aye()`, the vote is to enact the proposal;
         * otherwise it is a vote to keep the status quo.
         *
         * The dispatch origin of this call must be _Signed_.
         *
         * - `poll_index`: The index of the poll to vote for.
         * - `vote`: The vote configuration.
         *
         * Weight: `O(R)` where R is the number of polls the voter has voted on.
         */
        vote: TxDescriptor<Anonymize<Idnsr2pndm36h0>>;
        /**
         * Delegate the voting power (with some given conviction) of the sending account for a
         * particular class of polls.
         *
         * The balance delegated is locked for as long as it's delegated, and thereafter for the
         * time appropriate for the conviction's lock period.
         *
         * The dispatch origin of this call must be _Signed_, and the signing account must either:
         * - be delegating already; or
         * - have no voting activity (if there is, then it will need to be removed through
         * `remove_vote`).
         *
         * - `to`: The account whose voting the `target` account's voting power will follow.
         * - `class`: The class of polls to delegate. To delegate multiple classes, multiple calls
         * to this function are required.
         * - `conviction`: The conviction that will be attached to the delegated votes. When the
         * account is undelegated, the funds will be locked for the corresponding period.
         * - `balance`: The amount of the account's balance to be used in delegating. This must not
         * be more than the account's current balance.
         *
         * Emits `Delegated`.
         *
         * Weight: `O(R)` where R is the number of polls the voter delegating to has
         * voted on. Weight is initially charged as if maximum votes, but is refunded later.
         */
        delegate: TxDescriptor<Anonymize<I355vkhso2qs3n>>;
        /**
         * Undelegate the voting power of the sending account for a particular class of polls.
         *
         * Tokens may be unlocked following once an amount of time consistent with the lock period
         * of the conviction with which the delegation was issued has passed.
         *
         * The dispatch origin of this call must be _Signed_ and the signing account must be
         * currently delegating.
         *
         * - `class`: The class of polls to remove the delegation from.
         *
         * Emits `Undelegated`.
         *
         * Weight: `O(R)` where R is the number of polls the voter delegating to has
         * voted on. Weight is initially charged as if maximum votes, but is refunded later.
         */
        undelegate: TxDescriptor<Anonymize<I8steo882k7qns>>;
        /**
         * Remove the lock caused by prior voting/delegating which has expired within a particular
         * class.
         *
         * The dispatch origin of this call must be _Signed_.
         *
         * - `class`: The class of polls to unlock.
         * - `target`: The account to remove the lock on.
         *
         * Weight: `O(R)` with R number of vote of target.
         */
        unlock: TxDescriptor<Anonymize<I3ncitsp8frod4>>;
        /**
         * Remove a vote for a poll.
         *
         * If:
         * - the poll was cancelled, or
         * - the poll is ongoing, or
         * - the poll has ended such that
         * - the vote of the account was in opposition to the result; or
         * - there was no conviction to the account's vote; or
         * - the account made a split vote
         * ...then the vote is removed cleanly and a following call to `unlock` may result in more
         * funds being available.
         *
         * If, however, the poll has ended and:
         * - it finished corresponding to the vote of the account, and
         * - the account made a standard vote with conviction, and
         * - the lock period of the conviction is not over
         * ...then the lock will be aggregated into the overall account's lock, which may involve
         * *overlocking* (where the two locks are combined into a single lock that is the maximum
         * of both the amount locked and the time is it locked for).
         *
         * The dispatch origin of this call must be _Signed_, and the signer must have a vote
         * registered for poll `index`.
         *
         * - `index`: The index of poll of the vote to be removed.
         * - `class`: Optional parameter, if given it indicates the class of the poll. For polls
         * which have finished or are cancelled, this must be `Some`.
         *
         * Weight: `O(R + log R)` where R is the number of polls that `target` has voted on.
         * Weight is calculated for the maximum number of vote.
         */
        remove_vote: TxDescriptor<Anonymize<I5f178ab6b89t3>>;
        /**
         * Remove a vote for a poll.
         *
         * If the `target` is equal to the signer, then this function is exactly equivalent to
         * `remove_vote`. If not equal to the signer, then the vote must have expired,
         * either because the poll was cancelled, because the voter lost the poll or
         * because the conviction period is over.
         *
         * The dispatch origin of this call must be _Signed_.
         *
         * - `target`: The account of the vote to be removed; this account must have voted for poll
         * `index`.
         * - `index`: The index of poll of the vote to be removed.
         * - `class`: The class of the poll.
         *
         * Weight: `O(R + log R)` where R is the number of polls that `target` has voted on.
         * Weight is calculated for the maximum number of vote.
         */
        remove_other_vote: TxDescriptor<Anonymize<I7qq8pedqs675e>>;
    };
    Referenda: {
        /**
         * Propose a referendum on a privileged action.
         *
         * - `origin`: must be `SubmitOrigin` and the account must have `SubmissionDeposit` funds
         * available.
         * - `proposal_origin`: The origin from which the proposal should be executed.
         * - `proposal`: The proposal.
         * - `enactment_moment`: The moment that the proposal should be enacted.
         *
         * Emits `Submitted`.
         */
        submit: TxDescriptor<Anonymize<I6qgv3p5m0m38b>>;
        /**
         * Post the Decision Deposit for a referendum.
         *
         * - `origin`: must be `Signed` and the account must have funds available for the
         * referendum's track's Decision Deposit.
         * - `index`: The index of the submitted referendum whose Decision Deposit is yet to be
         * posted.
         *
         * Emits `DecisionDepositPlaced`.
         */
        place_decision_deposit: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Refund the Decision Deposit for a closed referendum back to the depositor.
         *
         * - `origin`: must be `Signed` or `Root`.
         * - `index`: The index of a closed referendum whose Decision Deposit has not yet been
         * refunded.
         *
         * Emits `DecisionDepositRefunded`.
         */
        refund_decision_deposit: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Cancel an ongoing referendum.
         *
         * - `origin`: must be the `CancelOrigin`.
         * - `index`: The index of the referendum to be cancelled.
         *
         * Emits `Cancelled`.
         */
        cancel: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Cancel an ongoing referendum and slash the deposits.
         *
         * - `origin`: must be the `KillOrigin`.
         * - `index`: The index of the referendum to be cancelled.
         *
         * Emits `Killed` and `DepositSlashed`.
         */
        kill: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Advance a referendum onto its next logical state. Only used internally.
         *
         * - `origin`: must be `Root`.
         * - `index`: the referendum to be advanced.
         */
        nudge_referendum: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Advance a track onto its next logical state. Only used internally.
         *
         * - `origin`: must be `Root`.
         * - `track`: the track to be advanced.
         *
         * Action item for when there is now one fewer referendum in the deciding phase and the
         * `DecidingCount` is not yet updated. This means that we should either:
         * - begin deciding another referendum (and leave `DecidingCount` alone); or
         * - decrement `DecidingCount`.
         */
        one_fewer_deciding: TxDescriptor<Anonymize<Icbio0e1f0034b>>;
        /**
         * Refund the Submission Deposit for a closed referendum back to the depositor.
         *
         * - `origin`: must be `Signed` or `Root`.
         * - `index`: The index of a closed referendum whose Submission Deposit has not yet been
         * refunded.
         *
         * Emits `SubmissionDepositRefunded`.
         */
        refund_submission_deposit: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Set or clear metadata of a referendum.
         *
         * Parameters:
         * - `origin`: Must be `Signed` by a creator of a referendum or by anyone to clear a
         * metadata of a finished referendum.
         * - `index`:  The index of a referendum to set or clear metadata for.
         * - `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
         */
        set_metadata: TxDescriptor<Anonymize<I8c0vkqjjipnuj>>;
    };
    Whitelist: {
        /**
        
         */
        whitelist_call: TxDescriptor<Anonymize<I1adbcfi5uc62r>>;
        /**
        
         */
        remove_whitelisted_call: TxDescriptor<Anonymize<I1adbcfi5uc62r>>;
        /**
        
         */
        dispatch_whitelisted_call: TxDescriptor<Anonymize<Ibf6ucefn8fh49>>;
        /**
        
         */
        dispatch_whitelisted_call_with_preimage: TxDescriptor<Anonymize<I7f7jli6vo6drv>>;
    };
    TreasuryCouncilCollective: {
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
        set_members: TxDescriptor<Anonymize<I76b4rvmflooij>>;
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
        execute: TxDescriptor<Anonymize<Idjsbeet1fe39m>>;
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
        propose: TxDescriptor<Anonymize<Iflbk67akqs4pf>>;
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
    OpenTechCommitteeCollective: {
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
        set_members: TxDescriptor<Anonymize<I76b4rvmflooij>>;
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
        execute: TxDescriptor<Anonymize<Idjsbeet1fe39m>>;
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
        propose: TxDescriptor<Anonymize<Iflbk67akqs4pf>>;
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
    Treasury: {
        /**
         * Propose and approve a spend of treasury funds.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::SpendOrigin`] with the `Success` value being at least `amount`.
         *
         * ### Details
         * NOTE: For record-keeping purposes, the proposer is deemed to be equivalent to the
         * beneficiary.
         *
         * ### Parameters
         * - `amount`: The amount to be transferred from the treasury to the `beneficiary`.
         * - `beneficiary`: The destination account for the transfer.
         *
         * ## Events
         *
         * Emits [`Event::SpendApproved`] if successful.
         */
        spend_local: TxDescriptor<Anonymize<I6nsmehln1kagc>>;
        /**
         * Force a previously approved proposal to be removed from the approval queue.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::RejectOrigin`].
         *
         * ## Details
         *
         * The original deposit will no longer be returned.
         *
         * ### Parameters
         * - `proposal_id`: The index of a proposal
         *
         * ### Complexity
         * - O(A) where `A` is the number of approvals
         *
         * ### Errors
         * - [`Error::ProposalNotApproved`]: The `proposal_id` supplied was not found in the
         * approval queue, i.e., the proposal has not been approved. This could also mean the
         * proposal does not exist altogether, thus there is no way it would have been approved
         * in the first place.
         */
        remove_approval: TxDescriptor<Anonymize<Icm9m0qeemu66d>>;
        /**
         * Propose and approve a spend of treasury funds.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::SpendOrigin`] with the `Success` value being at least
         * `amount` of `asset_kind` in the native asset. The amount of `asset_kind` is converted
         * for assertion using the [`Config::BalanceConverter`].
         *
         * ## Details
         *
         * Create an approved spend for transferring a specific `amount` of `asset_kind` to a
         * designated beneficiary. The spend must be claimed using the `payout` dispatchable within
         * the [`Config::PayoutPeriod`].
         *
         * ### Parameters
         * - `asset_kind`: An indicator of the specific asset class to be spent.
         * - `amount`: The amount to be transferred from the treasury to the `beneficiary`.
         * - `beneficiary`: The beneficiary of the spend.
         * - `valid_from`: The block number from which the spend can be claimed. It can refer to
         * the past if the resulting spend has not yet expired according to the
         * [`Config::PayoutPeriod`]. If `None`, the spend can be claimed immediately after
         * approval.
         *
         * ## Events
         *
         * Emits [`Event::AssetSpendApproved`] if successful.
         */
        spend: TxDescriptor<Anonymize<I9tebiigv8mfq3>>;
        /**
         * Claim a spend.
         *
         * ## Dispatch Origin
         *
         * Must be signed
         *
         * ## Details
         *
         * Spends must be claimed within some temporal bounds. A spend may be claimed within one
         * [`Config::PayoutPeriod`] from the `valid_from` block.
         * In case of a payout failure, the spend status must be updated with the `check_status`
         * dispatchable before retrying with the current function.
         *
         * ### Parameters
         * - `index`: The spend index.
         *
         * ## Events
         *
         * Emits [`Event::Paid`] if successful.
         */
        payout: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Check the status of the spend and remove it from the storage if processed.
         *
         * ## Dispatch Origin
         *
         * Must be signed.
         *
         * ## Details
         *
         * The status check is a prerequisite for retrying a failed payout.
         * If a spend has either succeeded or expired, it is removed from the storage by this
         * function. In such instances, transaction fees are refunded.
         *
         * ### Parameters
         * - `index`: The spend index.
         *
         * ## Events
         *
         * Emits [`Event::PaymentFailed`] if the spend payout has failed.
         * Emits [`Event::SpendProcessed`] if the spend payout has succeed.
         */
        check_status: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Void previously approved spend.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::RejectOrigin`].
         *
         * ## Details
         *
         * A spend void is only possible if the payout has not been attempted yet.
         *
         * ### Parameters
         * - `index`: The spend index.
         *
         * ## Events
         *
         * Emits [`Event::AssetSpendVoided`] if successful.
         */
        void_spend: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
    };
    CrowdloanRewards: {
        /**
         * Associate a native rewards_destination identity with a crowdloan contribution.
         *
         * The caller needs to provide the unassociated relay account and a proof to succeed
         * with the association
         * The proof is nothing but a signature over the reward_address using the relay keys
         */
        associate_native_identity: TxDescriptor<Anonymize<Idnuqgq0sjkv0o>>;
        /**
         * Change reward account by submitting proofs from relay accounts
         *
         * The number of valid proofs needs to be bigger than 'RewardAddressRelayVoteThreshold'
         * The account to be changed needs to be submitted as 'previous_account'
         * Origin must be RewardAddressChangeOrigin
         */
        change_association_with_relay_keys: TxDescriptor<Anonymize<I1nl40o8rqtu3p>>;
        /**
         * Collect whatever portion of your reward are currently vested.
         */
        claim: TxDescriptor<undefined>;
        /**
         * Update reward address, proving that the caller owns the current native key
         */
        update_reward_address: TxDescriptor<Anonymize<I63sne46ecs10u>>;
        /**
         * This extrinsic completes the initialization if some checks are fullfiled. These checks are:
         * -The reward contribution money matches the crowdloan pot
         * -The end vesting block is higher than the init vesting block
         * -The initialization has not complete yet
         */
        complete_initialization: TxDescriptor<Anonymize<I90duks9ein583>>;
        /**
         * Initialize the reward distribution storage. It shortcuts whenever an error is found
         * This does not enforce any checks other than making sure we dont go over funds
         * complete_initialization should perform any additional
         */
        initialize_reward_vec: TxDescriptor<Anonymize<Ifs0pcpedmadns>>;
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
        create: TxDescriptor<Anonymize<I6j6svr1mcma8b>>;
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
        force_create: TxDescriptor<Anonymize<I4e3fcbllc550c>>;
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
        mint: TxDescriptor<Anonymize<I91ebagm7eg2of>>;
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
        burn: TxDescriptor<Anonymize<Idktplkgk9qubb>>;
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
        transfer: TxDescriptor<Anonymize<I46clc78rtmjag>>;
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
        transfer_keep_alive: TxDescriptor<Anonymize<I46clc78rtmjag>>;
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
        force_transfer: TxDescriptor<Anonymize<Ifhl8qqlpgmrgk>>;
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
        freeze: TxDescriptor<Anonymize<Ie4fskhkb19lqm>>;
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
        thaw: TxDescriptor<Anonymize<Ie4fskhkb19lqm>>;
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
        transfer_ownership: TxDescriptor<Anonymize<Ifv4apklf5icev>>;
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
        set_team: TxDescriptor<Anonymize<I55kkfv5j6l61n>>;
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
        force_asset_status: TxDescriptor<Anonymize<I6olidsoliung0>>;
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
        approve_transfer: TxDescriptor<Anonymize<I32vkhn5265cl8>>;
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
        cancel_approval: TxDescriptor<Anonymize<I13irkvjha30nl>>;
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
        force_cancel_approval: TxDescriptor<Anonymize<I4dko4hu09aovh>>;
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
        transfer_approved: TxDescriptor<Anonymize<I1he1llr4em5k8>>;
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
        touch_other: TxDescriptor<Anonymize<Ie4fskhkb19lqm>>;
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
        refund_other: TxDescriptor<Anonymize<Ie4fskhkb19lqm>>;
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
        block: TxDescriptor<Anonymize<Ie4fskhkb19lqm>>;
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
        transfer_all: TxDescriptor<Anonymize<I9nrp6rbq1k4eb>>;
    };
    AssetManager: {
        /**
         * Register new asset with the asset manager
         */
        register_foreign_asset: TxDescriptor<Anonymize<I6sa7pko9va4d9>>;
        /**
         * Change the xcm type mapping for a given assetId
         * We also change this if the previous units per second where pointing at the old
         * assetType
         */
        change_existing_asset_type: TxDescriptor<Anonymize<Ifsq5hnrgk1fhu>>;
        /**
         * Remove a given assetId -> assetType association
         */
        remove_existing_asset_type: TxDescriptor<Anonymize<I53muj3qku75an>>;
        /**
         * Destroy a given foreign assetId
         * The weight in this case is the one returned by the trait
         * plus the db writes and reads from removing all the associated
         * data
         */
        destroy_foreign_asset: TxDescriptor<Anonymize<I53muj3qku75an>>;
    };
    XcmTransactor: {
        /**
         * Register a derivative index for an account id. Dispatchable by
         * DerivativeAddressRegistrationOrigin
         *
         * We do not store the derivative address, but only the index. We do not need to store
         * the derivative address to issue calls, only the index is enough
         *
         * For now an index is registered for all possible destinations and not per-destination.
         * We can change this in the future although it would just make things more complicated
         */
        register: TxDescriptor<Anonymize<I7ftla9uldpsck>>;
        /**
         * De-Register a derivative index. This prevents an account to use a derivative address
         * (represented by an index) from our of our sovereign accounts anymore
         */
        deregister: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Transact the inner call through a derivative account in a destination chain,
         * using 'fee_location' to pay for the fees. This fee_location is given as a multilocation
         *
         * The caller needs to have the index registered in this pallet. The fee multiasset needs
         * to be a reserve asset for the destination transactor::multilocation.
         */
        transact_through_derivative: TxDescriptor<Anonymize<I6hso490tnm9h4>>;
        /**
         * Transact the call through the sovereign account in a destination chain,
         * 'fee_payer' pays for the fee
         *
         * SovereignAccountDispatcherOrigin callable only
         */
        transact_through_sovereign: TxDescriptor<Anonymize<I4d8r6ni3smvbq>>;
        /**
         * Change the transact info of a location
         */
        set_transact_info: TxDescriptor<Anonymize<I5jipnfinnrumu>>;
        /**
         * Remove the transact info of a location
         */
        remove_transact_info: TxDescriptor<Anonymize<Icscpmubum33bq>>;
        /**
         * Transact the call through the a signed origin in this chain
         * that should be converted to a transaction dispatch account in the destination chain
         * by any method implemented in the destination chains runtime
         *
         * This time we are giving the currency as a currencyId instead of multilocation
         */
        transact_through_signed: TxDescriptor<Anonymize<Iehad3aaamosq5>>;
        /**
         * Set the fee per second of an asset on its reserve chain
         */
        set_fee_per_second: TxDescriptor<Anonymize<If6qluggsjqn24>>;
        /**
         * Remove the fee per second of an asset on its reserve chain
         */
        remove_fee_per_second: TxDescriptor<Anonymize<Ibmjtl75ptu606>>;
        /**
         * Manage HRMP operations
         */
        hrmp_manage: TxDescriptor<Anonymize<I7rec93lud546q>>;
    };
    EthereumXcm: {
        /**
         * Xcm Transact an Ethereum transaction.
         * Weight: Gas limit plus the db read involving the suspension check
         */
        transact: TxDescriptor<Anonymize<I5d5ame4o328hi>>;
        /**
         * Xcm Transact an Ethereum transaction through proxy.
         * Weight: Gas limit plus the db reads involving the suspension and proxy checks
         */
        transact_through_proxy: TxDescriptor<Anonymize<I6pm4ngit6p3fq>>;
        /**
         * Suspends all Ethereum executions from XCM.
         *
         * - `origin`: Must pass `ControllerOrigin`.
         */
        suspend_ethereum_xcm_execution: TxDescriptor<undefined>;
        /**
         * Resumes all Ethereum executions from XCM.
         *
         * - `origin`: Must pass `ControllerOrigin`.
         */
        resume_ethereum_xcm_execution: TxDescriptor<undefined>;
        /**
         * Xcm Transact an Ethereum transaction, but allow to force the caller and create address.
         * This call should be restricted (callable only by the runtime or governance).
         * Weight: Gas limit plus the db reads involving the suspension and proxy checks
         */
        force_transact_as: TxDescriptor<Anonymize<I4g6atvguddvkt>>;
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
    EvmForeignAssets: {
        /**
         * Create new asset with the ForeignAssetCreator
         */
        create_foreign_asset: TxDescriptor<Anonymize<I379npf8sk9t8>>;
        /**
         * Change the xcm type mapping for a given assetId
         * We also change this if the previous units per second where pointing at the old
         * assetType
         */
        change_xcm_location: TxDescriptor<Anonymize<Ic0s0pur65t3iu>>;
        /**
         * Freeze a given foreign assetId
         */
        freeze_foreign_asset: TxDescriptor<Anonymize<Iatf3353k2f8t7>>;
        /**
         * Unfreeze a given foreign assetId
         */
        unfreeze_foreign_asset: TxDescriptor<Anonymize<Ib9karr24cpmca>>;
    };
    XcmWeightTrader: {
        /**
        
         */
        add_asset: TxDescriptor<Anonymize<I83vh5qua5oulp>>;
        /**
        
         */
        edit_asset: TxDescriptor<Anonymize<I83vh5qua5oulp>>;
        /**
        
         */
        pause_asset_support: TxDescriptor<Anonymize<I2adkav4nfpltp>>;
        /**
        
         */
        resume_asset_support: TxDescriptor<Anonymize<I2adkav4nfpltp>>;
        /**
        
         */
        remove_asset: TxDescriptor<Anonymize<I2adkav4nfpltp>>;
    };
    EmergencyParaXcm: {
        /**
         * Resume `Normal` mode
         */
        paused_to_normal: TxDescriptor<undefined>;
        /**
         * Authorize a runtime upgrade. Only callable in `Paused` mode
         */
        fast_authorize_upgrade: TxDescriptor<Anonymize<Ib51vk42m1po4n>>;
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
    Randomness: {
        /**
         * Populates `RandomnessResults` due this epoch with BABE epoch randomness
         */
        set_babe_randomness_results: TxDescriptor<undefined>;
    };
    BridgeKusamaGrandpa: {
        /**
         * This call is deprecated and will be removed around May 2024. Use the
         * `submit_finality_proof_ex` instead. Semantically, this call is an equivalent of the
         * `submit_finality_proof_ex` call without current authority set id check.
         */
        submit_finality_proof: TxDescriptor<Anonymize<I29mlfpi57nes9>>;
        /**
         * Bootstrap the bridge pallet with an initial header and authority set from which to sync.
         *
         * The initial configuration provided does not need to be the genesis header of the bridged
         * chain, it can be any arbitrary header. You can also provide the next scheduled set
         * change if it is already know.
         *
         * This function is only allowed to be called from a trusted origin and writes to storage
         * with practically no checks in terms of the validity of the data. It is important that
         * you ensure that valid data is being passed in.
         */
        initialize: TxDescriptor<Anonymize<I9n8t62ile2km9>>;
        /**
         * Change `PalletOwner`.
         *
         * May only be called either by root, or by `PalletOwner`.
         */
        set_owner: TxDescriptor<Anonymize<Iv53je8etqh25>>;
        /**
         * Halt or resume all pallet operations.
         *
         * May only be called either by root, or by `PalletOwner`.
         */
        set_operating_mode: TxDescriptor<Anonymize<Id3fgg5dtq3ja9>>;
        /**
         * Verify a target header is finalized according to the given finality proof. The proof
         * is assumed to be signed by GRANDPA authorities set with `current_set_id` id.
         *
         * It will use the underlying storage pallet to fetch information about the current
         * authorities and best finalized header in order to verify that the header is finalized.
         *
         * If successful in verification, it will write the target header to the underlying storage
         * pallet.
         *
         * The call fails if:
         *
         * - the pallet is halted;
         *
         * - the pallet knows better header than the `finality_target`;
         *
         * - the id of best GRANDPA authority set, known to the pallet is not equal to the
         * `current_set_id`;
         *
         * - verification is not optimized or invalid;
         *
         * - header contains forced authorities set change or change with non-zero delay.
         *
         * The `is_free_execution_expected` parameter is not really used inside the call. It is
         * used by the transaction extension, which should be registered at the runtime level. If
         * this parameter is `true`, the transaction will be treated as invalid, if the call won't
         * be executed for free. If transaction extension is not used by the runtime, this
         * parameter is not used at all.
         */
        submit_finality_proof_ex: TxDescriptor<Anonymize<I7hl2ljcti73p2>>;
        /**
         * Set current authorities set and best finalized bridged header to given values
         * (almost) without any checks. This call can fail only if:
         *
         * - the call origin is not a root or a pallet owner;
         *
         * - there are too many authorities in the new set.
         *
         * No other checks are made. Previously imported headers stay in the storage and
         * are still accessible after the call.
         */
        force_set_pallet_state: TxDescriptor<Anonymize<I19i0akqkvu7h8>>;
    };
    BridgeKusamaParachains: {
        /**
         * Submit proof of one or several parachain heads.
         *
         * The proof is supposed to be proof of some `Heads` entries from the
         * `polkadot-runtime-parachains::paras` pallet instance, deployed at the bridged chain.
         * The proof is supposed to be crafted at the `relay_header_hash` that must already be
         * imported by corresponding GRANDPA pallet at this chain.
         *
         * The call fails if:
         *
         * - the pallet is halted;
         *
         * - the relay chain block `at_relay_block` is not imported by the associated bridge
         * GRANDPA pallet.
         *
         * The call may succeed, but some heads may not be updated e.g. because pallet knows
         * better head or it isn't tracked by the pallet.
         */
        submit_parachain_heads: TxDescriptor<Anonymize<I4pbpsirgl3tci>>;
        /**
         * Change `PalletOwner`.
         *
         * May only be called either by root, or by `PalletOwner`.
         */
        set_owner: TxDescriptor<Anonymize<Iv53je8etqh25>>;
        /**
         * Halt or resume all pallet operations.
         *
         * May only be called either by root, or by `PalletOwner`.
         */
        set_operating_mode: TxDescriptor<Anonymize<Id3fgg5dtq3ja9>>;
        /**
         * Submit proof of one or several parachain heads.
         *
         * The proof is supposed to be proof of some `Heads` entries from the
         * `polkadot-runtime-parachains::paras` pallet instance, deployed at the bridged chain.
         * The proof is supposed to be crafted at the `relay_header_hash` that must already be
         * imported by corresponding GRANDPA pallet at this chain.
         *
         * The call fails if:
         *
         * - the pallet is halted;
         *
         * - the relay chain block `at_relay_block` is not imported by the associated bridge
         * GRANDPA pallet.
         *
         * The call may succeed, but some heads may not be updated e.g. because pallet knows
         * better head or it isn't tracked by the pallet.
         *
         * The `is_free_execution_expected` parameter is not really used inside the call. It is
         * used by the transaction extension, which should be registered at the runtime level. If
         * this parameter is `true`, the transaction will be treated as invalid, if the call won't
         * be executed for free. If transaction extension is not used by the runtime, this
         * parameter is not used at all.
         */
        submit_parachain_heads_ex: TxDescriptor<Anonymize<I1be5fgduvh91i>>;
    };
    BridgeKusamaMessages: {
        /**
         * Change `PalletOwner`.
         *
         * May only be called either by root, or by `PalletOwner`.
         */
        set_owner: TxDescriptor<Anonymize<Iv53je8etqh25>>;
        /**
         * Halt or resume all/some pallet operations.
         *
         * May only be called either by root, or by `PalletOwner`.
         */
        set_operating_mode: TxDescriptor<Anonymize<If7h5asiehgc1m>>;
        /**
         * Receive messages proof from bridged chain.
         *
         * The weight of the call assumes that the transaction always brings outbound lane
         * state update. Because of that, the submitter (relayer) has no benefit of not including
         * this data in the transaction, so reward confirmations lags should be minimal.
         *
         * The call fails if:
         *
         * - the pallet is halted;
         *
         * - the call origin is not `Signed(_)`;
         *
         * - there are too many messages in the proof;
         *
         * - the proof verification procedure returns an error - e.g. because header used to craft
         * proof is not imported by the associated finality pallet;
         *
         * - the `dispatch_weight` argument is not sufficient to dispatch all bundled messages.
         *
         * The call may succeed, but some messages may not be delivered e.g. if they are not fit
         * into the unrewarded relayers vector.
         */
        receive_messages_proof: TxDescriptor<Anonymize<Ib2r5rmd2kb5rr>>;
        /**
         * Receive messages delivery proof from bridged chain.
         */
        receive_messages_delivery_proof: TxDescriptor<Anonymize<I8enps0nf0j3o4>>;
    };
    BridgeXcmOverMoonriver: {
        /**
         * Open a bridge between two locations.
         *
         * The caller must be within the `T::OpenBridgeOrigin` filter (presumably: a sibling
         * parachain or a parent relay chain). The `bridge_destination_universal_location` must be
         * a destination within the consensus of the `T::BridgedNetwork` network.
         *
         * The `BridgeDeposit` amount is reserved on the caller account. This deposit
         * is unreserved after bridge is closed.
         *
         * The states after this call: bridge is `Opened`, outbound lane is `Opened`, inbound lane
         * is `Opened`.
         */
        open_bridge: TxDescriptor<Anonymize<I6c1udb33nvkg9>>;
        /**
         * Try to close the bridge.
         *
         * Can only be called by the "owner" of this side of the bridge, meaning that the
         * inbound XCM channel with the local origin chain is working.
         *
         * Closed bridge is a bridge without any traces in the runtime storage. So this method
         * first tries to prune all queued messages at the outbound lane. When there are no
         * outbound messages left, outbound and inbound lanes are purged. After that, funds
         * are returned back to the owner of this side of the bridge.
         *
         * The number of messages that we may prune in a single call is limited by the
         * `may_prune_messages` argument. If there are more messages in the queue, the method
         * prunes exactly `may_prune_messages` and exits early. The caller may call it again
         * until outbound queue is depleted and get his funds back.
         *
         * The states after this call: everything is either `Closed`, or purged from the
         * runtime storage.
         */
        close_bridge: TxDescriptor<Anonymize<Ifha513j297q5e>>;
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
        ExtrinsicFailed: PlainDescriptor<Anonymize<Iun9l0lrnqvtt>>;
        /**
         * `:code` was updated.
         */
        CodeUpdated: PlainDescriptor<undefined>;
        /**
         * A new account was created.
         */
        NewAccount: PlainDescriptor<Anonymize<I64i34r0tn439a>>;
        /**
         * An account was reaped.
         */
        KilledAccount: PlainDescriptor<Anonymize<I64i34r0tn439a>>;
        /**
         * On on-chain remark happened.
         */
        Remarked: PlainDescriptor<Anonymize<Ift7k6k1vpbi63>>;
        /**
         * An upgrade was authorized.
         */
        UpgradeAuthorized: PlainDescriptor<Anonymize<Ibgl04rn6nbfm6>>;
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
    RootTesting: {
        /**
         * Event dispatched when the trigger_defensive extrinsic is called.
         */
        DefensiveTestCall: PlainDescriptor<undefined>;
    };
    Balances: {
        /**
         * An account was created with some free balance.
         */
        Endowed: PlainDescriptor<Anonymize<I3ecpih42i9ued>>;
        /**
         * An account was removed whose balance was non-zero but below ExistentialDeposit,
         * resulting in an outright loss.
         */
        DustLost: PlainDescriptor<Anonymize<Idagmf1s3t818e>>;
        /**
         * Transfer succeeded.
         */
        Transfer: PlainDescriptor<Anonymize<Iata20h6b309vv>>;
        /**
         * A balance was set by root.
         */
        BalanceSet: PlainDescriptor<Anonymize<I2933v5hnardc0>>;
        /**
         * Some balance was reserved (moved from free to reserved).
         */
        Reserved: PlainDescriptor<Anonymize<Ibnba9cres7tu>>;
        /**
         * Some balance was unreserved (moved from reserved to free).
         */
        Unreserved: PlainDescriptor<Anonymize<Ibnba9cres7tu>>;
        /**
         * Some balance was moved from the reserve of the first account to the second account.
         * Final argument indicates the destination balance type.
         */
        ReserveRepatriated: PlainDescriptor<Anonymize<Ibvv65jm0gurrm>>;
        /**
         * Some amount was deposited (e.g. for transaction fees).
         */
        Deposit: PlainDescriptor<Anonymize<Ibnba9cres7tu>>;
        /**
         * Some amount was withdrawn from the account (e.g. for transaction fees).
         */
        Withdraw: PlainDescriptor<Anonymize<Ibnba9cres7tu>>;
        /**
         * Some amount was removed from the account (e.g. for misbehavior).
         */
        Slashed: PlainDescriptor<Anonymize<Ibnba9cres7tu>>;
        /**
         * Some amount was minted into an account.
         */
        Minted: PlainDescriptor<Anonymize<Ibnba9cres7tu>>;
        /**
         * Some amount was burned from an account.
         */
        Burned: PlainDescriptor<Anonymize<Ibnba9cres7tu>>;
        /**
         * Some amount was suspended from an account (it can be restored later).
         */
        Suspended: PlainDescriptor<Anonymize<Ibnba9cres7tu>>;
        /**
         * Some amount was restored into an account.
         */
        Restored: PlainDescriptor<Anonymize<Ibnba9cres7tu>>;
        /**
         * An account was upgraded.
         */
        Upgraded: PlainDescriptor<Anonymize<I4rsmslqkgb8qr>>;
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
        Locked: PlainDescriptor<Anonymize<Ibnba9cres7tu>>;
        /**
         * Some balance was unlocked.
         */
        Unlocked: PlainDescriptor<Anonymize<Ibnba9cres7tu>>;
        /**
         * Some balance was frozen.
         */
        Frozen: PlainDescriptor<Anonymize<Ibnba9cres7tu>>;
        /**
         * Some balance was thawed.
         */
        Thawed: PlainDescriptor<Anonymize<Ibnba9cres7tu>>;
        /**
         * The `TotalIssuance` was forcefully changed.
         */
        TotalIssuanceForced: PlainDescriptor<Anonymize<I4fooe9dun9o0t>>;
    };
    TransactionPayment: {
        /**
         * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
         * has been paid by `who`.
         */
        TransactionFeePaid: PlainDescriptor<Anonymize<I97pnebnn4tkhc>>;
    };
    ParachainStaking: {
        /**
         * Started new round.
         */
        NewRound: PlainDescriptor<Anonymize<I68vefv6bi40pm>>;
        /**
         * Account joined the set of collator candidates.
         */
        JoinedCollatorCandidates: PlainDescriptor<Anonymize<Iftkfae30kugcq>>;
        /**
         * Candidate selected for collators. Total Exposed Amount includes all delegations.
         */
        CollatorChosen: PlainDescriptor<Anonymize<I17ukutvof0ve2>>;
        /**
         * Candidate requested to decrease a self bond.
         */
        CandidateBondLessRequested: PlainDescriptor<Anonymize<Ibvvl72jn681iq>>;
        /**
         * Candidate has increased a self bond.
         */
        CandidateBondedMore: PlainDescriptor<Anonymize<Ie613ancv0jknl>>;
        /**
         * Candidate has decreased a self bond.
         */
        CandidateBondedLess: PlainDescriptor<Anonymize<I5sm0lt4vndrm9>>;
        /**
         * Candidate temporarily leave the set of collator candidates without unbonding.
         */
        CandidateWentOffline: PlainDescriptor<Anonymize<Ifcg60143soedq>>;
        /**
         * Candidate rejoins the set of collator candidates.
         */
        CandidateBackOnline: PlainDescriptor<Anonymize<Ifcg60143soedq>>;
        /**
         * Candidate has requested to leave the set of candidates.
         */
        CandidateScheduledExit: PlainDescriptor<Anonymize<I3llnd78pv2h9v>>;
        /**
         * Cancelled request to leave the set of candidates.
         */
        CancelledCandidateExit: PlainDescriptor<Anonymize<Ifcg60143soedq>>;
        /**
         * Cancelled request to decrease candidate's bond.
         */
        CancelledCandidateBondLess: PlainDescriptor<Anonymize<Idl5sk5t49u4vk>>;
        /**
         * Candidate has left the set of candidates.
         */
        CandidateLeft: PlainDescriptor<Anonymize<I3c0ak1g99r7mq>>;
        /**
         * Delegator requested to decrease a bond for the collator candidate.
         */
        DelegationDecreaseScheduled: PlainDescriptor<Anonymize<Ifc77bq577konn>>;
        /**
        
         */
        DelegationIncreased: PlainDescriptor<Anonymize<Idh9lqfad8a2aq>>;
        /**
        
         */
        DelegationDecreased: PlainDescriptor<Anonymize<Idh9lqfad8a2aq>>;
        /**
         * Delegator requested to leave the set of delegators.
         */
        DelegatorExitScheduled: PlainDescriptor<Anonymize<I1p078p7cgor9k>>;
        /**
         * Delegator requested to revoke delegation.
         */
        DelegationRevocationScheduled: PlainDescriptor<Anonymize<Ifsfg9vjdv536v>>;
        /**
         * Delegator has left the set of delegators.
         */
        DelegatorLeft: PlainDescriptor<Anonymize<I4hf4jr1nooq2i>>;
        /**
         * Delegation revoked.
         */
        DelegationRevoked: PlainDescriptor<Anonymize<I8q8go5ssttd5d>>;
        /**
         * Delegation kicked.
         */
        DelegationKicked: PlainDescriptor<Anonymize<I8q8go5ssttd5d>>;
        /**
         * Cancelled a pending request to exit the set of delegators.
         */
        DelegatorExitCancelled: PlainDescriptor<Anonymize<I6a9r4se514q6d>>;
        /**
         * Cancelled request to change an existing delegation.
         */
        CancelledDelegationRequest: PlainDescriptor<Anonymize<Ibjcii86jf2m74>>;
        /**
         * New delegation (increase of the existing one).
         */
        Delegation: PlainDescriptor<Anonymize<I4jpr41fkr2iv2>>;
        /**
         * Delegation from candidate state has been remove.
         */
        DelegatorLeftCandidate: PlainDescriptor<Anonymize<I4ktb62ucg8r8v>>;
        /**
         * Paid the account (delegator or collator) the balance as liquid rewards.
         */
        Rewarded: PlainDescriptor<Anonymize<I2l9i7suo53kao>>;
        /**
         * Transferred to account which holds funds reserved for parachain bond.
         */
        InflationDistributed: PlainDescriptor<Anonymize<I2mcpbv0ik4rbq>>;
        /**
        
         */
        InflationDistributionConfigUpdated: PlainDescriptor<Anonymize<Icrvh9hsc9dfs0>>;
        /**
         * Annual inflation input (first 3) was used to derive new per-round inflation (last 3)
         */
        InflationSet: PlainDescriptor<Anonymize<I8jjc8aeseo568>>;
        /**
         * Staking expectations set.
         */
        StakeExpectationsSet: PlainDescriptor<Anonymize<Ia48s8or178ack>>;
        /**
         * Set total selected candidates to this value.
         */
        TotalSelectedSet: PlainDescriptor<Anonymize<I6fomjr8ghrs40>>;
        /**
         * Set collator commission to this value.
         */
        CollatorCommissionSet: PlainDescriptor<Anonymize<I6fomjr8ghrs40>>;
        /**
         * Set blocks per round
         */
        BlocksPerRoundSet: PlainDescriptor<Anonymize<I25jemnddpsl99>>;
        /**
         * Auto-compounding reward percent was set for a delegation.
         */
        AutoCompoundSet: PlainDescriptor<Anonymize<I39l6hn1m2g7p1>>;
        /**
         * Compounded a portion of rewards towards the delegation.
         */
        Compounded: PlainDescriptor<Anonymize<I91f3georfm7vn>>;
    };
    AuthorFilter: {
        /**
         * The amount of eligible authors for the filter to select has been changed.
         */
        EligibleUpdated: PlainDescriptor<number>;
    };
    AuthorMapping: {
        /**
         * A NimbusId has been registered and mapped to an AccountId.
         */
        KeysRegistered: PlainDescriptor<Anonymize<I1d9e1b2lo88g3>>;
        /**
         * An NimbusId has been de-registered, and its AccountId mapping removed.
         */
        KeysRemoved: PlainDescriptor<Anonymize<I1d9e1b2lo88g3>>;
        /**
         * An NimbusId has been registered, replacing a previous registration and its mapping.
         */
        KeysRotated: PlainDescriptor<Anonymize<Idhmv574kgr1en>>;
    };
    MoonbeamOrbiters: {
        /**
         * An orbiter join a collator pool
         */
        OrbiterJoinCollatorPool: PlainDescriptor<Anonymize<Iamgbscgq9tk2s>>;
        /**
         * An orbiter leave a collator pool
         */
        OrbiterLeaveCollatorPool: PlainDescriptor<Anonymize<Iamgbscgq9tk2s>>;
        /**
         * Paid the orbiter account the balance as liquid rewards.
         */
        OrbiterRewarded: PlainDescriptor<Anonymize<I2l9i7suo53kao>>;
        /**
        
         */
        OrbiterRotation: PlainDescriptor<Anonymize<Irqmq32c6bt43>>;
        /**
         * An orbiter has registered
         */
        OrbiterRegistered: PlainDescriptor<Anonymize<I5aaf7rm6pdsdh>>;
        /**
         * An orbiter has unregistered
         */
        OrbiterUnregistered: PlainDescriptor<Anonymize<I64i34r0tn439a>>;
    };
    Utility: {
        /**
         * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
         * well as the error.
         */
        BatchInterrupted: PlainDescriptor<Anonymize<Iclnv1rm3j1ibs>>;
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
        ItemFailed: PlainDescriptor<Anonymize<I8u7aielas35pf>>;
        /**
         * A call was dispatched.
         */
        DispatchedAs: PlainDescriptor<Anonymize<Ifs4v0043l9sa5>>;
    };
    Proxy: {
        /**
         * A proxy was executed correctly, with the given.
         */
        ProxyExecuted: PlainDescriptor<Anonymize<Ifs4v0043l9sa5>>;
        /**
         * A pure account has been created by new proxy with given
         * disambiguation index and proxy type.
         */
        PureCreated: PlainDescriptor<Anonymize<Ic41o5tfkjki24>>;
        /**
         * An announcement was placed to make a call in the future.
         */
        Announced: PlainDescriptor<Anonymize<I9qviu560vg4dt>>;
        /**
         * A proxy was added.
         */
        ProxyAdded: PlainDescriptor<Anonymize<Ifuev5pidklrr3>>;
        /**
         * A proxy was removed.
         */
        ProxyRemoved: PlainDescriptor<Anonymize<Ifuev5pidklrr3>>;
    };
    MaintenanceMode: {
        /**
         * The chain was put into Maintenance Mode
         */
        EnteredMaintenanceMode: PlainDescriptor<undefined>;
        /**
         * The chain returned to its normal operating state
         */
        NormalOperationResumed: PlainDescriptor<undefined>;
        /**
         * The call to suspend on_idle XCM execution failed with inner error
         */
        FailedToSuspendIdleXcmExecution: PlainDescriptor<Anonymize<I8u7aielas35pf>>;
        /**
         * The call to resume on_idle XCM execution failed with inner error
         */
        FailedToResumeIdleXcmExecution: PlainDescriptor<Anonymize<I8u7aielas35pf>>;
    };
    Identity: {
        /**
         * A name was set or reset (which will remove all judgements).
         */
        IdentitySet: PlainDescriptor<Anonymize<I4rsmslqkgb8qr>>;
        /**
         * A name was cleared, and the given balance returned.
         */
        IdentityCleared: PlainDescriptor<Anonymize<I1v10g1nq7dong>>;
        /**
         * A name was removed and the given balance slashed.
         */
        IdentityKilled: PlainDescriptor<Anonymize<I1v10g1nq7dong>>;
        /**
         * A judgement was asked from a registrar.
         */
        JudgementRequested: PlainDescriptor<Anonymize<I9i38hjanm6j9f>>;
        /**
         * A judgement request was retracted.
         */
        JudgementUnrequested: PlainDescriptor<Anonymize<I9i38hjanm6j9f>>;
        /**
         * A judgement was given by a registrar.
         */
        JudgementGiven: PlainDescriptor<Anonymize<Ic2pdjj0snhgp1>>;
        /**
         * A registrar was added.
         */
        RegistrarAdded: PlainDescriptor<Anonymize<Itvt1jsipv0lc>>;
        /**
         * A sub-identity was added to an identity and the deposit paid.
         */
        SubIdentityAdded: PlainDescriptor<Anonymize<I26b3hgj509l2q>>;
        /**
         * An account's sub-identities were set (in bulk).
         */
        SubIdentitiesSet: PlainDescriptor<Anonymize<Iabvuost5sn5bf>>;
        /**
         * A given sub-account's associated name was changed by its super-identity.
         */
        SubIdentityRenamed: PlainDescriptor<Anonymize<If6gpndc4hkjk>>;
        /**
         * A sub-identity was removed from an identity and the deposit freed.
         */
        SubIdentityRemoved: PlainDescriptor<Anonymize<I26b3hgj509l2q>>;
        /**
         * A sub-identity was cleared, and the given deposit repatriated from the
         * main identity account to the sub-identity account.
         */
        SubIdentityRevoked: PlainDescriptor<Anonymize<I26b3hgj509l2q>>;
        /**
         * A username authority was added.
         */
        AuthorityAdded: PlainDescriptor<Anonymize<I980npvt4ko2oj>>;
        /**
         * A username authority was removed.
         */
        AuthorityRemoved: PlainDescriptor<Anonymize<I980npvt4ko2oj>>;
        /**
         * A username was set for `who`.
         */
        UsernameSet: PlainDescriptor<Anonymize<Icojbcdrmo8g9n>>;
        /**
         * A username was queued, but `who` must accept it prior to `expiration`.
         */
        UsernameQueued: PlainDescriptor<Anonymize<I4tp79beg36bon>>;
        /**
         * A queued username passed its expiration without being claimed and was removed.
         */
        PreapprovalExpired: PlainDescriptor<Anonymize<I46oelk9rchag6>>;
        /**
         * A username was set as a primary and can be looked up from `who`.
         */
        PrimaryUsernameSet: PlainDescriptor<Anonymize<Icojbcdrmo8g9n>>;
        /**
         * A dangling username (as in, a username corresponding to an account that has removed its
         * identity) has been removed.
         */
        DanglingUsernameRemoved: PlainDescriptor<Anonymize<Icojbcdrmo8g9n>>;
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
    Migrations: {
        /**
         * Runtime upgrade started
         */
        RuntimeUpgradeStarted: PlainDescriptor<undefined>;
        /**
         * Runtime upgrade completed
         */
        RuntimeUpgradeCompleted: PlainDescriptor<Anonymize<Iffoqstodvgb9c>>;
        /**
         * Migration started
         */
        MigrationStarted: PlainDescriptor<Anonymize<Iavnfpaburegqq>>;
        /**
         * Migration completed
         */
        MigrationCompleted: PlainDescriptor<Anonymize<If198fd3vrqn7u>>;
        /**
         * XCM execution suspension failed with inner error
         */
        FailedToSuspendIdleXcmExecution: PlainDescriptor<Anonymize<I8u7aielas35pf>>;
        /**
         * XCM execution resume failed with inner error
         */
        FailedToResumeIdleXcmExecution: PlainDescriptor<Anonymize<I8u7aielas35pf>>;
    };
    Multisig: {
        /**
         * A new multisig operation has begun.
         */
        NewMultisig: PlainDescriptor<Anonymize<Ib1i3vscnt2kp4>>;
        /**
         * A multisig operation has been approved by someone.
         */
        MultisigApproval: PlainDescriptor<Anonymize<Ia55fgto645bva>>;
        /**
         * A multisig operation has been executed.
         */
        MultisigExecuted: PlainDescriptor<Anonymize<I35njf1jhf1ie8>>;
        /**
         * A multisig operation has been cancelled.
         */
        MultisigCancelled: PlainDescriptor<Anonymize<I8isor8208eull>>;
    };
    Parameters: {
        /**
         * A Parameter was set.
         *
         * Is also emitted when the value was not changed.
         */
        Updated: PlainDescriptor<Anonymize<I5nnh4168qqjsk>>;
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
        Dispatched: PlainDescriptor<Anonymize<Ifo07lib6rv8j3>>;
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
    ConvictionVoting: {
        /**
         * An account has delegated their vote to another account. \[who, target\]
         */
        Delegated: PlainDescriptor<Anonymize<I5b6sd80djbc64>>;
        /**
         * An \[account\] has cancelled a previous delegation operation.
         */
        Undelegated: PlainDescriptor<HexString>;
        /**
         * An account that has voted
         */
        Voted: PlainDescriptor<Anonymize<Ibhldvmubmjth2>>;
        /**
         * A vote that been removed
         */
        VoteRemoved: PlainDescriptor<Anonymize<Ibhldvmubmjth2>>;
    };
    Referenda: {
        /**
         * A referendum has been submitted.
         */
        Submitted: PlainDescriptor<Anonymize<I229ijht536qdu>>;
        /**
         * The decision deposit has been placed.
         */
        DecisionDepositPlaced: PlainDescriptor<Anonymize<Iepmkf5d8a0b7i>>;
        /**
         * The decision deposit has been refunded.
         */
        DecisionDepositRefunded: PlainDescriptor<Anonymize<Iepmkf5d8a0b7i>>;
        /**
         * A deposit has been slashed.
         */
        DepositSlashed: PlainDescriptor<Anonymize<Ibnba9cres7tu>>;
        /**
         * A referendum has moved into the deciding phase.
         */
        DecisionStarted: PlainDescriptor<Anonymize<I9cg2delv92pvq>>;
        /**
        
         */
        ConfirmStarted: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
        
         */
        ConfirmAborted: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A referendum has ended its confirmation phase and is ready for approval.
         */
        Confirmed: PlainDescriptor<Anonymize<Ilhp45uime5tp>>;
        /**
         * A referendum has been approved and its proposal has been scheduled.
         */
        Approved: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A proposal has been rejected by referendum.
         */
        Rejected: PlainDescriptor<Anonymize<Ilhp45uime5tp>>;
        /**
         * A referendum has been timed out without being decided.
         */
        TimedOut: PlainDescriptor<Anonymize<Ilhp45uime5tp>>;
        /**
         * A referendum has been cancelled.
         */
        Cancelled: PlainDescriptor<Anonymize<Ilhp45uime5tp>>;
        /**
         * A referendum has been killed.
         */
        Killed: PlainDescriptor<Anonymize<Ilhp45uime5tp>>;
        /**
         * The submission deposit has been refunded.
         */
        SubmissionDepositRefunded: PlainDescriptor<Anonymize<Iepmkf5d8a0b7i>>;
        /**
         * Metadata for a referendum has been set.
         */
        MetadataSet: PlainDescriptor<Anonymize<I4f1hv034jf1dt>>;
        /**
         * Metadata for a referendum has been cleared.
         */
        MetadataCleared: PlainDescriptor<Anonymize<I4f1hv034jf1dt>>;
    };
    Whitelist: {
        /**
        
         */
        CallWhitelisted: PlainDescriptor<Anonymize<I1adbcfi5uc62r>>;
        /**
        
         */
        WhitelistedCallRemoved: PlainDescriptor<Anonymize<I1adbcfi5uc62r>>;
        /**
        
         */
        WhitelistedCallDispatched: PlainDescriptor<Anonymize<Icdoijbojtaksl>>;
    };
    TreasuryCouncilCollective: {
        /**
         * A motion (given hash) has been proposed (by given account) with a threshold (given
         * `MemberCount`).
         */
        Proposed: PlainDescriptor<Anonymize<I7kfspda96roem>>;
        /**
         * A motion (given hash) has been voted on by given account, leaving
         * a tally (yes votes and no votes given respectively as `MemberCount`).
         */
        Voted: PlainDescriptor<Anonymize<I3gfupbmrg231o>>;
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
        Executed: PlainDescriptor<Anonymize<Ia08e1l4rehsh9>>;
        /**
         * A single member did some action; result will be `Ok` if it returned without error.
         */
        MemberExecuted: PlainDescriptor<Anonymize<Ia08e1l4rehsh9>>;
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
        ProposalCostBurned: PlainDescriptor<Anonymize<I36i15sa21ipvt>>;
        /**
         * Some cost for storing a proposal was released.
         */
        ProposalCostReleased: PlainDescriptor<Anonymize<I36i15sa21ipvt>>;
    };
    OpenTechCommitteeCollective: {
        /**
         * A motion (given hash) has been proposed (by given account) with a threshold (given
         * `MemberCount`).
         */
        Proposed: PlainDescriptor<Anonymize<I7kfspda96roem>>;
        /**
         * A motion (given hash) has been voted on by given account, leaving
         * a tally (yes votes and no votes given respectively as `MemberCount`).
         */
        Voted: PlainDescriptor<Anonymize<I3gfupbmrg231o>>;
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
        Executed: PlainDescriptor<Anonymize<Ia08e1l4rehsh9>>;
        /**
         * A single member did some action; result will be `Ok` if it returned without error.
         */
        MemberExecuted: PlainDescriptor<Anonymize<Ia08e1l4rehsh9>>;
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
        ProposalCostBurned: PlainDescriptor<Anonymize<I36i15sa21ipvt>>;
        /**
         * Some cost for storing a proposal was released.
         */
        ProposalCostReleased: PlainDescriptor<Anonymize<I36i15sa21ipvt>>;
    };
    Treasury: {
        /**
         * We have ended a spend period and will now allocate funds.
         */
        Spending: PlainDescriptor<Anonymize<I8iksqi3eani0a>>;
        /**
         * Some funds have been allocated.
         */
        Awarded: PlainDescriptor<Anonymize<Iktsi3p12r1nf>>;
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
         */
        SpendApproved: PlainDescriptor<Anonymize<I56jvc7p0b0306>>;
        /**
         * The inactive funds of the pallet have been updated.
         */
        UpdatedInactive: PlainDescriptor<Anonymize<I4hcillge8de5f>>;
        /**
         * A new asset spend proposal has been approved.
         */
        AssetSpendApproved: PlainDescriptor<Anonymize<I9of9chdpickkl>>;
        /**
         * An approved spend was voided.
         */
        AssetSpendVoided: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A payment happened.
         */
        Paid: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A payment failed and can be retried.
         */
        PaymentFailed: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A spend was processed and removed from the storage. It might have been successfully
         * paid or it may have expired.
         */
        SpendProcessed: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
    };
    CrowdloanRewards: {
        /**
         * The initial payment of InitializationPayment % was paid
         */
        InitialPaymentMade: PlainDescriptor<Anonymize<Ic2o7gh4sgom1k>>;
        /**
         * Someone has proven they made a contribution and associated a native identity with it.
         * Data is the relay account,  native account and the total amount of _rewards_ that will be paid
         */
        NativeIdentityAssociated: PlainDescriptor<Anonymize<I4moiumda17j4k>>;
        /**
         * A contributor has claimed some rewards.
         * Data is the account getting paid and the amount of rewards paid.
         */
        RewardsPaid: PlainDescriptor<Anonymize<Ic2o7gh4sgom1k>>;
        /**
         * A contributor has updated the reward address.
         */
        RewardAddressUpdated: PlainDescriptor<Anonymize<I5b6sd80djbc64>>;
        /**
         * When initializing the reward vec an already initialized account was found
         */
        InitializedAlreadyInitializedAccount: PlainDescriptor<Anonymize<I20nlejbovhut6>>;
        /**
         * When initializing the reward vec an already initialized account was found
         */
        InitializedAccountWithNotEnoughContribution: PlainDescriptor<Anonymize<I20nlejbovhut6>>;
    };
    XcmpQueue: {
        /**
         * An HRMP message was sent to a sibling parachain.
         */
        XcmpMessageSent: PlainDescriptor<Anonymize<I137t1cld92pod>>;
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
    Assets: {
        /**
         * Some asset class was created.
         */
        Created: PlainDescriptor<Anonymize<Idh8b393kqmj7j>>;
        /**
         * Some assets were issued.
         */
        Issued: PlainDescriptor<Anonymize<Ielv09e10u0hs2>>;
        /**
         * Some assets were transferred.
         */
        Transferred: PlainDescriptor<Anonymize<I6g4mum1jlnvc1>>;
        /**
         * Some assets were destroyed.
         */
        Burned: PlainDescriptor<Anonymize<I3fprcgugsmetj>>;
        /**
         * The management team changed.
         */
        TeamChanged: PlainDescriptor<Anonymize<Ic5n87r88749i9>>;
        /**
         * The owner changed.
         */
        OwnerChanged: PlainDescriptor<Anonymize<I56o6rrhe8jc9p>>;
        /**
         * Some account `who` was frozen.
         */
        Frozen: PlainDescriptor<Anonymize<Ifk0u9gb6g0mb2>>;
        /**
         * Some account `who` was thawed.
         */
        Thawed: PlainDescriptor<Anonymize<Ifk0u9gb6g0mb2>>;
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
        ForceCreated: PlainDescriptor<Anonymize<I56o6rrhe8jc9p>>;
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
        ApprovedTransfer: PlainDescriptor<Anonymize<I6h2hvtgcdifdu>>;
        /**
         * An approval for account `delegate` was cancelled by `owner`.
         */
        ApprovalCancelled: PlainDescriptor<Anonymize<I624mqthj1is3k>>;
        /**
         * An `amount` was transferred in its entirety from `owner` to `destination` by
         * the approved `delegate`.
         */
        TransferredApproved: PlainDescriptor<Anonymize<Ibb83anngn8kjs>>;
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
        Touched: PlainDescriptor<Anonymize<I2i7q7k387rgn8>>;
        /**
         * Some account `who` was blocked.
         */
        Blocked: PlainDescriptor<Anonymize<Ifk0u9gb6g0mb2>>;
        /**
         * Some assets were deposited (e.g. for transaction fees).
         */
        Deposited: PlainDescriptor<Anonymize<Id9dkj6pnhun40>>;
        /**
         * Some assets were withdrawn from the account (e.g. for transaction fees).
         */
        Withdrawn: PlainDescriptor<Anonymize<Id9dkj6pnhun40>>;
    };
    AssetManager: {
        /**
         * New asset with the asset manager is registered
         */
        ForeignAssetRegistered: PlainDescriptor<Anonymize<Ifg57078c09fmj>>;
        /**
         * Changed the amount of units we are charging per execution second for a given asset
         */
        UnitsPerSecondChanged: PlainDescriptor<undefined>;
        /**
         * Changed the xcm type mapping for a given asset id
         */
        ForeignAssetXcmLocationChanged: PlainDescriptor<Anonymize<Iemia6jnjjt9pk>>;
        /**
         * Removed all information related to an assetId
         */
        ForeignAssetRemoved: PlainDescriptor<Anonymize<Ibp1rmkdg27gch>>;
        /**
         * Supported asset type for fee payment removed
         */
        SupportedAssetRemoved: PlainDescriptor<Anonymize<Ibb592400fjaeq>>;
        /**
         * Removed all information related to an assetId and destroyed asset
         */
        ForeignAssetDestroyed: PlainDescriptor<Anonymize<Ibp1rmkdg27gch>>;
        /**
         * Removed all information related to an assetId and destroyed asset
         */
        LocalAssetDestroyed: PlainDescriptor<Anonymize<Ib9karr24cpmca>>;
    };
    XcmTransactor: {
        /**
         * Transacted the inner call through a derivative account in a destination chain.
         */
        TransactedDerivative: PlainDescriptor<Anonymize<Id06b279ssr1kc>>;
        /**
         * Transacted the call through the sovereign account in a destination chain.
         */
        TransactedSovereign: PlainDescriptor<Anonymize<Ic0kmabrt5gmed>>;
        /**
         * Transacted the call through a signed account in a destination chain.
         */
        TransactedSigned: PlainDescriptor<Anonymize<I7mnb4b8me3to9>>;
        /**
         * Registered a derivative index for an account id.
         */
        RegisteredDerivative: PlainDescriptor<Anonymize<Igss9t88pmg14>>;
        /**
        
         */
        DeRegisteredDerivative: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Transact failed
         */
        TransactFailed: PlainDescriptor<Anonymize<Iflkd2j467575k>>;
        /**
         * Changed the transact info of a location
         */
        TransactInfoChanged: PlainDescriptor<Anonymize<Ie4l506ob97qll>>;
        /**
         * Removed the transact info of a location
         */
        TransactInfoRemoved: PlainDescriptor<Anonymize<I2adkav4nfpltp>>;
        /**
         * Set dest fee per second
         */
        DestFeePerSecondChanged: PlainDescriptor<Anonymize<Ibj2l071rn1t54>>;
        /**
         * Remove dest fee per second
         */
        DestFeePerSecondRemoved: PlainDescriptor<Anonymize<I2adkav4nfpltp>>;
        /**
         * HRMP manage action succesfully sent
         */
        HrmpManagementSent: PlainDescriptor<Anonymize<I84dsnnkjb0aqp>>;
    };
    EthereumXcm: {
        /**
         * Ethereum transaction executed from XCM
         */
        ExecutedFromXcm: PlainDescriptor<Anonymize<Ielbsgfbhoi5ci>>;
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
    EvmForeignAssets: {
        /**
         * New asset with the asset manager is registered
         */
        ForeignAssetCreated: PlainDescriptor<Anonymize<Ia28js1r46j2jd>>;
        /**
         * Changed the xcm type mapping for a given asset id
         */
        ForeignAssetXcmLocationChanged: PlainDescriptor<Anonymize<I2rh7qrq0i4g18>>;
        /**
        
         */
        ForeignAssetFrozen: PlainDescriptor<Anonymize<I8lbbb85osree4>>;
        /**
        
         */
        ForeignAssetUnfrozen: PlainDescriptor<Anonymize<I8lbbb85osree4>>;
        /**
         * Tokens have been locked for asset creation
         */
        TokensLocked: PlainDescriptor<Anonymize<I8sb4e35iir6l5>>;
    };
    XcmWeightTrader: {
        /**
         * New supported asset is registered
         */
        SupportedAssetAdded: PlainDescriptor<Anonymize<I83vh5qua5oulp>>;
        /**
         * Changed the amount of units we are charging per execution second for a given asset
         */
        SupportedAssetEdited: PlainDescriptor<Anonymize<I83vh5qua5oulp>>;
        /**
         * Pause support for a given asset
         */
        PauseAssetSupport: PlainDescriptor<Anonymize<I2adkav4nfpltp>>;
        /**
         * Resume support for a given asset
         */
        ResumeAssetSupport: PlainDescriptor<Anonymize<I2adkav4nfpltp>>;
        /**
         * Supported asset type for fee payment removed
         */
        SupportedAssetRemoved: PlainDescriptor<Anonymize<I2adkav4nfpltp>>;
    };
    EmergencyParaXcm: {
        /**
         * The XCM incoming execution was Paused
         */
        EnteredPausedXcmMode: PlainDescriptor<undefined>;
        /**
         * The XCM incoming execution returned to normal operation
         */
        NormalXcmOperationResumed: PlainDescriptor<undefined>;
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
    Randomness: {
        /**
        
         */
        RandomnessRequestedBabeEpoch: PlainDescriptor<Anonymize<Iahnhnerp9kl4i>>;
        /**
        
         */
        RandomnessRequestedLocal: PlainDescriptor<Anonymize<Ia0eo5esjam6l0>>;
        /**
        
         */
        RequestFulfilled: PlainDescriptor<Anonymize<I4ov6e94l79mbg>>;
        /**
        
         */
        RequestFeeIncreased: PlainDescriptor<Anonymize<I9ii7g5i3f004f>>;
        /**
        
         */
        RequestExpirationExecuted: PlainDescriptor<Anonymize<I4ov6e94l79mbg>>;
    };
    BridgeKusamaGrandpa: {
        /**
         * Best finalized chain header has been updated to the header with given number and hash.
         */
        UpdatedBestFinalizedHeader: PlainDescriptor<Anonymize<Id4cm1n8k2kug1>>;
    };
    BridgeKusamaParachains: {
        /**
         * The caller has provided head of parachain that the pallet is not configured to track.
         */
        UntrackedParachainRejected: PlainDescriptor<Anonymize<I6p1tq74832j8u>>;
        /**
         * The caller has declared that he has provided given parachain head, but it is missing
         * from the storage proof.
         */
        MissingParachainHead: PlainDescriptor<Anonymize<I6p1tq74832j8u>>;
        /**
         * The caller has provided parachain head hash that is not matching the hash read from the
         * storage proof.
         */
        IncorrectParachainHeadHash: PlainDescriptor<Anonymize<Ij76tvu0faddj>>;
        /**
         * The caller has provided obsolete parachain head, which is already known to the pallet.
         */
        RejectedObsoleteParachainHead: PlainDescriptor<Anonymize<I6r44prunlrgaa>>;
        /**
         * The caller has provided parachain head that exceeds the maximal configured head size.
         */
        RejectedLargeParachainHead: PlainDescriptor<Anonymize<I6b8h9eitutv15>>;
        /**
         * Parachain head has been updated.
         */
        UpdatedParachainHead: PlainDescriptor<Anonymize<I6r44prunlrgaa>>;
    };
    BridgeKusamaMessages: {
        /**
         * Message has been accepted and is waiting to be delivered.
         */
        MessageAccepted: PlainDescriptor<Anonymize<I1udtl7slp3rsi>>;
        /**
         * Messages have been received from the bridged chain.
         */
        MessagesReceived: PlainDescriptor<Anonymize<I2epvs8l1lnps1>>;
        /**
         * Messages in the inclusive range have been delivered to the bridged chain.
         */
        MessagesDelivered: PlainDescriptor<Anonymize<I5q1vbe7r2d82f>>;
    };
    BridgeXcmOverMoonriver: {
        /**
         * The bridge between two locations has been opened.
         */
        BridgeOpened: PlainDescriptor<Anonymize<I27v0imulq8cgl>>;
        /**
         * Bridge is going to be closed, but not yet fully pruned from the runtime storage.
         */
        ClosingBridge: PlainDescriptor<Anonymize<I73r8bg99ccqq4>>;
        /**
         * Bridge has been closed and pruned from the runtime storage. It now may be reopened
         * again by any participant.
         */
        BridgePruned: PlainDescriptor<Anonymize<Ifeve6k9vrdlrh>>;
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
    ParachainStaking: {
        /**
        
         */
        DelegatorDNE: PlainDescriptor<undefined>;
        /**
        
         */
        DelegatorDNEinTopNorBottom: PlainDescriptor<undefined>;
        /**
        
         */
        DelegatorDNEInDelegatorSet: PlainDescriptor<undefined>;
        /**
        
         */
        CandidateDNE: PlainDescriptor<undefined>;
        /**
        
         */
        DelegationDNE: PlainDescriptor<undefined>;
        /**
        
         */
        DelegatorExists: PlainDescriptor<undefined>;
        /**
        
         */
        CandidateExists: PlainDescriptor<undefined>;
        /**
        
         */
        CandidateBondBelowMin: PlainDescriptor<undefined>;
        /**
        
         */
        InsufficientBalance: PlainDescriptor<undefined>;
        /**
        
         */
        DelegatorBondBelowMin: PlainDescriptor<undefined>;
        /**
        
         */
        DelegationBelowMin: PlainDescriptor<undefined>;
        /**
        
         */
        AlreadyOffline: PlainDescriptor<undefined>;
        /**
        
         */
        AlreadyActive: PlainDescriptor<undefined>;
        /**
        
         */
        DelegatorAlreadyLeaving: PlainDescriptor<undefined>;
        /**
        
         */
        DelegatorNotLeaving: PlainDescriptor<undefined>;
        /**
        
         */
        DelegatorCannotLeaveYet: PlainDescriptor<undefined>;
        /**
        
         */
        CannotDelegateIfLeaving: PlainDescriptor<undefined>;
        /**
        
         */
        CandidateAlreadyLeaving: PlainDescriptor<undefined>;
        /**
        
         */
        CandidateNotLeaving: PlainDescriptor<undefined>;
        /**
        
         */
        CandidateCannotLeaveYet: PlainDescriptor<undefined>;
        /**
        
         */
        CannotGoOnlineIfLeaving: PlainDescriptor<undefined>;
        /**
        
         */
        ExceedMaxDelegationsPerDelegator: PlainDescriptor<undefined>;
        /**
        
         */
        AlreadyDelegatedCandidate: PlainDescriptor<undefined>;
        /**
        
         */
        InvalidSchedule: PlainDescriptor<undefined>;
        /**
        
         */
        CannotSetBelowMin: PlainDescriptor<undefined>;
        /**
        
         */
        RoundLengthMustBeGreaterThanTotalSelectedCollators: PlainDescriptor<undefined>;
        /**
        
         */
        NoWritingSameValue: PlainDescriptor<undefined>;
        /**
        
         */
        TotalInflationDistributionPercentExceeds100: PlainDescriptor<undefined>;
        /**
        
         */
        TooLowCandidateCountWeightHintJoinCandidates: PlainDescriptor<undefined>;
        /**
        
         */
        TooLowCandidateCountWeightHintCancelLeaveCandidates: PlainDescriptor<undefined>;
        /**
        
         */
        TooLowCandidateCountToLeaveCandidates: PlainDescriptor<undefined>;
        /**
        
         */
        TooLowDelegationCountToDelegate: PlainDescriptor<undefined>;
        /**
        
         */
        TooLowCandidateDelegationCountToDelegate: PlainDescriptor<undefined>;
        /**
        
         */
        TooLowCandidateDelegationCountToLeaveCandidates: PlainDescriptor<undefined>;
        /**
        
         */
        TooLowDelegationCountToLeaveDelegators: PlainDescriptor<undefined>;
        /**
        
         */
        PendingCandidateRequestsDNE: PlainDescriptor<undefined>;
        /**
        
         */
        PendingCandidateRequestAlreadyExists: PlainDescriptor<undefined>;
        /**
        
         */
        PendingCandidateRequestNotDueYet: PlainDescriptor<undefined>;
        /**
        
         */
        PendingDelegationRequestDNE: PlainDescriptor<undefined>;
        /**
        
         */
        PendingDelegationRequestAlreadyExists: PlainDescriptor<undefined>;
        /**
        
         */
        PendingDelegationRequestNotDueYet: PlainDescriptor<undefined>;
        /**
        
         */
        CannotDelegateLessThanOrEqualToLowestBottomWhenFull: PlainDescriptor<undefined>;
        /**
        
         */
        PendingDelegationRevoke: PlainDescriptor<undefined>;
        /**
        
         */
        TooLowDelegationCountToAutoCompound: PlainDescriptor<undefined>;
        /**
        
         */
        TooLowCandidateAutoCompoundingDelegationCountToAutoCompound: PlainDescriptor<undefined>;
        /**
        
         */
        TooLowCandidateAutoCompoundingDelegationCountToDelegate: PlainDescriptor<undefined>;
        /**
        
         */
        TooLowCollatorCountToNotifyAsInactive: PlainDescriptor<undefined>;
        /**
        
         */
        CannotBeNotifiedAsInactive: PlainDescriptor<undefined>;
        /**
        
         */
        TooLowCandidateAutoCompoundingDelegationCountToLeaveCandidates: PlainDescriptor<undefined>;
        /**
        
         */
        TooLowCandidateCountWeightHint: PlainDescriptor<undefined>;
        /**
        
         */
        TooLowCandidateCountWeightHintGoOffline: PlainDescriptor<undefined>;
        /**
        
         */
        CandidateLimitReached: PlainDescriptor<undefined>;
        /**
        
         */
        CannotSetAboveMaxCandidates: PlainDescriptor<undefined>;
        /**
        
         */
        MarkingOfflineNotEnabled: PlainDescriptor<undefined>;
        /**
        
         */
        CurrentRoundTooLow: PlainDescriptor<undefined>;
    };
    AuthorInherent: {
        /**
         * Author already set in block.
         */
        AuthorAlreadySet: PlainDescriptor<undefined>;
        /**
         * No AccountId was found to be associated with this author
         */
        NoAccountId: PlainDescriptor<undefined>;
        /**
         * The author in the inherent is not an eligible author.
         */
        CannotBeAuthor: PlainDescriptor<undefined>;
    };
    AuthorMapping: {
        /**
         * The association can't be cleared because it is not found.
         */
        AssociationNotFound: PlainDescriptor<undefined>;
        /**
         * The association can't be cleared because it belongs to another account.
         */
        NotYourAssociation: PlainDescriptor<undefined>;
        /**
         * This account cannot set an author because it cannon afford the security deposit
         */
        CannotAffordSecurityDeposit: PlainDescriptor<undefined>;
        /**
         * The NimbusId in question is already associated and cannot be overwritten
         */
        AlreadyAssociated: PlainDescriptor<undefined>;
        /**
         * No existing NimbusId can be found for the account
         */
        OldAuthorIdNotFound: PlainDescriptor<undefined>;
        /**
         * Keys have wrong size
         */
        WrongKeySize: PlainDescriptor<undefined>;
        /**
         * Failed to decode NimbusId for `set_keys`
         */
        DecodeNimbusFailed: PlainDescriptor<undefined>;
        /**
         * Failed to decode T::Keys for `set_keys`
         */
        DecodeKeysFailed: PlainDescriptor<undefined>;
    };
    MoonbeamOrbiters: {
        /**
         * The collator is already added in orbiters program.
         */
        CollatorAlreadyAdded: PlainDescriptor<undefined>;
        /**
         * This collator is not in orbiters program.
         */
        CollatorNotFound: PlainDescriptor<undefined>;
        /**
         * There are already too many orbiters associated with this collator.
         */
        CollatorPoolTooLarge: PlainDescriptor<undefined>;
        /**
         * There are more collator pools than the number specified in the parameter.
         */
        CollatorsPoolCountTooLow: PlainDescriptor<undefined>;
        /**
         * The minimum deposit required to register as an orbiter has not yet been included in the
         * onchain storage
         */
        MinOrbiterDepositNotSet: PlainDescriptor<undefined>;
        /**
         * This orbiter is already associated with this collator.
         */
        OrbiterAlreadyInPool: PlainDescriptor<undefined>;
        /**
         * This orbiter has not made a deposit
         */
        OrbiterDepositNotFound: PlainDescriptor<undefined>;
        /**
         * This orbiter is not found
         */
        OrbiterNotFound: PlainDescriptor<undefined>;
        /**
         * The orbiter is still at least in one pool
         */
        OrbiterStillInAPool: PlainDescriptor<undefined>;
    };
    Utility: {
        /**
         * Too many calls batched.
         */
        TooManyCalls: PlainDescriptor<undefined>;
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
    MaintenanceMode: {
        /**
         * The chain cannot enter maintenance mode because it is already in maintenance mode
         */
        AlreadyInMaintenanceMode: PlainDescriptor<undefined>;
        /**
         * The chain cannot resume normal operation because it is not in maintenance mode
         */
        NotInMaintenanceMode: PlainDescriptor<undefined>;
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
    Migrations: {
        /**
         * Missing preimage in original democracy storage
         */
        PreimageMissing: PlainDescriptor<undefined>;
        /**
         * Provided upper bound is too low.
         */
        WrongUpperBound: PlainDescriptor<undefined>;
        /**
         * Preimage is larger than the new max size.
         */
        PreimageIsTooBig: PlainDescriptor<undefined>;
        /**
         * Preimage already exists in the new storage.
         */
        PreimageAlreadyExists: PlainDescriptor<undefined>;
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
    MoonbeamLazyMigrations: {
        /**
         * The contract already have metadata
         */
        ContractMetadataAlreadySet: PlainDescriptor<undefined>;
        /**
         * Contract not exist
         */
        ContractNotExist: PlainDescriptor<undefined>;
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
    ConvictionVoting: {
        /**
         * Poll is not ongoing.
         */
        NotOngoing: PlainDescriptor<undefined>;
        /**
         * The given account did not vote on the poll.
         */
        NotVoter: PlainDescriptor<undefined>;
        /**
         * The actor has no permission to conduct the action.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * The actor has no permission to conduct the action right now but will do in the future.
         */
        NoPermissionYet: PlainDescriptor<undefined>;
        /**
         * The account is already delegating.
         */
        AlreadyDelegating: PlainDescriptor<undefined>;
        /**
         * The account currently has votes attached to it and the operation cannot succeed until
         * these are removed through `remove_vote`.
         */
        AlreadyVoting: PlainDescriptor<undefined>;
        /**
         * Too high a balance was provided that the account cannot afford.
         */
        InsufficientFunds: PlainDescriptor<undefined>;
        /**
         * The account is not currently delegating.
         */
        NotDelegating: PlainDescriptor<undefined>;
        /**
         * Delegation to oneself makes no sense.
         */
        Nonsense: PlainDescriptor<undefined>;
        /**
         * Maximum number of votes reached.
         */
        MaxVotesReached: PlainDescriptor<undefined>;
        /**
         * The class must be supplied since it is not easily determinable from the state.
         */
        ClassNeeded: PlainDescriptor<undefined>;
        /**
         * The class ID supplied is invalid.
         */
        BadClass: PlainDescriptor<undefined>;
    };
    Referenda: {
        /**
         * Referendum is not ongoing.
         */
        NotOngoing: PlainDescriptor<undefined>;
        /**
         * Referendum's decision deposit is already paid.
         */
        HasDeposit: PlainDescriptor<undefined>;
        /**
         * The track identifier given was invalid.
         */
        BadTrack: PlainDescriptor<undefined>;
        /**
         * There are already a full complement of referenda in progress for this track.
         */
        Full: PlainDescriptor<undefined>;
        /**
         * The queue of the track is empty.
         */
        QueueEmpty: PlainDescriptor<undefined>;
        /**
         * The referendum index provided is invalid in this context.
         */
        BadReferendum: PlainDescriptor<undefined>;
        /**
         * There was nothing to do in the advancement.
         */
        NothingToDo: PlainDescriptor<undefined>;
        /**
         * No track exists for the proposal origin.
         */
        NoTrack: PlainDescriptor<undefined>;
        /**
         * Any deposit cannot be refunded until after the decision is over.
         */
        Unfinished: PlainDescriptor<undefined>;
        /**
         * The deposit refunder is not the depositor.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * The deposit cannot be refunded since none was made.
         */
        NoDeposit: PlainDescriptor<undefined>;
        /**
         * The referendum status is invalid for this operation.
         */
        BadStatus: PlainDescriptor<undefined>;
        /**
         * The preimage does not exist.
         */
        PreimageNotExist: PlainDescriptor<undefined>;
        /**
         * The preimage is stored with a different length than the one provided.
         */
        PreimageStoredWithDifferentLength: PlainDescriptor<undefined>;
    };
    Whitelist: {
        /**
         * The preimage of the call hash could not be loaded.
         */
        UnavailablePreImage: PlainDescriptor<undefined>;
        /**
         * The call could not be decoded.
         */
        UndecodableCall: PlainDescriptor<undefined>;
        /**
         * The weight of the decoded call was higher than the witness.
         */
        InvalidCallWeightWitness: PlainDescriptor<undefined>;
        /**
         * The call was not whitelisted.
         */
        CallIsNotWhitelisted: PlainDescriptor<undefined>;
        /**
         * The call was already whitelisted; No-Op.
         */
        CallAlreadyWhitelisted: PlainDescriptor<undefined>;
    };
    TreasuryCouncilCollective: {
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
    OpenTechCommitteeCollective: {
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
    Treasury: {
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
        /**
         * The balance of the asset kind is not convertible to the balance of the native asset.
         */
        FailedToConvertBalance: PlainDescriptor<undefined>;
        /**
         * The spend has expired and cannot be claimed.
         */
        SpendExpired: PlainDescriptor<undefined>;
        /**
         * The spend is not yet eligible for payout.
         */
        EarlyPayout: PlainDescriptor<undefined>;
        /**
         * The payment has already been attempted.
         */
        AlreadyAttempted: PlainDescriptor<undefined>;
        /**
         * There was some issue with the mechanism of payment.
         */
        PayoutError: PlainDescriptor<undefined>;
        /**
         * The payout was not yet attempted/claimed.
         */
        NotAttempted: PlainDescriptor<undefined>;
        /**
         * The payment has neither failed nor succeeded yet.
         */
        Inconclusive: PlainDescriptor<undefined>;
    };
    CrowdloanRewards: {
        /**
         * User trying to associate a native identity with a relay chain identity for posterior
         * reward claiming provided an already associated relay chain identity
         */
        AlreadyAssociated: PlainDescriptor<undefined>;
        /**
         * Trying to introduce a batch that goes beyond the limits of the funds
         */
        BatchBeyondFundPot: PlainDescriptor<undefined>;
        /**
         * First claim already done
         */
        FirstClaimAlreadyDone: PlainDescriptor<undefined>;
        /**
         * The contribution is not high enough to be eligible for rewards
         */
        RewardNotHighEnough: PlainDescriptor<undefined>;
        /**
         * User trying to associate a native identity with a relay chain identity for posterior
         * reward claiming provided a wrong signature
         */
        InvalidClaimSignature: PlainDescriptor<undefined>;
        /**
         * User trying to claim the first free reward provided the wrong signature
         */
        InvalidFreeClaimSignature: PlainDescriptor<undefined>;
        /**
         * User trying to claim an award did not have an claim associated with it. This may mean
         * they did not contribute to the crowdloan, or they have not yet associated a native id
         * with their contribution
         */
        NoAssociatedClaim: PlainDescriptor<undefined>;
        /**
         * User trying to claim rewards has already claimed all rewards associated with its
         * identity and contribution
         */
        RewardsAlreadyClaimed: PlainDescriptor<undefined>;
        /**
         * Reward vec has already been initialized
         */
        RewardVecAlreadyInitialized: PlainDescriptor<undefined>;
        /**
         * Reward vec has not yet been fully initialized
         */
        RewardVecNotFullyInitializedYet: PlainDescriptor<undefined>;
        /**
         * Rewards should match funds of the pallet
         */
        RewardsDoNotMatchFund: PlainDescriptor<undefined>;
        /**
         * Initialize_reward_vec received too many contributors
         */
        TooManyContributors: PlainDescriptor<undefined>;
        /**
         * Provided vesting period is not valid
         */
        VestingPeriodNonValid: PlainDescriptor<undefined>;
        /**
         * User provided a signature from a non-contributor relay account
         */
        NonContributedAddressProvided: PlainDescriptor<undefined>;
        /**
         * User submitted an unsifficient number of proofs to change the reward address
         */
        InsufficientNumberOfValidProofs: PlainDescriptor<undefined>;
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
    AssetManager: {
        /**
        
         */
        ErrorCreatingAsset: PlainDescriptor<undefined>;
        /**
        
         */
        AssetAlreadyExists: PlainDescriptor<undefined>;
        /**
        
         */
        AssetDoesNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        TooLowNumAssetsWeightHint: PlainDescriptor<undefined>;
        /**
        
         */
        LocalAssetLimitReached: PlainDescriptor<undefined>;
        /**
        
         */
        ErrorDestroyingAsset: PlainDescriptor<undefined>;
        /**
        
         */
        NotSufficientDeposit: PlainDescriptor<undefined>;
        /**
        
         */
        NonExistentLocalAsset: PlainDescriptor<undefined>;
    };
    XcmTransactor: {
        /**
        
         */
        IndexAlreadyClaimed: PlainDescriptor<undefined>;
        /**
        
         */
        UnclaimedIndex: PlainDescriptor<undefined>;
        /**
        
         */
        NotOwner: PlainDescriptor<undefined>;
        /**
        
         */
        UnweighableMessage: PlainDescriptor<undefined>;
        /**
        
         */
        CannotReanchor: PlainDescriptor<undefined>;
        /**
        
         */
        AssetHasNoReserve: PlainDescriptor<undefined>;
        /**
        
         */
        InvalidDest: PlainDescriptor<undefined>;
        /**
        
         */
        NotCrossChainTransfer: PlainDescriptor<undefined>;
        /**
        
         */
        AssetIsNotReserveInDestination: PlainDescriptor<undefined>;
        /**
        
         */
        DestinationNotInvertible: PlainDescriptor<undefined>;
        /**
        
         */
        ErrorDelivering: PlainDescriptor<undefined>;
        /**
        
         */
        DispatchWeightBiggerThanTotalWeight: PlainDescriptor<undefined>;
        /**
        
         */
        WeightOverflow: PlainDescriptor<undefined>;
        /**
        
         */
        AmountOverflow: PlainDescriptor<undefined>;
        /**
        
         */
        TransactorInfoNotSet: PlainDescriptor<undefined>;
        /**
        
         */
        NotCrossChainTransferableCurrency: PlainDescriptor<undefined>;
        /**
        
         */
        XcmExecuteError: PlainDescriptor<undefined>;
        /**
        
         */
        BadVersion: PlainDescriptor<undefined>;
        /**
        
         */
        MaxWeightTransactReached: PlainDescriptor<undefined>;
        /**
        
         */
        UnableToWithdrawAsset: PlainDescriptor<undefined>;
        /**
        
         */
        FeePerSecondNotSet: PlainDescriptor<undefined>;
        /**
        
         */
        SignedTransactNotAllowedForDestination: PlainDescriptor<undefined>;
        /**
        
         */
        FailedMultiLocationToJunction: PlainDescriptor<undefined>;
        /**
        
         */
        HrmpHandlerNotImplemented: PlainDescriptor<undefined>;
        /**
        
         */
        TooMuchFeeUsed: PlainDescriptor<undefined>;
        /**
        
         */
        ErrorValidating: PlainDescriptor<undefined>;
        /**
        
         */
        RefundNotSupportedWithTransactInfo: PlainDescriptor<undefined>;
    };
    EthereumXcm: {
        /**
         * Xcm to Ethereum execution is suspended
         */
        EthereumXcmExecutionSuspended: PlainDescriptor<undefined>;
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
    EvmForeignAssets: {
        /**
        
         */
        AssetAlreadyExists: PlainDescriptor<undefined>;
        /**
        
         */
        AssetAlreadyFrozen: PlainDescriptor<undefined>;
        /**
        
         */
        AssetDoesNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        AssetIdFiltered: PlainDescriptor<undefined>;
        /**
        
         */
        AssetNotFrozen: PlainDescriptor<undefined>;
        /**
        
         */
        CorruptedStorageOrphanLocation: PlainDescriptor<undefined>;
        /**
        
         */
        Erc20ContractCreationFail: PlainDescriptor<undefined>;
        /**
        
         */
        EvmCallPauseFail: PlainDescriptor<undefined>;
        /**
        
         */
        EvmCallUnpauseFail: PlainDescriptor<undefined>;
        /**
        
         */
        EvmCallMintIntoFail: PlainDescriptor<undefined>;
        /**
        
         */
        EvmCallTransferFail: PlainDescriptor<undefined>;
        /**
        
         */
        EvmInternalError: PlainDescriptor<undefined>;
        /**
         * Account has insufficient balance for locking
         */
        InsufficientBalance: PlainDescriptor<undefined>;
        /**
        
         */
        CannotConvertLocationToAccount: PlainDescriptor<undefined>;
        /**
        
         */
        LocationOutsideOfOrigin: PlainDescriptor<undefined>;
        /**
        
         */
        AssetNotInSiblingPara: PlainDescriptor<undefined>;
        /**
        
         */
        InvalidSymbol: PlainDescriptor<undefined>;
        /**
        
         */
        InvalidTokenName: PlainDescriptor<undefined>;
        /**
        
         */
        LocationAlreadyExists: PlainDescriptor<undefined>;
        /**
        
         */
        TooManyForeignAssets: PlainDescriptor<undefined>;
    };
    XcmWeightTrader: {
        /**
         * The given asset was already added
         */
        AssetAlreadyAdded: PlainDescriptor<undefined>;
        /**
         * The given asset was already paused
         */
        AssetAlreadyPaused: PlainDescriptor<undefined>;
        /**
         * The given asset was not found
         */
        AssetNotFound: PlainDescriptor<undefined>;
        /**
         * The given asset is not paused
         */
        AssetNotPaused: PlainDescriptor<undefined>;
        /**
         * XCM location filtered
         */
        XcmLocationFiltered: PlainDescriptor<undefined>;
        /**
         * The relative price cannot be zero
         */
        PriceCannotBeZero: PlainDescriptor<undefined>;
        /**
         * The relative price calculation overflowed
         */
        PriceOverflow: PlainDescriptor<undefined>;
    };
    EmergencyParaXcm: {
        /**
         * The current XCM Mode is not Paused
         */
        NotInPausedMode: PlainDescriptor<undefined>;
    };
    MultiBlockMigrations: {
        /**
         * The operation cannot complete since some MBMs are ongoing.
         */
        Ongoing: PlainDescriptor<undefined>;
    };
    PrecompileBenchmarks: {
        /**
        
         */
        BenchmarkError: PlainDescriptor<undefined>;
    };
    Randomness: {
        /**
        
         */
        RequestCounterOverflowed: PlainDescriptor<undefined>;
        /**
        
         */
        RequestFeeOverflowed: PlainDescriptor<undefined>;
        /**
        
         */
        MustRequestAtLeastOneWord: PlainDescriptor<undefined>;
        /**
        
         */
        CannotRequestMoreWordsThanMax: PlainDescriptor<undefined>;
        /**
        
         */
        CannotRequestRandomnessAfterMaxDelay: PlainDescriptor<undefined>;
        /**
        
         */
        CannotRequestRandomnessBeforeMinDelay: PlainDescriptor<undefined>;
        /**
        
         */
        RequestDNE: PlainDescriptor<undefined>;
        /**
        
         */
        RequestCannotYetBeFulfilled: PlainDescriptor<undefined>;
        /**
        
         */
        OnlyRequesterCanIncreaseFee: PlainDescriptor<undefined>;
        /**
        
         */
        RequestHasNotExpired: PlainDescriptor<undefined>;
        /**
        
         */
        RandomnessResultDNE: PlainDescriptor<undefined>;
        /**
        
         */
        RandomnessResultNotFilled: PlainDescriptor<undefined>;
    };
    BridgeKusamaGrandpa: {
        /**
         * The given justification is invalid for the given header.
         */
        InvalidJustification: PlainDescriptor<undefined>;
        /**
         * The authority set from the underlying header chain is invalid.
         */
        InvalidAuthoritySet: PlainDescriptor<undefined>;
        /**
         * The header being imported is older than the best finalized header known to the pallet.
         */
        OldHeader: PlainDescriptor<undefined>;
        /**
         * The scheduled authority set change found in the header is unsupported by the pallet.
         *
         * This is the case for non-standard (e.g forced) authority set changes.
         */
        UnsupportedScheduledChange: PlainDescriptor<undefined>;
        /**
         * The pallet is not yet initialized.
         */
        NotInitialized: PlainDescriptor<undefined>;
        /**
         * The pallet has already been initialized.
         */
        AlreadyInitialized: PlainDescriptor<undefined>;
        /**
         * Too many authorities in the set.
         */
        TooManyAuthoritiesInSet: PlainDescriptor<undefined>;
        /**
         * Error generated by the `OwnedBridgeModule` trait.
         */
        BridgeModule: PlainDescriptor<Anonymize<I8ih4atobnlo2v>>;
        /**
         * The `current_set_id` argument of the `submit_finality_proof_ex` doesn't match
         * the id of the current set, known to the pallet.
         */
        InvalidAuthoritySetId: PlainDescriptor<undefined>;
        /**
         * The submitter wanted free execution, but we can't fit more free transactions
         * to the block.
         */
        FreeHeadersLimitExceded: PlainDescriptor<undefined>;
        /**
         * The submitter wanted free execution, but the difference between best known and
         * bundled header numbers is below the `FreeHeadersInterval`.
         */
        BelowFreeHeaderInterval: PlainDescriptor<undefined>;
        /**
         * The header (and its finality) submission overflows hardcoded chain limits: size
         * and/or weight are larger than expected.
         */
        HeaderOverflowLimits: PlainDescriptor<undefined>;
    };
    BridgeKusamaParachains: {
        /**
         * Relay chain block hash is unknown to us.
         */
        UnknownRelayChainBlock: PlainDescriptor<undefined>;
        /**
         * The number of stored relay block is different from what the relayer has provided.
         */
        InvalidRelayChainBlockNumber: PlainDescriptor<undefined>;
        /**
         * Parachain heads storage proof is invalid.
         */
        HeaderChainStorageProof: PlainDescriptor<Anonymize<Ic2a7mmhqckbbo>>;
        /**
         * Error generated by the `OwnedBridgeModule` trait.
         */
        BridgeModule: PlainDescriptor<Anonymize<I8ih4atobnlo2v>>;
    };
    BridgeKusamaMessages: {
        /**
         * Pallet is not in Normal operating mode.
         */
        NotOperatingNormally: PlainDescriptor<undefined>;
        /**
         * Error that is reported by the lanes manager.
         */
        LanesManager: PlainDescriptor<Anonymize<I8ac87iu4gllf7>>;
        /**
         * Message has been treated as invalid by the pallet logic.
         */
        MessageRejectedByPallet: PlainDescriptor<Anonymize<I9l4i4j74aic6u>>;
        /**
         * The transaction brings too many messages.
         */
        TooManyMessagesInTheProof: PlainDescriptor<undefined>;
        /**
         * Invalid messages has been submitted.
         */
        InvalidMessagesProof: PlainDescriptor<undefined>;
        /**
         * Invalid messages delivery proof has been submitted.
         */
        InvalidMessagesDeliveryProof: PlainDescriptor<undefined>;
        /**
         * The relayer has declared invalid unrewarded relayers state in the
         * `receive_messages_delivery_proof` call.
         */
        InvalidUnrewardedRelayersState: PlainDescriptor<undefined>;
        /**
         * The cumulative dispatch weight, passed by relayer is not enough to cover dispatch
         * of all bundled messages.
         */
        InsufficientDispatchWeight: PlainDescriptor<undefined>;
        /**
         * Error confirming messages receival.
         */
        ReceptionConfirmation: PlainDescriptor<Anonymize<I6usvuval5ataj>>;
        /**
         * Error generated by the `OwnedBridgeModule` trait.
         */
        BridgeModule: PlainDescriptor<Anonymize<I8ih4atobnlo2v>>;
    };
    BridgeXcmOverMoonriver: {
        /**
         * Bridge locations error.
         */
        BridgeLocations: PlainDescriptor<Anonymize<Idcd89crotr3go>>;
        /**
         * Invalid local bridge origin account.
         */
        InvalidBridgeOriginAccount: PlainDescriptor<undefined>;
        /**
         * The bridge is already registered in this pallet.
         */
        BridgeAlreadyExists: PlainDescriptor<undefined>;
        /**
         * The local origin already owns a maximal number of bridges.
         */
        TooManyBridgesForLocalOrigin: PlainDescriptor<undefined>;
        /**
         * Trying to close already closed bridge.
         */
        BridgeAlreadyClosed: PlainDescriptor<undefined>;
        /**
         * Lanes manager error.
         */
        LanesManager: PlainDescriptor<Anonymize<I8ac87iu4gllf7>>;
        /**
         * Trying to access unknown bridge.
         */
        UnknownBridge: PlainDescriptor<undefined>;
        /**
         * The bridge origin can't pay the required amount for opening the bridge.
         */
        FailedToReserveBridgeDeposit: PlainDescriptor<undefined>;
        /**
         * The version of XCM location argument is unsupported.
         */
        UnsupportedXcmVersion: PlainDescriptor<undefined>;
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
    ParachainSystem: {
        /**
         * Returns the parachain ID we are running with.
         */
        SelfParaId: PlainDescriptor<number>;
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
    ParachainStaking: {
        /**
         * Minimum number of blocks per round
         */
        MinBlocksPerRound: PlainDescriptor<number>;
        /**
         * If a collator doesn't produce any block on this number of rounds, it is notified as inactive.
         * This value must be less than or equal to RewardPaymentDelay.
         */
        MaxOfflineRounds: PlainDescriptor<number>;
        /**
         * Number of rounds that candidates remain bonded before exit request is executable
         */
        LeaveCandidatesDelay: PlainDescriptor<number>;
        /**
         * Number of rounds candidate requests to decrease self-bond must wait to be executable
         */
        CandidateBondLessDelay: PlainDescriptor<number>;
        /**
         * Number of rounds that delegators remain bonded before exit request is executable
         */
        LeaveDelegatorsDelay: PlainDescriptor<number>;
        /**
         * Number of rounds that delegations remain bonded before revocation request is executable
         */
        RevokeDelegationDelay: PlainDescriptor<number>;
        /**
         * Number of rounds that delegation less requests must wait before executable
         */
        DelegationBondLessDelay: PlainDescriptor<number>;
        /**
         * Number of rounds after which block authors are rewarded
         */
        RewardPaymentDelay: PlainDescriptor<number>;
        /**
         * Minimum number of selected candidates every round
         */
        MinSelectedCandidates: PlainDescriptor<number>;
        /**
         * Maximum top delegations counted per candidate
         */
        MaxTopDelegationsPerCandidate: PlainDescriptor<number>;
        /**
         * Maximum bottom delegations (not counted) per candidate
         */
        MaxBottomDelegationsPerCandidate: PlainDescriptor<number>;
        /**
         * Maximum delegations per delegator
         */
        MaxDelegationsPerDelegator: PlainDescriptor<number>;
        /**
         * Minimum stake required for any account to be a collator candidate
         */
        MinCandidateStk: PlainDescriptor<bigint>;
        /**
         * Minimum stake for any registered on-chain account to delegate
         */
        MinDelegation: PlainDescriptor<bigint>;
        /**
         * Get the slot duration in milliseconds
         */
        SlotDuration: PlainDescriptor<bigint>;
        /**
         * Get the average time beetween 2 blocks in milliseconds
         */
        BlockTime: PlainDescriptor<bigint>;
        /**
         * Maximum candidates
         */
        MaxCandidates: PlainDescriptor<number>;
        /**
         * Threshold after which inflation become linear
         * If you don't want to use it, set it to `()`
         */
        LinearInflationThreshold: PlainDescriptor<Anonymize<I35p85j063s0il>>;
    };
    MoonbeamOrbiters: {
        /**
         * Maximum number of orbiters per collator.
         */
        MaxPoolSize: PlainDescriptor<number>;
        /**
         * Maximum number of round to keep on storage.
         */
        MaxRoundArchive: PlainDescriptor<number>;
        /**
         * Number of rounds before changing the selected orbiter.
         * WARNING: when changing `RotatePeriod`, you need a migration code that sets
         * `ForceRotation` to true to avoid holes in `OrbiterPerRound`.
         */
        RotatePeriod: PlainDescriptor<number>;
    };
    AsyncBacking: {
        /**
         * Purely informative, but used by mocking tools like chospticks to allow knowing how to mock
         * blocks
         */
        ExpectedBlockTime: PlainDescriptor<bigint>;
    };
    Utility: {
        /**
         * The limit on the number of batched calls.
         */
        batched_calls_limit: PlainDescriptor<number>;
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
    ConvictionVoting: {
        /**
         * The maximum number of concurrent votes an account may have.
         *
         * Also used to compute weight, an overly large value can lead to extrinsics with large
         * weight estimation: see `delegate` for instance.
         */
        MaxVotes: PlainDescriptor<number>;
        /**
         * The minimum period of vote locking.
         *
         * It should be no shorter than enactment period to ensure that in the case of an approval,
         * those successful voters are locked into the consequences that their votes entail.
         */
        VoteLockingPeriod: PlainDescriptor<number>;
    };
    Referenda: {
        /**
         * The minimum amount to be used as a deposit for a public referendum proposal.
         */
        SubmissionDeposit: PlainDescriptor<bigint>;
        /**
         * Maximum size of the referendum queue for a single track.
         */
        MaxQueued: PlainDescriptor<number>;
        /**
         * The number of blocks after submission that a referendum must begin being decided by.
         * Once this passes, then anyone may cancel the referendum.
         */
        UndecidingTimeout: PlainDescriptor<number>;
        /**
         * Quantization level for the referendum wakeup scheduler. A higher number will result in
         * fewer storage reads/writes needed for smaller voters, but also result in delays to the
         * automatic referendum status changes. Explicit servicing instructions are unaffected.
         */
        AlarmInterval: PlainDescriptor<number>;
        /**
         * Information concerning the different referendum tracks.
         */
        Tracks: PlainDescriptor<Anonymize<Ibafpkl9hhno69>>;
    };
    TreasuryCouncilCollective: {
        /**
         * The maximum weight of a dispatch call that can be proposed and executed.
         */
        MaxProposalWeight: PlainDescriptor<Anonymize<I4q39t5hn830vp>>;
    };
    OpenTechCommitteeCollective: {
        /**
         * The maximum weight of a dispatch call that can be proposed and executed.
         */
        MaxProposalWeight: PlainDescriptor<Anonymize<I4q39t5hn830vp>>;
    };
    Treasury: {
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
         * DEPRECATED: associated with `spend_local` call and will be removed in May 2025.
         * Refer to <https://github.com/paritytech/polkadot-sdk/pull/5961> for migration to `spend`.
         *
         * The maximum number of approvals that can wait in the spending queue.
         *
         * NOTE: This parameter is also used within the Bounties Pallet extension if enabled.
         */
        MaxApprovals: PlainDescriptor<number>;
        /**
         * The period during which an approved treasury spend has to be claimed.
         */
        PayoutPeriod: PlainDescriptor<number>;
    };
    CrowdloanRewards: {
        /**
         * Percentage to be payed at initialization
         */
        InitializationPayment: PlainDescriptor<number>;
        /**
        
         */
        MaxInitContributors: PlainDescriptor<number>;
        /**
         * A fraction representing the percentage of proofs
         * that need to be presented to change a reward address through the relay keys
         */
        RewardAddressRelayVoteThreshold: PlainDescriptor<number>;
        /**
         * Network Identifier to be appended into the signatures for reward address change/association
         * Prevents replay attacks from one network to the other
         */
        SignatureNetworkIdentifier: PlainDescriptor<Binary>;
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
    XcmTransactor: {
        /**
         * Self chain location.
         */
        SelfLocation: PlainDescriptor<Anonymize<If9iqq7i64mur8>>;
        /**
         *
         * The actual weight for an XCM message is `T::BaseXcmWeight +
         * T::Weigher::weight(&msg)`.
         */
        BaseXcmWeight: PlainDescriptor<Anonymize<I4q39t5hn830vp>>;
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
    RelayStorageRoots: {
        /**
         * Limit the number of relay storage roots that will be stored.
         * This limit applies to the number of items, not to their age. Decreasing the value of
         * `MaxStorageRoots` is a breaking change and needs a migration to clean the
         * `RelayStorageRoots` mapping.
         */
        MaxStorageRoots: PlainDescriptor<number>;
    };
    Randomness: {
        /**
         * The amount that should be taken as a security deposit when requesting randomness.
         */
        Deposit: PlainDescriptor<bigint>;
        /**
         * Maximum number of random words that can be requested per request
         */
        MaxRandomWords: PlainDescriptor<number>;
        /**
         * Local per-block VRF requests must be at least this many blocks after the block in which
         * they were requested
         */
        MinBlockDelay: PlainDescriptor<number>;
        /**
         * Local per-block VRF requests must be at most this many blocks after the block in which
         * they were requested
         */
        MaxBlockDelay: PlainDescriptor<number>;
        /**
         * Local requests expire and can be purged from storage after this many blocks/epochs
         */
        BlockExpirationDelay: PlainDescriptor<number>;
        /**
         * Babe requests expire and can be purged from storage after this many blocks/epochs
         */
        EpochExpirationDelay: PlainDescriptor<bigint>;
    };
    BridgeKusamaGrandpa: {
        /**
         * Maximal number of "free" header transactions per block.
         *
         * To be able to track the bridged chain, the pallet requires all headers that are
         * changing GRANDPA authorities set at the bridged chain (we call them mandatory).
         * So it is a common good deed to submit mandatory headers to the pallet.
         *
         * The pallet may be configured (see `[Self::FreeHeadersInterval]`) to import some
         * non-mandatory headers for free as well. It also may be treated as a common good
         * deed, because it may help to reduce bridge fees - this cost may be deducted from
         * bridge fees, paid by message senders.
         *
         * However, if the bridged chain gets compromised, its validators may generate as many
         * "free" headers as they want. And they may fill the whole block (at this chain) for
         * free. This constant limits number of calls that we may refund in a single block.
         * All calls above this limit are accepted, but are not refunded.
         */
        MaxFreeHeadersPerBlock: PlainDescriptor<number>;
        /**
         * The distance between bridged chain headers, that may be submitted for free. The
         * first free header is header number zero, the next one is header number
         * `FreeHeadersInterval::get()` or any of its descendant if that header has not
         * been submitted. In other words, interval between free headers should be at least
         * `FreeHeadersInterval`.
         */
        FreeHeadersInterval: PlainDescriptor<Anonymize<I4arjljr6dpflb>>;
        /**
         * Maximal number of finalized headers to keep in the storage.
         *
         * The setting is there to prevent growing the on-chain state indefinitely. Note
         * the setting does not relate to block numbers - we will simply keep as much items
         * in the storage, so it doesn't guarantee any fixed timeframe for finality headers.
         *
         * Incautious change of this constant may lead to orphan entries in the runtime storage.
         */
        HeadersToKeep: PlainDescriptor<number>;
    };
    BridgeKusamaParachains: {
        /**
         * Name of the original `paras` pallet in the `construct_runtime!()` call at the bridged
         * chain.
         *
         * Please keep in mind that this should be the name of the `runtime_parachains::paras`
         * pallet from polkadot repository, not the `pallet-bridge-parachains`.
         */
        ParasPalletName: PlainDescriptor<string>;
        /**
         * Maximal number of single parachain heads to keep in the storage.
         *
         * The setting is there to prevent growing the on-chain state indefinitely. Note
         * the setting does not relate to parachain block numbers - we will simply keep as much
         * items in the storage, so it doesn't guarantee any fixed timeframe for heads.
         *
         * Incautious change of this constant may lead to orphan entries in the runtime storage.
         */
        HeadsToKeep: PlainDescriptor<number>;
        /**
         * Maximal size (in bytes) of the SCALE-encoded parachain head data
         * (`bp_parachains::ParaStoredHeaderData`).
         *
         * Keep in mind that the size of any tracked parachain header data must not exceed this
         * value. So if you're going to track multiple parachains, one of which is using large
         * hashes, you shall choose this maximal value.
         *
         * There's no mandatory headers in this pallet, so it can't stall if there's some header
         * that exceeds this bound.
         */
        MaxParaHeadDataSize: PlainDescriptor<number>;
    };
    BridgeXcmOverMoonriver: {
        /**
         * Bridged network as relative location of bridged `GlobalConsensus`.
         */
        BridgedNetwork: PlainDescriptor<Anonymize<If9iqq7i64mur8>>;
        /**
         * Amount of this chain native tokens that is reserved on the sibling parachain account
         * when bridge open request is registered.
         */
        BridgeDeposit: PlainDescriptor<bigint>;
    };
};
type IViewFns = {};
type IRuntimeCalls = {
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
     * This runtime API is used to inform potential block authors whether they will
     * have the right to author at a slot, assuming they have claimed the slot.
     *
     * In particular, this API allows parachains to regulate their "unincluded segment",
     * which is the section of the head of the chain which has not yet been made available in the
     * relay chain.
     *
     * When the unincluded segment is short, parachains will allow authors to create multiple
     * blocks per slot in order to build a backlog. When it is saturated, this API will limit
     * the amount of blocks that can be created.
     */
    UnincludedSegmentApi: {
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
     * API for querying information about the finalized chain headers.
     *
     * This API is implemented by runtimes that are receiving messages from this chain, not by this
     * chain's runtime itself.
     */
    KusamaFinalityApi: {
        /**
         * Returns number and hash of the best finalized header known to the bridge module.
         */
        best_finalized: RuntimeDescriptor<[], Anonymize<I7gtb9g2qv4r10>>;
        /**
         * Returns free headers interval, if it is configured in the runtime.
         * The caller expects that if his transaction improves best known header
         * at least by the free_headers_interval`, it will be fee-free.
         *
         * See [`pallet_bridge_grandpa::Config::FreeHeadersInterval`] for details.
         */
        free_headers_interval: RuntimeDescriptor<[], Anonymize<I4arjljr6dpflb>>;
        /**
         * Returns the justifications accepted in the current block.
         */
        synced_headers_grandpa_info: RuntimeDescriptor<[], Anonymize<Ievrs91su783vi>>;
    };
    /**
     * API for querying information about the finalized chain headers.
     *
     * This API is implemented by runtimes that are receiving messages from this chain, not by this
     * chain's runtime itself.
     */
    MoonriverKusamaFinalityApi: {
        /**
         * Returns number and hash of the best finalized header known to the bridge module.
         */
        best_finalized: RuntimeDescriptor<[], Anonymize<I7gtb9g2qv4r10>>;
        /**
         * Returns free headers interval, if it is configured in the runtime.
         * The caller expects that if his transaction improves best known header
         * at least by the free_headers_interval`, it will be fee-free.
         *
         * See [`pallet_bridge_grandpa::Config::FreeHeadersInterval`] for details.
         */
        free_headers_interval: RuntimeDescriptor<[], Anonymize<I4arjljr6dpflb>>;
    };
    /**
     * Outbound message lane API for messages that are sent to this chain.
     *
     * This API is implemented by runtimes that are receiving messages from this chain, not by this
     * chain's runtime itself.
     */
    ToMoonriverKusamaOutboundLaneApi: {
        /**
         * Returns dispatch weight, encoded payload size and delivery+dispatch fee of all
         * messages in given inclusive range.
         *
         * If some (or all) messages are missing from the storage, they'll also will
         * be missing from the resulting vector. The vector is ordered by the nonce.
         */
        message_details: RuntimeDescriptor<[lane: FixedSizeBinary<32>, begin: bigint, end: bigint], Anonymize<I7uf2ofmdnm812>>;
    };
    /**
     * Inbound message lane API for messages sent by this chain.
     *
     * This API is implemented by runtimes that are receiving messages from this chain, not by this
     * chain's runtime itself.
     *
     * Entries of the resulting vector are matching entries of the `messages` vector. Entries of the
     * `messages` vector may (and need to) be read using `To<ThisChain>OutboundLaneApi::message_details`.
     */
    FromMoonriverKusamaInboundLaneApi: {
        /**
         * Return details of given inbound messages.
         */
        message_details: RuntimeDescriptor<[lane: FixedSizeBinary<32>, messages: Anonymize<I3r3poh6h8vl7n>], Anonymize<I74b5o27m5tpv>>;
    };
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
     * The `BlockBuilder` api trait that provides the required functionality for building a block.
     */
    BlockBuilder: {
        /**
         * Apply the given extrinsic.
         *
         * Returns an inclusion outcome which specifies if this extrinsic is included in
         * this block or not.
         */
        apply_extrinsic: RuntimeDescriptor<[extrinsic: Binary], Anonymize<Io4aq6tvaqcc7>>;
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
     * The offchain worker api.
     */
    OffchainWorkerApi: {
        /**
         * Starts the off-chain task for given block header.
         */
        offchain_worker: RuntimeDescriptor<[header: Anonymize<Ic952bubvq4k7d>], undefined>;
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
     * The API to query account nonce.
     */
    AccountNonceApi: {
        /**
         * Get current account nonce of given `AccountId`.
         */
        account_nonce: RuntimeDescriptor<[account: HexString], number>;
    };
    /**
    
     */
    DebugRuntimeApi: {
        /**
        
         */
        trace_transaction: RuntimeDescriptor<[extrinsics: Anonymize<Itom7fk49o0c9>, transaction: Anonymize<I6fr2mqud652ga>, header: Anonymize<Ic952bubvq4k7d>], Anonymize<Id16ku1poe7q51>>;
        /**
        
         */
        trace_block: RuntimeDescriptor<[extrinsics: Anonymize<Itom7fk49o0c9>, known_transactions: Anonymize<Ic5m5lp1oioo8r>, header: Anonymize<Ic952bubvq4k7d>], Anonymize<Id16ku1poe7q51>>;
        /**
        
         */
        trace_call: RuntimeDescriptor<[header: Anonymize<Ic952bubvq4k7d>, from: FixedSizeBinary<20>, to: FixedSizeBinary<20>, data: Binary, value: Anonymize<I4totqt881mlti>, gas_limit: Anonymize<I4totqt881mlti>, max_fee_per_gas: Anonymize<Ic4rgfgksgmm3e>, max_priority_fee_per_gas: Anonymize<Ic4rgfgksgmm3e>, nonce: Anonymize<Ic4rgfgksgmm3e>, access_list: Anonymize<I3dj14b7k3rkm5>], Anonymize<Id16ku1poe7q51>>;
    };
    /**
    
     */
    TxPoolRuntimeApi: {
        /**
        
         */
        extrinsic_filter: RuntimeDescriptor<[xt_ready: Anonymize<Itom7fk49o0c9>, xt_future: Anonymize<Itom7fk49o0c9>], Anonymize<I2q8ltoai1r4og>>;
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
        call: RuntimeDescriptor<[from: FixedSizeBinary<20>, to: FixedSizeBinary<20>, data: Binary, value: Anonymize<I4totqt881mlti>, gas_limit: Anonymize<I4totqt881mlti>, max_fee_per_gas: Anonymize<Ic4rgfgksgmm3e>, max_priority_fee_per_gas: Anonymize<Ic4rgfgksgmm3e>, nonce: Anonymize<Ic4rgfgksgmm3e>, estimate: boolean, access_list: Anonymize<I3dj14b7k3rkm5>], Anonymize<I61suq2euu87ho>>;
        /**
        
         */
        create: RuntimeDescriptor<[from: FixedSizeBinary<20>, data: Binary, value: Anonymize<I4totqt881mlti>, gas_limit: Anonymize<I4totqt881mlti>, max_fee_per_gas: Anonymize<Ic4rgfgksgmm3e>, max_priority_fee_per_gas: Anonymize<Ic4rgfgksgmm3e>, nonce: Anonymize<Ic4rgfgksgmm3e>, estimate: boolean, access_list: Anonymize<I3dj14b7k3rkm5>], Anonymize<I7n8kbohflaod>>;
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
     * The runtime api used to predict whether a Nimbus author will be eligible in the given slot
     */
    NimbusApi: {
        /**
        
         */
        can_author: RuntimeDescriptor<[author: FixedSizeBinary<32>, relay_parent: number, parent_header: Anonymize<Ic952bubvq4k7d>], boolean>;
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
    
     */
    VrfApi: {
        /**
        
         */
        get_last_vrf_output: RuntimeDescriptor<[], Anonymize<I4s6vifaf8k998>>;
        /**
        
         */
        vrf_key_lookup: RuntimeDescriptor<[nimbus_id: FixedSizeBinary<32>], Anonymize<I4s6vifaf8k998>>;
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
        dry_run_call: RuntimeDescriptor<[origin: Anonymize<I194p56vr9l05u>, call: Anonymize<Iaqmpqm6nl9dad>, result_xcms_version: number], Anonymize<I5bgbhp433c8bl>>;
        /**
         * Dry run XCM program
         */
        dry_run_xcm: RuntimeDescriptor<[origin_location: XcmVersionedLocation, xcm: XcmVersionedXcm], Anonymize<Ifb4t7j7sn57m4>>;
    };
    /**
     * API for useful conversions between XCM `Location` and `AccountId`.
     */
    LocationToAccountApi: {
        /**
         * Converts `Location` to `AccountId`.
         */
        convert_location: RuntimeDescriptor<[location: XcmVersionedLocation], Anonymize<I81ojrtgkds5sl>>;
    };
};
type IAsset = PlainDescriptor<void>;
export type MoonbeamDispatchError = Anonymize<I68l22felg5oio>;
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
export type MoonbeamApis = ApisFromDef<IRuntimeCalls>;
export type MoonbeamQueries = QueryFromPalletsDef<PalletsTypedef>;
export type MoonbeamCalls = TxFromPalletsDef<PalletsTypedef>;
export type MoonbeamEvents = EventsFromPalletsDef<PalletsTypedef>;
export type MoonbeamErrors = ErrorsFromPalletsDef<PalletsTypedef>;
export type MoonbeamConstants = ConstFromPalletsDef<PalletsTypedef>;
export type MoonbeamViewFns = ViewFnsFromPalletsDef<PalletsTypedef>;
export type MoonbeamCallData = Anonymize<Iaqmpqm6nl9dad> & {
    value: {
        type: string;
    };
};
export type MoonbeamWhitelistEntry = PalletKey | ApiKey<IRuntimeCalls> | `query.${NestedKey<PalletsTypedef['__storage']>}` | `tx.${NestedKey<PalletsTypedef['__tx']>}` | `event.${NestedKey<PalletsTypedef['__event']>}` | `error.${NestedKey<PalletsTypedef['__error']>}` | `const.${NestedKey<PalletsTypedef['__const']>}` | `view.${NestedKey<PalletsTypedef['__view']>}`;
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
