import { StorageDescriptor, PlainDescriptor, TxDescriptor, RuntimeDescriptor, Enum, ApisFromDef, QueryFromPalletsDef, TxFromPalletsDef, EventsFromPalletsDef, ErrorsFromPalletsDef, ConstFromPalletsDef, ViewFnsFromPalletsDef, SS58String, FixedSizeBinary, Binary, FixedSizeArray } from "polkadot-api";
import { I5sesotjlssv2d, Iffmde3ekjedi9, I4mddgoa69c0a2, Ifv1hra9a1ej1o, I95g6i7ilua7lq, Ieniouoqkq4icf, Phase, Ibgl04rn6nbfm6, I4q39t5hn830vp, Iff9heri56m1mb, I1v7jbnil3tjns, I8jgj1nhcr2dg8, Ifn6q3equiq9qi, Ia3sb0vgvovhtg, Iav8k1edbj86k7, Itom7fk49o0c9, I4i91h98n3cv1b, I4iumukclgj8ej, Iqnbvitf7a7l3, I6r5cbv8ttrb09, Idkbvh6dahk1v7, Iepbsvlk3qceij, I1q8tnt1cluu5j, I8ds64oj6581v0, Ia7pdug7cdsg8g, Iapg7gbu5966ul, I9bin2jc70qt6q, TransactionPaymentReleases, Ia2lhg7l2hilo3, Ifvgo9568rpmqc, I82jm9g7pufuel, Ic5m5lp1oioo8r, I6cs1itejju2vv, I9sa8q0f4qa941, Ial6i7mt9utr8, I5ucuicjqgd7dh, I45jh0r7cgpsjj, I69mra87kqkj6d, Ififtooll71avi, Ifc31u3dkrqbco, Ifo10l87an05tl, I7svnfko10tq2e, Iffrjmlp7d020q, I5h9039rqpeali, ConvictionVotingVoteVoting, I6ouflveob4eli, If9jidduiuq7vv, Ias3agfr1nmpr3, Icgljjb6j82uhn, Ib77b0fp1a6mjr, I5g2vv0ckl2m8b, Ifup3lg9ro8a0f, I5qfubnuvrnqn6, I8t3u2dv73ahbd, I7vlvrrl2pnbgk, Ie0rpl5bahldfk, XcmPalletVersionMigrationStage, I7e5oaj2qi4kl1, Ie849h3gncgvok, Iat62vud7hlod2, Ict03eedr8de9s, Ici7ejds60vj52, XcmVersionedLocation, Idh2ug6ou4a8og, Iejeo53sea6n4q, I53esa2ms463bk, Ib4jhb8tt3uung, I76ljmosd7jlii, I56u24ncejr5kt, I9jd27rnpm8ttv, Icfvb3a12856o5, I9p9lq3rej5bhc, Iag146hmjgqfgj, I8uo3fpd3bcc6f, I4ftk0glls7946, I910puuahutflf, I4nfjdef0ibh44, I74af64m08r6as, Ic8ann3kre6vdm, I1j72qfgdejqsv, I60biiepd74113, Ifble4juuml5ig, Version, Iegmj7n48sc3am, Ie9j1itogtv7p5, PreimageOldRequestStatus, PreimageRequestStatus, I4pact7n2e9a0i, Ic3l568el19b24, Ib0hfhkohlekcj, I32lgu058i52q9, Ie7atdsih6q14b, I4totqt881mlti, I7jidl7qnnq87c, I82cps8ng2jtug, Iebirugq1dbhv6, Icoe72r8pkf564, Ic02kut0350gb0, If21n82i0516em, I3ebs7dujjiusf, Iettgnma0t3a0g, Icu3qllmbdnj89, Idhafor8sovqeu, I84fmreorpmm3e, I3t5icadd1rvs1, I76qpl5pst2d4o, Ik66om7cc050c, I200n1ov5tbcvr, Iaa4kemhg4eh7v, I6sn46nd9sjbst, Idqnu98dduluv8, Ifm3n51g640vse, Ieitt970a26jef, I2gcf5pphcpi9h, Icctse4hug509d, I6ae21pstqk9et, I8pmg4u740mebc, Icsknfl0f6r973, I2j3o5sgk562ak, Ielgh4t8o7rcvt, I2q82ekqn8jp9r, If9iqq7i64mur8, Ievgjq5dn6rae7, I810b83nplvppm, Id6ihttoi261us, Id4hmbnsqek288, I3thiua0nporjs, I9v3gj6frc0u13, Iapmb49b0eddb4, I8d057oj36rajf, I2eq26k0hguoqq, Iadrpn9mhdu2rp, I7uhs5s0pidt2q, I4c0s5cioidn76, I6ge61lbhbulha, Ia88a8r9e89e2p, I4qitokr7lpmpu, I34jhssnacefoe, I65gcqchov0ds9, I9egg64gafs7r7, Idmnfldthdnj8h, I98pjho0jvtfaa, I69hlrlj6ggqgm, I7t012gg35hgm4, I1js2aelrc7fbg, Ib8nbo9p8dn6s1, Icq8st9st73vh1, I8pl16po8ngde, I4kcv5272ambf0, I970q50juj0l2, Ifpaals567gacp, Ilivuv1vkc02s, Ianombrc3en111, I1755v7kcv6nfl, I26t6htp1ghfm3, Iam3cim0m4gpdq, Ifm7mj15s63a8e, Ieqteqhnicu2mf, Ifptjqqj04qat7, I4os3q75qs0t9f, I93ot7g316idsl, I393gnb7kgq98v, Ifvilitm1tdmqi, I4bv41jk9n83m8, I2dbamvpq4935, Iarr20ag9rpg5c, I5o39ti65l0u4e, Ibrbnb4fv7rbdd, Iafqnechp3omqg, I3em9l2q88o7if, Imng78fk88871, Iec27c137mjssc, Ifbdrgce969o4a, I2dtppeq1iec09, Iefb7gficrner, I3gg47bgkgq9tr, Icoeje77srd9e5, Ibe2akds4krf80, I5m768sb1iam8f, I2uhe6v3aqlo79, If5lnhvjis90k, I22oifipsnuvk4, I42jj1su7asrm9, I3udg9qslb775f, I6kqftg4r08qah, Iavngg6vh7nl2j, Iao359lc45ru9s, I1ifiaqhtj7c9, I1i2kfunpgo63g, I6km05m2f6usv7, I9055m3udr8982, I92tce08cbhnmn, Ilqs3opgrh80o, Iamub7qfj1haap, Icj6nnp3j96bc6, Ickhdoqhl8bqbi, I8dlobfoa2kkke, I1hif5qruqj4v, I4r7b9kd9ea9vf, Ie3rr1ggdh7418, I9p3c3ohdngoau, In7a38730s6qs, If15el53dd76v9, I9s0ave7t0vnrk, I4fo08joqmcqnm, Ibafpkl9hhno69, XcmV5Junctions, Iasb8k6ash5mjn, I8ofcg5rbj0g2c, I4adgbll7gku4i, I6pjjpfvhvcfru, I9pj91mj79qekl, I39uah9nss64h9, Ik64dknsq7k08, Ib51vk42m1po4n, Idcr6u6361oad9, I666bl2fqjkejo, I1u3ac7lafvv5b, I5teebeg0opib2, I60v7bikk54tpu, Ifpj261e8s63m3, Iba7pefg0d11kh, I2pjehun5ehh5i, Ibou4u1engb441, Id6nbvqoqdj4o2, I95iqep3b8snn9, I65i612een2ak, I5vvf47ira6s09, I5ns79ftlq8cnl, I59ofijoau4bjh, Ibmr18suc9ikh9, Ieka2e164ntfss, I5u8olqbbvfnvf, I5utcetro501ir, I81vt5eq60l4b6, I6m4od67mjs4l8, I19e29tp35ff1j, Idhlknhp7vndhp, I3vh014cqgmrfd, I4vasl07tasls, I98vh5ccjtf1ev, I6imgsrdabjjdm, Ievnk06j48hi6e, Ibrbas2gu3j75d, I4b66js88p45m8, If353osofrqjga, Id7ht3qmm0pmas, Ieinuidojqh902, I6ec8i49vphpbo, I78tmt4lg2noo1, Ifj50lknlp6i9t, Icolvgjhpn5o0s, Idnsr2pndm36h0, Iam6m7eerh6h6v, I8steo882k7qns, Ic8m623qbgr5mp, I5f178ab6b89t3, Ieg7p9mojce0qk, Ib9pt0t7gno7q4, Icbio0e1f0034b, I8c0vkqjjipnuj, I1adbcfi5uc62r, Ibf6ucefn8fh49, I7v5c9tuldh45d, Ia5cotcvi888ln, I21jsa919m88fd, Iegif7m3upfe1k, I9kt8c221c83ln, Ic76kfh5ebqkpl, Icscpmubum33bq, I21d2olof7eb60, Ibgm4rnf22lal1, Ie68np0vpihith, I9bnv6lu0crf1q, Iauhjqifrdklq7, Ie1uso9m8rt5cf, I40pqum1mu8qg3, I1r4c2ghbtvjuc, If9h84vop1ud2e, I95iqinn1v9f4s, Iefva374rimroe, I9sf1boihdee4o, Ib3il1re0kddul, I3q1qmerq329s7, I5n4sebgkfr760, I6eg824e6fjb9c, Ifs1i5fk9cqvr6, I7qjbmfe885ov4, I373fom61ldpl, Ieg3fd8p4pkt10, I8kg5ll427kfqq, I467333262q1l9, If9sbgppso3l3r, I36o7ps27f842k, Ie4ebalp1vm5ac, Iuqevbnrvdkd8, Idj9faf6hgsdur, I8mj1nm903hpts, I4h7mqkdp0u1ih, Ia69km3o2rblpi, I4kapheqtplrhh, Ideaemvoneh309, I3d9o9d7epp66v, I6lqh1vgb4mcja, I73kffnn32g4c7, I2kds5jji7slh8, Ia9mkdf6l44shb, I9l2s4klu0831o, I2ctrt5nqb8o7c, I711qahikocb1c, Id6gojh30v9ib2, I9h4cqmadpj7l0, If31vrl50nund3, I29bkdd7n16li1, I9jb9hqm18runn, I85htvo8b885h, I13n219aci2a5j, Ialt2aiqe4ps5k, Ie5l999tf7t2te, I3usr0jpt8ovnk, I5a5fh6anhjgu7, I3atr9j3ums3m2, I2bvdo47pdo59f, I2okmh2c5ub01c, Ict9ivhr2c5hv0, I7fcl4aua07ato, Icm9m0qeemu66d, I6qq5nnbjegi8u, I82nfqfkd48n10, I1jm8m1rh9e20v, I3o5j3bli1pd8e, I13qib3vtm9cs3, Idcabvplu05lea, Id38gdpcotl637, I73q3qf5u7nnqg, Idpm1bc2cr6dgj, I6v8kghkt0dksl, Itmchvgqfl28g, I3a0noisblbb, Ifpfll8q52l7d8, I7d12t2s4nb6n, Imdvokfbpi0mt, I4fvf7id1oq611, Imgcatq9b2cl1, I302t0ook7k95n, If84l0hb2pbh5j, I7td476oj5kt2h, I1o4mqqd02b5sj, Id3v70nvrro0hv, I6msvbss3ktmnu, Ifbs87e8855hrh, Ibugemvm1fr87g, I11kqb3hb93c3c, Ici6p55173o3kg, Ib7tkro61h34d2, Ig5896f16psh3, Ibsib3ed5u1164, I6g1lhais855g9, I52cpe8da8o62l, I7h9e3cbrb3kaa, Ieaqa57prka9ld, Iedoc1ioirjto2, Idqd6j83jfa92q, I5nmhnue5h41rg, I8416p6oh7m35t, I1cj3vacp7n158, I739ltdlbnqckb, I5nk49fqq83rft, Ivalbtb85o2h0, Ic8hk838gccoml, I987mg4ok5pkoi, Ifbem5vkius10c, If3mej48mrh5qf, Ibn1504vropo5n, Icjrp0nj828ep4, I9e33amtaq58km, Ia85jfgnieg7o0, I4j50qh0n84qes, I92pum5p0t4pat, I50dt84l38nc68, I87diq5b0qic4c, I1j6hllalj2epr, I1d28k4v5qap3a, Iv901693moogd, I1n28f4ceil09b, Ieq8j5nmk3i7o0, Idocritbkcpmn3, I110m02ast38uc, I6l1cgblde3oca, Ib36ct6b1t9nk, Icmnhhde8qv456, Ibsdha57fv3ssk, I95h8ge6oaumen, I9gla6h44u54mh, I6dlum3cbrie3d, Idkdd97l7v4t7o, Iamlqp3gs21baf, I4qh6vjmbpl1a6, Ibanc56kjmq87v, I8c1fkgvmb93fs, I30ffpa0bknqur, Ifsksfqf7mb05t, I33nmjabk01dfi, I8sqvh22141fr8, I8vcp3s3t1r7ti, I94c4ugqtmf885, I5g2ic5lk6jvap, I6aqijved7jgk9, I962vs596sggoi, I8ln2e9k7mblim, I1pqjsjhm82q1i, I8rn283dnm6h0f, Ibu6i8jb58o30n, I8jm0ov76tih8s, Ic7aob2k1l1jfu, Iecuv9eudhio5i, Ieh9ab34fgqfvc, I2i20t4file901, Inp8hn3mu8c5j, I68o6mdp1r65np, Iaba972j3va7k, Iffj0b5herq802, I8ja7ceebpen3k, Icikcphjk1igug, Ibnl8raecejsmo, I1ufkvgdurghbk, I1q1g69il2fc15, I9ltv8jlv2map8, Idlhavidu7pq4f, I203ivdv9ll218, Id37b9l6bk2ii9, I58caqa2hcp37r, I9thv3jvjv8nr9, I5lkkn2erim0mo, Id57q643bc33er, I3tgr4mij0dq9t, Ic6tc8uub7lssk, I7dim4s22d4cc, I9adoavqh7j1qm, I2cnb8psb4ovvm, I3frfca3bu3qda, I6bbnnm10sc5a6, I1ecpbq2c6b4si, Ii1jr958aef3t, Ier970hnn9pgrj, I7ee2c04njh4lr, Ido82tngjj5jid, Ial5va0b0vs25o, Icm2mv7tlmp1c3, I821qafgn89idd, Icn7fuqv1aq0de, Ifift2upjktcjs, I4n73j5spt03js, Ibmoqhjadutned, Ieob0gouehce57, I8eo9r9va149i7, Iaeor8vejoqk4d, I6d2fsv919ackd, I65sao41nc2u5n, Idraqa5k2q8rna, Iclh6ip7gld2up, Iapol5cojcq8jr, Iarqih3rei93nj, Iadml5h1l6pdhd, I4q8h00pii12o3, I5odhhedphq5gh, Iej62b4o01n76s, Icni4v52b04265, I30l5icl49p3tp, I53fuja41j7ro, I6e7p4l5e6t7n6, Ib400dopju2fto, I1v5t6dj5g22i2, I7idb2fg10ips5, I7u9oegj4csj51, I6s65kicknm51n, Ifuaakr3i6qaje, I792urf76hgnm9, I7j4i782lpafvm, If6ndkvmfijbvo, I3tnke0lsl8p00, I9guvk97s8codm, In9igsl3fgg3q, I8lpggdq99dmfc, I5q1a9s86bsjba, If9ob1e8r14nrm, I8jbqjsr1ivn77, I9gel4bv68gacj, Icu8seopr711dn, Iddd2a11b8876r, I8bvk21lpmah75, I449n3riv6jbum, I72edo3nnc5ukn, I7m1ou0telopf8, I4r3lr1hp3q5vu, Ibqd4ibtu385pg, Id846uvbhv0ups, Iel8d6vl7kun8s, Ia5vm4875s01on, I1io386vc3pmlf, Idnoja8d5k0dtr, I95j99jsac0h95, Idti8pnde3jga2, Icu74rtf3kd9gd, I8v7akpi7cdcp5, I7826235520epg, I495l5qf52l5ch, Ibtoub2npklubb, Iaj42ghmtrj594, Iefli0cgm44m3b, Iaij9kantm3v0b, I8l8g9smisvqei, I2ce5d3bnbbfhi, Iasr6pj6shs0fl, Ifuh1k8nfv6s7l, Ict2ktlupdmfrm, Idghtot34d3hq8, I5uf09856s8hsn, If0uionjq98ocd, I2lb07lr6m4m1b, Ienmtmhvu9c5gc, I3qt1hgg4djhgb, I153e8dbo2i3pv, Ilat0prj8bnun, Ic9p67gsdqt1ro, I158shpkf1icfg, I2kudr318ju7fu, I3chmoe7ts2vks, I533e8jlem55p4, Iene1sabvs33in, I1j0vp2lik6fqa, Ifgt33ij9dem7c, Ibt8nqfprp1t99, Iap9nfjdhnmblj, Ie5efe5gkg0kqs, I5hb3jd6s8k4qo, I3jqe98jp6jqj5, Idea758kkrtvus, Id09aqt1ca773l, I3c63j6sh3evqn, I79cmnv5q6b3p, I7am60vl6fh2ak, Id4du8qeonl5uo, Ib73p6n69t2jsn, I69nisu7k9olcl, Ievk931u2c7sqn, Ie2jvm478jd2jv, Ibfeiifn3uif9a, I59ijflfqmnqm2, Ifor98fsce0gmh, Iok3ke9gllunv, I1dpf04lbh0g77, Iduuc186lvhgmv, Ieprlpg14vh08o, Ifvladst7gf7jp, I2vujg8u335g7a, Idle45vlbjmfo0, I38ao3jdscg8o5, I5kj7kli9hm86u, I8kr5s6u6ue9e7, I4c9kt1ip8g4lh, Ia82mnkmeo2rhc, I7pbnbt70rdp6m, Icbccs0ug47ilf, I855j4i3kr8ko1, I92lvnr2lhfkjg, Ia1u3jll6a06ae, Ic9g5lvl9iddc5, Idd7hd99u0ho0n, Iafscmv8tjf0ou, I100l07kaehdlp, I6gnbnvip5vvdi, If1co0pilmi7oq, Iae74gjak1qibn, I3escdojpj0551, Icv68aq8841478, Ic262ibdoec56a, Iflcfm9b6nlmdd, Ijrsf4mnp3eka, Id5fm4p8lj5qgi, I8tjvj9uq4b7hi, I4cbvqmqadhrea, I4fooe9dun9o0t, Ier2cke86dqbr2, I2hq50pu2kdjpo, I9acqruh7322g2, I68vefv6bi40pm, I2tar7hv83bhs9, I7m6jdbthkclds, Idcbd1egqu902f, I4b9s9ufqtqpag, I2prd76if4ekis, I8uo8rqvrpdign, Idn49754fsdtru, I680fmn7ufn665, I369fnsmd2kjhd, I2a4el6f8bntsn, Igut3khe172gn, I7oac900a2ho0o, I7bui4st6iq68m, I27psftcg9098g, Icuam3sm8vhog2, Ifjv4i6s7q1stt, Id1re1vndv0kab, Ie3dfke5vrt21s, Ibl3t1j4prdqji, I7j4m7a3pkvsf4, Id9sjif2ghpo08, I6fomjr8ghrs40, I8jjc8aeseo568, Ia48s8or178ack, I25jemnddpsl99, I2na29tt2afp0j, I9qfchhljqsjjl, I7kij8p9kchdjo, I229ijht536qdu, I62nte77gksm0f, I9cg2delv92pvq, Ilhp45uime5tp, I4f1hv034jf1dt, Iao0880t6bdk6t, I137t1cld92pod, Ia72eet39sf8j9, If8u5kl4h8070m, Ibmuil6p3vl83l, I7lul91g50ae87, Icl7nl1rfeog3i, I2uqmls7kcdnii, Idg69klialbkb8, I7r6b7145022pp, I30pg328m00nr3, Icmrn7bogp28cs, I7m9b5plj4h5ot, I9onhk772nfs4f, I3l6bnksrmt56r, Idh09k0l2pmdcg, I7uoiphbm0tj4r, I512p1n7qt24l8, I6s1nbislhk619, I3gghqnh2mj0is, I6iv852roh6t3h, I9oc2o6itbiopq, Ibeto40kl3r5j7, I1rvj4ubaplho0, Ia3uu7lqcc1q1i, I7crucfnonitkn, I7tmrp94r9sq4n, I559a3l6k1tuhi, Ia74hfkpnt69k4, Icdh3rm93onuu7, Ic8o3lkomig9pc, I5fbs546684p2n, Ia3c82eadg79bj, Ienusoeb625ftq, Ibtsa3docbr9el, I7svoh0vdq580e, I2ur0oeqg495j8, I8isvjsseb7fjo, I1bhd210c3phjj, Iep27ialq4a7o7, Iasu5jvoqr43mv, I2e077c652dip6, I5qolde99acmd1, I8gtde5abn1g9a, Iep1lmt6q3s6r3, I1fac16213rie2, Ifjt77oc391o43, Itvt1jsipv0lc, Ick3mveut33f44, I719lqkkbtikbl, Ie4intrc3n8jfu, I2rg5btjrsqec0, Ibdqerrooruuq9, I8u2ba9jeiu6q0, I7ieadb293k6b4, Ievr89968437gm, I8iksqi3eani0a, I16enopmju1p0q, I43kq8qudg7pq9, I76riseemre533, Ie5v6njpckr05b, I38bmcrmh852rk, I4hcillge8de5f, I8usdc6tg7829p, Iea4g5ovhnolus, Ifmc9boeeia623, I8363i1h1dgh0n, Ibqjgs3foip9fb, I1hgaklii9a5gl, I3d8ss06imalrs, I1452l7htqmdul, I5k7trgmhddpc9, Ifg1v23kle5pvs, Idog3297nuhubu, I7aphsup25pr8u, Id9ivc2gke7kda, I32sqi67deo8lb, I7dhoiqi8n693s, I1kmrn95024uj4, Ibianp5jdpolv7, I9e73asfoaqs2i, I9ugpnf3tjcb6b, Idg56vb718jpor, Icjttivfuq4kl0, I7aqqpfb5d3acb, I67tkv8m7b9as3, I53hhk4qo3m9a6, I73e059ch622rh, I8s0297rim8oc1, Ibanc5bru9o3gt, Ia9haecbvl560l, Ial9kpmfj9nsqr, I2ra3uepvk35si, I9ljfa9qc631nt, I1apjv9m70hqn0, I68i9mkj0i3heo, I6vqpfjes12rn2, I7qo7cp2e3aerl, I53bm5fak9v07m, If7o6tu2tbpm0f, I9cdaua1ufuf68, Ibd4ev4rmnpul7, Icr3t2kod9dj5d, I9b25mq8qrg0o8, I7c48q22j7l1q8, I3shlhcndrf1f0, Ic4lis4f2abd9o, I7fcree6lak6uv, I4ojmnsk1dchql, Icl5s4108hio7m, I93gagnlb9gm3u, Idn2ghub1o4i40, I37r4bdai8o9mp, Ij8p6ct1brfmo, I7utese4puubr9, I3qdgms9h4is9n, I8e477rrh15djf, I3nuinrik5mleq, I49iq2qck2mkkq, I2qaqth7uqvdf9, I7hgbfjfqur3o0, Id3k8o0e2cab51, Ib754le9rlkqse, I3pbnpd5raifhq, I18s38m9j5bg00, Ifgbhtfo78kca0, Iab17gup71picv, I2p503tvhr95gj, I9grg7g6ua578n, I6umd4hgu2puph, I44127qd8nvu47, I5tdcum59p9pac, I2dgahqu6ln4jl, I1hn8tvlbussv, I96on68vm4ih94, Idgas9g0pc3k9g, Iaevo3h2jsoemi, Iep8a74k7e6r72, Ib6t0ubljgp22u, I3rgoh4223434f, I2vfuukfl5d6al, I9ns66h5mcst21, I5ch6hqvso9cfc, I81p9lds919n0g, I87hura2cobcv1, I3lbtb6q8ittcg, I788n87nobc2o6, I99tkds5qdlj77, Ian267bdq9joaf, I91fa8tnsgpjgh, Iemo1133hhf28q, I8o6tg2fcd6krf, Iouj49kqoegp1, Ife8sj002g6s56, I400tsccl54f69, I7i2rquf9o1sc4, I41epceuu5tcos, I44sdvnu7uoqf6, I75rts6phosqgv, Id05qchr7uq1gj, Ibppp57f2thdnk, Ibjg5nv0nue710, Ic7bjpulvng8ff, I821hq5m5igcn, I1fd2u5ls04lpi, I55nu158c3eng2, I2d67dgvoue7rb, I2sfpbn9h49adg, Ib6jm3sbjvr41g, I32m7n87450pqk, Idmkbek876hj4c, I3096t0on20q3r, I1s5stmgs1hmpi, Im4b2ikida3i9, Ia6mtguicisar7, Ibm9jk932uhjiv, I4l0aflet4nrh2, I1d1m4pqd4gk9n, I9l001vgvntb06, I4n99li1ojr2lt, I11eppnh5mek19, I583v57rub6gg, I4jhonprkmaiu3, I9l30vpvn51jcs, Icglvublte8208, Iabmnrd4204mhc, I3r2vobfen6tu5, I2trdp5iask9k1, Ic72ofb1evmh8f, Ido7vo1b67803n, Iqdolbo3k85bf, I1s6n791iat49a, Icb87m5nbt8smg, Im1pm2vf6llcn, I21jsoeb0o6476, Ier6ck0tpfo7, Ic6ecdcp9ut7jd, I27notaksll8qt, I54dj4621btbog, I8eeivtdimg5sg, I2i1mj9dta3f5r, Ie26sa5pkqc7lh, I5a9b1h9uneb16, It3rcku7atiln, I2e6ar36i5p9qo, Ifssptimng3fig, I2d4kqt7h8dvva, I6ou90sd9g7cje, I3dqh1v95db76q, Iec84e3i3f9e7f, Id99ueqaguc9dv, I931cottvong90, I4km0f35j8vt1e, I1u6hbnc76ae0b, Ie0lvd1qdm103, Ib3hb8lrtttf9v, Iet09kgtjdhfi9, Ierak47ctqnjrn, I5ca2goaq3h8bs, I10r7il4gvbcae, I82kd33a80644k, Ibnls8eh7606j5, I2jen5a002vjo5, I7gtc6jb6l82np, I95l2k9b1re95f, Icj4504vnoorlb, Iedc2b32l00pnc, Ifrnnpj83g127a, I1eml7ojrir0mf, I9ah39ggsni5h8, I64s470272rog7, Ifq40td50oojcr, I4pgd6mkjk426o, I98hpr879arfv5, I7rjrrm2njpd6g, Ielfbmscl7ukmv, I673slhfrj1s4r, Iedejl9np3oh6e, I59j15t8ardoqh, Id5kb2ocrab7gs, Ie0kb5p5oqesib, Ic8tdmoaknl87u, I1iscme8538ekh, Ia9at2kloifkm, Ibe6clpska8jpe, Ic5ic29aibpkll, I6v3aulqfb3eps, I3o2122ij3mdp9, Idu9ifj08mb2m9, I1rrnio7jcs0u8, Iat73h6pu514au, I5lh65scrfj49b, I6v46ileea69h8, I8sdd7udi8ebmk, Ifldp5atp2n26t, I3hd4vted81pma, TransactionValidityTransactionSource, I9ask1o4tfvcvs, Iaqet9jc3ihboe, Ic952bubvq4k7d, I2v50gu3s1aqk6, Ifvjmhsdtkl8pc, If7uv525tdvv7a, I2an1fs2eiebjp, If08sfhqn8ujfr, Ic4rgfgksgmm3e, I3dj14b7k3rkm5, Ic5egmm215ml6k, Iaouq7pgukugju, I4u44goi3tb79g, I5fvdd841odbi3, I35vouom6s9r2, Ie6kgk6f04rsvk, Ifgqf2rskq94om, Ie30stbbeaul1o, I4arjljr6dpflb, I7aold6s47n103, Ibjuap2vk03rp6, Ihfphjolmsqq1, Idh5kbd0b4k677, I8aqlkvv092ag5, Iabpgqcjikia83, I35p85j063s0il, Icad0fteo3kki0, Idh09c22dpqo2s, I67smi4kj2jg4u, I6spmpef2c7svf, Iei2mvq0mjvt81, Icerf8h8pdu8ss, Ic1d4u2opv3fst, Iftvbctbo05fu4, XcmVersionedXcm, Ic0c3req3mlc1l, XcmVersionedAssetId, I7ocn4njqde3v5, Iek7ha36da9mf5, Ifohkba1aph7uu, I92ov8h8197b4h, I5tl4ceupnessr, Ib2lgkapsudh06, Ieh6nis3hdbtgi, I42esqb0jrl6ka, I5vv5n03oo8gas, I1lb0fd61s4rqa, I4jpedvba08hch, I52umdgcif5b75, Ie9sr1iqcg3cgm, I1mqgk2tmnn9i2, I6lr8sctk0bi4e, I46mg5gru1rk0a } from "./common-types";
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
        Events: StorageDescriptor<[], Anonymize<Ifv1hra9a1ej1o>, false, never>;
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
        /**
         * The weight reclaimed for the extrinsic.
         *
         * This information is available until the end of the extrinsic execution.
         * More precisely this information is removed in `note_applied_extrinsic`.
         *
         * Logic doing some post dispatch weight reduction must update this storage to avoid duplicate
         * reduction.
         */
        ExtrinsicWeightReclaimed: StorageDescriptor<[], Anonymize<I4q39t5hn830vp>, false, never>;
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
    Indices: {
        /**
         * The lookup from index to account.
         */
        Accounts: StorageDescriptor<[Key: number], Anonymize<Iff9heri56m1mb>, true, never>;
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
        Holds: StorageDescriptor<[Key: SS58String], Anonymize<Iapg7gbu5966ul>, false, never>;
        /**
         * Freeze locks on account balances.
         */
        Freezes: StorageDescriptor<[Key: SS58String], Anonymize<I9bin2jc70qt6q>, false, never>;
    };
    TransactionPayment: {
        /**
        
         */
        NextFeeMultiplier: StorageDescriptor<[], bigint, false, never>;
        /**
        
         */
        StorageVersion: StorageDescriptor<[], TransactionPaymentReleases, false, never>;
    };
    Authorship: {
        /**
         * Author of current block.
         */
        Author: StorageDescriptor<[], SS58String, true, never>;
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
        DisabledValidators: StorageDescriptor<[], Anonymize<I95g6i7ilua7lq>, false, never>;
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
         * Current relay chain slot paired with a number of authored blocks.
         *
         * This is updated in [`FixedVelocityConsensusHook::on_state_proof`] with the current relay
         * chain slot as provided by the relay chain state proof.
         */
        RelaySlotInfo: StorageDescriptor<[], Anonymize<I6cs1itejju2vv>, true, never>;
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
         * Parachain bond config info { account, percent_of_inflation }
         */
        ParachainBondInfo: StorageDescriptor<[], Anonymize<I9sa8q0f4qa941>, false, never>;
        /**
         * Current round index and next round scheduled transition
         */
        Round: StorageDescriptor<[], Anonymize<Ial6i7mt9utr8>, false, never>;
        /**
         * Get delegator state associated with an account if account is delegating else None
         */
        DelegatorState: StorageDescriptor<[Key: SS58String], Anonymize<I5ucuicjqgd7dh>, true, never>;
        /**
         * Get collator candidate info associated with an account if account is candidate else None
         */
        CandidateInfo: StorageDescriptor<[Key: SS58String], Anonymize<I45jh0r7cgpsjj>, true, never>;
        /**
         * Stores outstanding delegation requests per collator.
         */
        DelegationScheduledRequests: StorageDescriptor<[Key: SS58String], Anonymize<I69mra87kqkj6d>, false, never>;
        /**
         * Top delegations for collator candidate
         */
        TopDelegations: StorageDescriptor<[Key: SS58String], Anonymize<Ififtooll71avi>, true, never>;
        /**
         * Bottom delegations for collator candidate
         */
        BottomDelegations: StorageDescriptor<[Key: SS58String], Anonymize<Ififtooll71avi>, true, never>;
        /**
         * The collator candidates selected for the current round
         */
        SelectedCandidates: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * Total capital locked by this staking pallet
         */
        Total: StorageDescriptor<[], bigint, false, never>;
        /**
         * The pool of collator candidates, each with their total backing stake
         */
        CandidatePool: StorageDescriptor<[], Anonymize<Ifc31u3dkrqbco>, false, never>;
        /**
         * Snapshot of collator delegation stake at the start of the round
         */
        AtStake: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<Ifo10l87an05tl>, false, never>;
        /**
         * Delayed payouts
         */
        DelayedPayouts: StorageDescriptor<[Key: number], Anonymize<Iffrjmlp7d020q>, true, never>;
        /**
         * Total counted stake for selected candidates in the round
         */
        Staked: StorageDescriptor<[Key: number], bigint, false, never>;
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
        AwardedPts: StorageDescriptor<Anonymize<I7svnfko10tq2e>, number, false, never>;
    };
    ConvictionVoting: {
        /**
         * All voting for a particular voter in a particular voting class. We store the balance for the
         * number of votes that we have recorded.
         */
        VotingFor: StorageDescriptor<Anonymize<I6ouflveob4eli>, ConvictionVotingVoteVoting, false, never>;
        /**
         * The voting classes which have a non-zero lock requirement and the lock amounts which they
         * require. The actual amount locked on behalf of this pallet should always be the maximum of
         * this list.
         */
        ClassLocksFor: StorageDescriptor<[Key: SS58String], Anonymize<If9jidduiuq7vv>, false, never>;
    };
    Referenda: {
        /**
         * The next free referendum index, aka the number of referenda started so far.
         */
        ReferendumCount: StorageDescriptor<[], number, false, never>;
        /**
         * Information concerning any given referendum.
         */
        ReferendumInfoFor: StorageDescriptor<[Key: number], Anonymize<Ias3agfr1nmpr3>, true, never>;
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
        /**
         * Map of authorized aliasers of local origins. Each local location can authorize a list of
         * other locations to alias into it. Each aliaser is only valid until its inner `expiry`
         * block number.
         */
        AuthorizedAliases: StorageDescriptor<[Key: XcmVersionedLocation], Anonymize<Ici7ejds60vj52>, true, never>;
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
    Scheduler: {
        /**
         * Block number at which the agenda began incomplete execution.
         */
        IncompleteSince: StorageDescriptor<[], number, true, never>;
        /**
         * Items to be executed, indexed by the block number that they should be executed on.
         */
        Agenda: StorageDescriptor<[Key: number], Anonymize<I76ljmosd7jlii>, false, never>;
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
    Proxy: {
        /**
         * The set of account proxies. Maps the account which has delegated to the accounts
         * which are being delegated to, together with the amount held on deposit.
         */
        Proxies: StorageDescriptor<[Key: SS58String], Anonymize<Icfvb3a12856o5>, false, never>;
        /**
         * The announcements made by the proxy (key).
         */
        Announcements: StorageDescriptor<[Key: SS58String], Anonymize<I9p9lq3rej5bhc>, false, never>;
    };
    Multisig: {
        /**
         * The set of open multisig operations.
         */
        Multisigs: StorageDescriptor<Anonymize<I8uo3fpd3bcc6f>, Anonymize<Iag146hmjgqfgj>, true, never>;
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
    Vesting: {
        /**
         * Start at
         */
        VestingStartAt: StorageDescriptor<[], number, true, never>;
        /**
         * Cliff vesting
         */
        Cliff: StorageDescriptor<[Key: SS58String], number, true, never>;
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
        Proposals: StorageDescriptor<[Key: number], Anonymize<Iegmj7n48sc3am>, true, never>;
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
        Spends: StorageDescriptor<[Key: number], Anonymize<Ie9j1itogtv7p5>, true, never>;
        /**
         * The blocknumber for the last triggered spend period.
         */
        LastSpendPeriod: StorageDescriptor<[], number, true, never>;
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
    Ethereum: {
        /**
         * Mapping from transaction index to transaction in the current building block.
         */
        Pending: StorageDescriptor<[Key: number], Anonymize<Ic3l568el19b24>, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForPending: StorageDescriptor<[], number, false, never>;
        /**
         * The current Ethereum block.
         */
        CurrentBlock: StorageDescriptor<[], Anonymize<Ib0hfhkohlekcj>, true, never>;
        /**
         * The current Ethereum receipts.
         */
        CurrentReceipts: StorageDescriptor<[], Anonymize<I32lgu058i52q9>, true, never>;
        /**
         * The current transaction statuses.
         */
        CurrentTransactionStatuses: StorageDescriptor<[], Anonymize<Ie7atdsih6q14b>, true, never>;
        /**
        
         */
        BlockHash: StorageDescriptor<[Key: Anonymize<I4totqt881mlti>], FixedSizeBinary<32>, false, never>;
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
    EVMChainId: {
        /**
         * The EVM chain ID.
         */
        ChainId: StorageDescriptor<[], bigint, false, never>;
    };
    DynamicFee: {
        /**
        
         */
        MinGasPrice: StorageDescriptor<[], Anonymize<I4totqt881mlti>, false, never>;
        /**
        
         */
        TargetMinGasPrice: StorageDescriptor<[], Anonymize<I4totqt881mlti>, true, never>;
    };
    EVMAccounts: {
        /**
         * Maps an EVM address to the last 12 bytes of a substrate account.
         */
        AccountExtension: StorageDescriptor<[Key: FixedSizeBinary<20>], FixedSizeBinary<12>, true, never>;
        /**
         * Whitelisted addresses that are allowed to deploy smart contracts.
         */
        ContractDeployer: StorageDescriptor<[Key: FixedSizeBinary<20>], null, true, never>;
    };
    Tokens: {
        /**
         * The total issuance of a token type.
         */
        TotalIssuance: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * Any liquidity locks of a token type under an account.
         * NOTE: Should only be accessed when setting, changing and freeing a lock.
         */
        Locks: StorageDescriptor<Anonymize<Icoe72r8pkf564>, Anonymize<Ia7pdug7cdsg8g>, false, never>;
        /**
         * The balance of a token type under an account.
         *
         * NOTE: If the total is ever zero, decrease account ref account.
         *
         * NOTE: This is only used in the case that this module is used to store
         * balances.
         */
        Accounts: StorageDescriptor<Anonymize<Icoe72r8pkf564>, Anonymize<Ic02kut0350gb0>, false, never>;
        /**
         * Named reserves on some account balances.
         */
        Reserves: StorageDescriptor<Anonymize<Icoe72r8pkf564>, Anonymize<Ia7pdug7cdsg8g>, false, never>;
    };
    UnknownTokens: {
        /**
         * Concrete fungible balances under a given location and a concrete
         * fungible id.
         *
         * double_map: who, asset_id => u128
         */
        ConcreteFungibleBalances: StorageDescriptor<Anonymize<If21n82i0516em>, bigint, false, never>;
        /**
         * Abstract fungible balances under a given location and a abstract
         * fungible id.
         *
         * double_map: who, asset_id => u128
         */
        AbstractFungibleBalances: StorageDescriptor<Anonymize<I3ebs7dujjiusf>, bigint, false, never>;
    };
    ZenlinkProtocol: {
        /**
         * Foreign foreign storage
         * The number of units of assets held by any given account.
         */
        ForeignLedger: StorageDescriptor<[Key: Anonymize<Iettgnma0t3a0g>], bigint, false, never>;
        /**
         * TWOX-NOTE: `AssetId` is trusted, so this is safe.
         */
        ForeignMeta: StorageDescriptor<[Key: Anonymize<Icu3qllmbdnj89>], bigint, false, never>;
        /**
        
         */
        ForeignList: StorageDescriptor<[], Anonymize<Idhafor8sovqeu>, false, never>;
        /**
         * Refer: https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L88
         * Last unliquidated protocol fee;
         */
        KLast: StorageDescriptor<[Key: Anonymize<I84fmreorpmm3e>], Anonymize<I4totqt881mlti>, false, never>;
        /**
         * (Option<fee_receiver>, fee_point)
         */
        FeeMeta: StorageDescriptor<[], Anonymize<I3t5icadd1rvs1>, false, never>;
        /**
         * AssetId => fee_receiver
         */
        FeeReceiver: StorageDescriptor<[Key: Anonymize<Icu3qllmbdnj89>], SS58String, true, never>;
        /**
        
         */
        LiquidityPairs: StorageDescriptor<[Key: Anonymize<I84fmreorpmm3e>], Anonymize<I76qpl5pst2d4o>, false, never>;
        /**
         * (T::AssetId, T::AssetId) -> PairStatus
         */
        PairStatuses: StorageDescriptor<[Key: Anonymize<I84fmreorpmm3e>], Anonymize<Ik66om7cc050c>, false, never>;
        /**
        
         */
        BootstrapPersonalSupply: StorageDescriptor<[Key: Anonymize<Iaa4kemhg4eh7v>], Anonymize<I200n1ov5tbcvr>, false, never>;
        /**
         * End status of bootstrap
         *
         * BootstrapEndStatus: map bootstrap pair => pairStatus
         */
        BootstrapEndStatus: StorageDescriptor<[Key: Anonymize<I84fmreorpmm3e>], Anonymize<Ik66om7cc050c>, false, never>;
        /**
        
         */
        BootstrapRewards: StorageDescriptor<[Key: Anonymize<I84fmreorpmm3e>], Anonymize<I6sn46nd9sjbst>, false, never>;
        /**
        
         */
        BootstrapLimits: StorageDescriptor<[Key: Anonymize<I84fmreorpmm3e>], Anonymize<I6sn46nd9sjbst>, false, never>;
    };
    Ismp: {
        /**
         * Holds a map of state machine heights to their verified state commitments. These state
         * commitments end up here after they are successfully verified by a `ConsensusClient`
         */
        StateCommitments: StorageDescriptor<[Key: Anonymize<Ifm3n51g640vse>], Anonymize<Idqnu98dduluv8>, true, never>;
        /**
         * Holds a map of consensus state identifiers to their consensus state.
         */
        ConsensusStates: StorageDescriptor<[Key: FixedSizeBinary<4>], Binary, true, never>;
        /**
         * A mapping of consensus state identifier to it's associated consensus client identifier
         */
        ConsensusStateClient: StorageDescriptor<[Key: FixedSizeBinary<4>], FixedSizeBinary<4>, true, never>;
        /**
         * A mapping of consensus state identifiers to their unbonding periods
         */
        UnbondingPeriod: StorageDescriptor<[Key: FixedSizeBinary<4>], bigint, true, never>;
        /**
         * A mapping of state machine Ids to their challenge periods
         */
        ChallengePeriod: StorageDescriptor<[Key: Anonymize<Ieitt970a26jef>], bigint, true, never>;
        /**
         * Holds a map of consensus clients frozen due to byzantine
         * behaviour
         */
        FrozenConsensusClients: StorageDescriptor<[Key: FixedSizeBinary<4>], boolean, false, never>;
        /**
         * The latest verified height for a state machine
         */
        LatestStateMachineHeight: StorageDescriptor<[Key: Anonymize<Ieitt970a26jef>], bigint, true, never>;
        /**
         * The previous verified height for a state machine
         */
        PreviousStateMachineHeight: StorageDescriptor<[Key: Anonymize<Ieitt970a26jef>], bigint, true, never>;
        /**
         * Holds the timestamp at which a consensus client was recently updated.
         * Used in ensuring that the configured challenge period elapses.
         */
        ConsensusClientUpdateTime: StorageDescriptor<[Key: FixedSizeBinary<4>], bigint, true, never>;
        /**
         * Holds the timestamp at which a state machine height was updated.
         * Used in ensuring that the configured challenge period elapses.
         */
        StateMachineUpdateTime: StorageDescriptor<[Key: Anonymize<Ifm3n51g640vse>], bigint, true, never>;
        /**
         * Tracks requests that have been responded to
         * The key is the request commitment
         */
        Responded: StorageDescriptor<[Key: FixedSizeBinary<32>], boolean, false, never>;
        /**
         * Latest nonce for messages sent from this chain
         */
        Nonce: StorageDescriptor<[], bigint, false, never>;
        /**
         * The child trie root of messages
         */
        ChildTrieRoot: StorageDescriptor<[], FixedSizeBinary<32>, false, never>;
    };
    IsmpParachain: {
        /**
         * Mapping of relay chain heights to it's state commitment. The state commitment of the parent
         * relay block is inserted at every block in `on_finalize`. This commitment is gotten from
         * parachain-system.
         */
        RelayChainStateCommitments: StorageDescriptor<[Key: number], FixedSizeBinary<32>, true, never>;
        /**
         * Tracks whether we've already seen the `update_parachain_consensus` inherent
         */
        ConsensusUpdated: StorageDescriptor<[], boolean, true, never>;
        /**
         * List of parachains that this state machine is interested in.
         */
        Parachains: StorageDescriptor<[Key: number], bigint, true, never>;
    };
    Hyperbridge: {
        /**
         * The host parameters of the pallet-hyperbridge.
         */
        HostParams: StorageDescriptor<[], Anonymize<I2gcf5pphcpi9h>, false, never>;
    };
    TokenGateway: {
        /**
         * Assets supported by this instance of token gateway
         * A map of the local asset id to the token gateway asset id
         */
        SupportedAssets: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], FixedSizeBinary<32>, true, never>;
        /**
         * Assets that originate from this chain
         */
        NativeAssets: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], boolean, false, never>;
        /**
         * Assets supported by this instance of token gateway
         * A map of the token gateway asset id to the local asset id
         */
        LocalAssets: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<Iebirugq1dbhv6>, true, never>;
        /**
         * The decimals used by the EVM counterpart of this asset
         */
        Decimals: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], number, true, never>;
        /**
         * The token gateway adresses on different chains
         */
        TokenGatewayAddresses: StorageDescriptor<[Key: Anonymize<Icctse4hug509d>], Binary, true, never>;
        /**
         * The whitelist adresses on different chains
         */
        WhitelistAddresses: StorageDescriptor<[Key: Anonymize<Icctse4hug509d>], Anonymize<Itom7fk49o0c9>, false, never>;
    };
    FlexibleFee: {
        /**
         * Universal fee currency order list for all users
         */
        UniversalFeeCurrencyOrderList: StorageDescriptor<[], Anonymize<I6ae21pstqk9et>, false, never>;
        /**
         * User default fee currency, if set, will be used as the first fee currency, and then use the
         * universal fee currency order list
         */
        UserDefaultFeeCurrency: StorageDescriptor<[Key: SS58String], Anonymize<Iebirugq1dbhv6>, true, never>;
        /**
         * Extra fee by call
         */
        ExtraFeeByCall: StorageDescriptor<[Key: Binary], Anonymize<I8pmg4u740mebc>, true, never>;
    };
    Salp: {
        /**
         * Multisig confirm account
         */
        MultisigConfirmAccount: StorageDescriptor<[], SS58String, true, never>;
        /**
         * Tracker for the next available fund index
         */
        CurrentTrieIndex: StorageDescriptor<[], number, false, never>;
        /**
         * Tracker for the next nonce index
         */
        CurrentNonce: StorageDescriptor<[Key: number], number, false, never>;
        /**
         * Record contribution
         */
        QueryIdContributionInfo: StorageDescriptor<[Key: bigint], Anonymize<Icsknfl0f6r973>, true, never>;
        /**
         * Info on all of the funds.
         */
        Funds: StorageDescriptor<[Key: number], Anonymize<I2j3o5sgk562ak>, false, never>;
        /**
         * The balance can be redeemed to users.
         */
        RedeemPool: StorageDescriptor<[], bigint, false, never>;
        /**
        
         */
        FailedFundsToRefund: StorageDescriptor<Anonymize<Ielgh4t8o7rcvt>, Anonymize<I2j3o5sgk562ak>, false, never>;
        /**
        
         */
        ReserveInfos: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<I2q82ekqn8jp9r>, false, never>;
    };
    AssetRegistry: {
        /**
         * Next available Foreign AssetId ID.
         *
         * NextForeignAssetId: ForeignAssetId
         */
        NextForeignAssetId: StorageDescriptor<[], number, false, never>;
        /**
         * Next available TokenId ID.
         *
         * NextTokenId: TokenId
         */
        NextTokenId: StorageDescriptor<[], number, false, never>;
        /**
         * The storages for Locations.
         *
         * CurrencyIdToLocations: map CurrencyId => Option<Location>
         */
        CurrencyIdToLocations: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<If9iqq7i64mur8>, true, never>;
        /**
         * The storages for CurrencyIds.
         *
         * LocationToCurrencyIds: map Location => Option<CurrencyId>
         */
        LocationToCurrencyIds: StorageDescriptor<[Key: Anonymize<If9iqq7i64mur8>], Anonymize<Iebirugq1dbhv6>, true, never>;
        /**
        
         */
        CurrencyIdToWeights: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I4q39t5hn830vp>, true, never>;
        /**
         * The storages for AssetMetadatas.
         *
         * AssetMetadatas: map AssetIds => Option<AssetMetadata>
         */
        AssetMetadatas: StorageDescriptor<[Key: Anonymize<I810b83nplvppm>], Anonymize<Ievgjq5dn6rae7>, true, never>;
        /**
         * The storages for AssetMetadata.
         *
         * CurrencyMetadatas: map CurrencyId => Option<AssetMetadata>
         */
        CurrencyMetadatas: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Ievgjq5dn6rae7>, true, never>;
    };
    VtokenMinting: {
        /**
         * The mint fee and redeem fee.
         */
        Fees: StorageDescriptor<[], Anonymize<I9jd27rnpm8ttv>, false, never>;
        /**
         * Token pool amount
         */
        TokenPool: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * Unlock duration for each currency
         */
        UnlockDuration: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Id6ihttoi261us>, true, never>;
        /**
         * Ongoing time unit for each currency
         */
        OngoingTimeUnit: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Id6ihttoi261us>, true, never>;
        /**
         * Minimum mint amount for each currency
         */
        MinimumMint: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * Minimum redeem amount for each currency
         */
        MinimumRedeem: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * Next unlock id for each currency
         */
        TokenUnlockNextId: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], number, false, never>;
        /**
         * According to currency_id and unlock_id, unlock information are stored.
         */
        TokenUnlockLedger: StorageDescriptor<Anonymize<I3thiua0nporjs>, Anonymize<Id4hmbnsqek288>, true, never>;
        /**
         * According to the user's account, the locked amount and unlock id list are stored.
         */
        UserUnlockLedger: StorageDescriptor<Anonymize<Icoe72r8pkf564>, Anonymize<I9v3gj6frc0u13>, true, never>;
        /**
         * The total amount of tokens that are currently locked for unlocking.
         */
        TimeUnitUnlockLedger: StorageDescriptor<Anonymize<I8d057oj36rajf>, Anonymize<Iapmb49b0eddb4>, true, never>;
        /**
         * The total amount of tokens that are currently locked for rebonding.
         */
        TokenToRebond: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, true, never>;
        /**
         * The min time unit for each currency
         */
        MinTimeUnit: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Id6ihttoi261us>, false, never>;
        /**
         * The total amount of tokens that are currently unlocking.
         */
        UnlockingTotal: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * VToken issuance for exchange rate calculation
         * This tracks the actual vtoken issuance that should be used for rate calculation
         * to avoid issues when vtokens are burned on Bifrost chain
         */
        VtokenIssuance: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * The hook iteration limit
         */
        HookIterationLimit: StorageDescriptor<[], number, false, never>;
        /**
        
         */
        SupportedEth: StorageDescriptor<[], Anonymize<I6ae21pstqk9et>, false, never>;
        /**
         * Next unlock id for all ETH tokens in SupportedEth list
         */
        EthUnlockNextId: StorageDescriptor<[], number, false, never>;
        /**
        
         */
        MintWithLockBlocks: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], number, true, never>;
        /**
        
         */
        VtokenIncentiveCoef: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, true, never>;
        /**
        
         */
        VtokenLockLedger: StorageDescriptor<Anonymize<Icoe72r8pkf564>, Anonymize<I2eq26k0hguoqq>, true, never>;
    };
    Slp: {
        /**
         * One operate origin(can be a multisig account) for a currency. An operating origins are
         * normal account in Bifrost chain.
         */
        OperateOrigins: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], SS58String, true, never>;
        /**
         * Origins and Amounts for the staking operating account fee supplement. An operating account
         * is identified in MultiLocation format.
         */
        FeeSources: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Iadrpn9mhdu2rp>, true, never>;
        /**
         * Hosting fee percentage and beneficiary account for different chains
         */
        HostingFees: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I7uhs5s0pidt2q>, true, never>;
        /**
         * Delegators in service. A delegator is identified in MultiLocation format.
         * Currency Id + Sub-account index => MultiLocation
         */
        DelegatorsIndex2Multilocation: StorageDescriptor<Anonymize<I3thiua0nporjs>, Anonymize<I4c0s5cioidn76>, true, never>;
        /**
         * Delegators in service. Currency Id + MultiLocation => Sub-account index
         */
        DelegatorsMultilocation2Index: StorageDescriptor<Anonymize<I6ge61lbhbulha>, number, true, never>;
        /**
         * Next index of different currency delegators.
         */
        DelegatorNextIndex: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], number, false, never>;
        /**
         * (VWL) Validator in service. A validator is identified in MultiLocation format.
         */
        Validators: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Ia88a8r9e89e2p>, true, never>;
        /**
         * (VBL) Validator Boost List -> (validator multilocation, due block number)
         */
        ValidatorBoostList: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I4qitokr7lpmpu>, true, never>;
        /**
         * Validators for each delegator. CurrencyId + Delegator => Vec<Validator>
         */
        ValidatorsByDelegator: StorageDescriptor<Anonymize<I6ge61lbhbulha>, Anonymize<Ia88a8r9e89e2p>, true, never>;
        /**
        
         */
        ValidatorsByDelegatorXcmUpdateQueue: StorageDescriptor<[Key: bigint], Anonymize<I34jhssnacefoe>, true, never>;
        /**
         * Delegator ledgers. A delegator is identified in MultiLocation format.
         */
        DelegatorLedgers: StorageDescriptor<Anonymize<I6ge61lbhbulha>, Anonymize<I65gcqchov0ds9>, true, never>;
        /**
        
         */
        DelegatorLedgerXcmUpdateQueue: StorageDescriptor<[Key: bigint], Anonymize<I9egg64gafs7r7>, true, never>;
        /**
         * Minimum and Maximum constraints for different chains.
         */
        MinimumsAndMaximums: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Idmnfldthdnj8h>, true, never>;
        /**
         * TimeUnit delay params for different chains.
         */
        CurrencyDelays: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I98pjho0jvtfaa>, true, never>;
        /**
         * A delegator's tuning record of exchange rate for the current time unit.
         * Currency Id + Delegator Id => latest tuned TimeUnit
         */
        DelegatorLatestTuneRecord: StorageDescriptor<Anonymize<I6ge61lbhbulha>, Anonymize<Id6ihttoi261us>, true, never>;
        /**
         * Currency's tuning record of exchange rate for the current time unit.
         * Currency Id => (latest tuned TimeUnit, number of tuning times)
         */
        CurrencyLatestTuneRecord: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I69hlrlj6ggqgm>, true, never>;
        /**
         * For each currencyId: how many times that a Currency's all delegators can tune the exchange
         * rate for a single time unit, and how much at most each time can tune the
         * exchange rate
         */
        CurrencyTuneExchangeRateLimit: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I9jd27rnpm8ttv>, true, never>;
        /**
         * reflect if all delegations are on a decrease/revoke status. If yes, then new user redeeming
         * is unaccepted.
         */
        DelegationsOccupied: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], boolean, true, never>;
        /**
        
         */
        LastTimeUpdatedOngoingTimeUnit: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], number, true, never>;
        /**
        
         */
        OngoingTimeUnitUpdateInterval: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], number, true, never>;
        /**
        
         */
        SupplementFeeAccountWhitelist: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I7t012gg35hgm4>, true, never>;
    };
    XcmInterface: {
        /**
         * The dest weight limit and fee for execution XCM msg sent by XcmInterface. Must be
         * sufficient, otherwise the execution of XCM msg on relaychain will fail.
         *
         * XcmWeightAndFee: map: XcmOperationType => (Weight, Balance)
         */
        XcmWeightAndFee: StorageDescriptor<Anonymize<Ib8nbo9p8dn6s1>, Anonymize<I1js2aelrc7fbg>, true, never>;
    };
    TokenConversion: {
        /**
        
         */
        RelaychainLease: StorageDescriptor<[], number, false, never>;
        /**
        
         */
        ExchangeRate: StorageDescriptor<[Key: number], Anonymize<Icq8st9st73vh1>, false, never>;
        /**
         * exchange fee
         */
        ExchangeFee: StorageDescriptor<[], Anonymize<I8pl16po8ngde>, false, never>;
    };
    Farming: {
        /**
         * Record the id of the new pool.
         */
        PoolNextId: StorageDescriptor<[], number, false, never>;
        /**
         * Record the id of the new gauge pool.
         */
        GaugePoolNextId: StorageDescriptor<[], number, false, never>;
        /**
         * The upper limit of a single retirement pool
         */
        RetireLimit: StorageDescriptor<[], number, false, never>;
        /**
         * Record reward pool info.
         *
         * map PoolId => PoolInfo
         */
        PoolInfos: StorageDescriptor<[Key: number], Anonymize<I4kcv5272ambf0>, true, never>;
        /**
         * Record gauge farming pool info.
         *
         * map PoolId => GaugePoolInfo
         */
        GaugePoolInfos: StorageDescriptor<[Key: number], Anonymize<I970q50juj0l2>, true, never>;
        /**
         * Record gauge config
         */
        GaugeInfos: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<Ifpaals567gacp>, true, never>;
        /**
         * Record share amount, reward currency and withdrawn reward amount for
         * specific `AccountId` under `PoolId`.
         *
         * double_map (PoolId, AccountId) => ShareInfo
         */
        SharesAndWithdrawnRewards: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<Ilivuv1vkc02s>, true, never>;
        /**
         * Record all voting pool information.
         */
        BoostPoolInfos: StorageDescriptor<[], Anonymize<Ianombrc3en111>, false, never>;
        /**
         * Record the voting pool id and the voting percentage of the user.
         */
        UserBoostInfos: StorageDescriptor<[Key: SS58String], Anonymize<I1755v7kcv6nfl>, true, never>;
        /**
         * Record the pools which the user can voted for.
         */
        BoostWhitelist: StorageDescriptor<[Key: number], null, true, never>;
        /**
         * Record the pools which the user can voted for in the next round.
         */
        BoostNextRoundWhitelist: StorageDescriptor<[Key: number], null, true, never>;
        /**
         * Record the voting amount for each pool.
         */
        BoostVotingPools: StorageDescriptor<[Key: number], bigint, true, never>;
        /**
         * Voting rewards for corresponding currency.
         */
        BoostBasicRewards: StorageDescriptor<Anonymize<I26t6htp1ghfm3>, bigint, true, never>;
        /**
         * The pool ID of the user participating in the farming pool.
         */
        UserFarmingPool: StorageDescriptor<[Key: SS58String], Anonymize<Icgljjb6j82uhn>, false, never>;
    };
    SystemStaking: {
        /**
         * Current Round Information
         */
        Round: StorageDescriptor<[], Anonymize<Ial6i7mt9utr8>, true, never>;
        /**
         * The tokenInfo for each currency
         */
        TokenStatus: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Iam3cim0m4gpdq>, true, never>;
        /**
         * All token sets
         */
        TokenList: StorageDescriptor<[], Anonymize<I6ae21pstqk9et>, false, never>;
    };
    FeeShare: {
        /**
         * The distribution information
         */
        DistributionInfos: StorageDescriptor<[Key: number], Anonymize<Ifm7mj15s63a8e>, true, never>;
        /**
         * The proportion of the token distribution
         */
        TokensProportions: StorageDescriptor<Anonymize<I7svnfko10tq2e>, number, true, never>;
        /**
         * USD Standard Accumulation Logic Configuration
         */
        DollarStandardInfos: StorageDescriptor<[Key: number], Anonymize<Ieqteqhnicu2mf>, true, never>;
        /**
         * The next distribution ID
         */
        DistributionNextId: StorageDescriptor<[], number, false, never>;
        /**
         * The era length and the next era
         */
        AutoEra: StorageDescriptor<[], Anonymize<I9jd27rnpm8ttv>, false, never>;
    };
    CrossInOut: {
        /**
         * To store currencies that support indirect cross-in and cross-out.
         */
        CrossCurrencyRegistry: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], null, true, never>;
        /**
         * Accounts in the whitelist can issue the corresponding Currency.
         */
        IssueWhiteList: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Ia2lhg7l2hilo3>, true, never>;
        /**
         * Accounts in the whitelist can register the mapping between a multilocation and an accountId.
         */
        RegisterWhiteList: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Ia2lhg7l2hilo3>, true, never>;
        /**
         * Mapping a Bifrost account to a multilocation of a outer chain
         */
        AccountToOuterMultilocation: StorageDescriptor<Anonymize<Ifptjqqj04qat7>, Anonymize<I4c0s5cioidn76>, true, never>;
        /**
         * Mapping a multilocation of a outer chain to a Bifrost account
         */
        OuterMultilocationToAccount: StorageDescriptor<Anonymize<I6ge61lbhbulha>, SS58String, true, never>;
        /**
         * minimum crossin and crossout amount【crossinMinimum, crossoutMinimum】
         */
        CrossingMinimumAmount: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I200n1ov5tbcvr>, true, never>;
    };
    BbBNC: {
        /**
         * Total supply of locked tokens
         */
        Supply: StorageDescriptor<[], bigint, false, never>;
        /**
         * Configurations
         */
        BbConfigs: StorageDescriptor<[], Anonymize<I4os3q75qs0t9f>, false, never>;
        /**
         * Global epoch
         */
        Epoch: StorageDescriptor<[], Anonymize<I4totqt881mlti>, false, never>;
        /**
         * Locked tokens. [position => LockedBalance]
         */
        Locked: StorageDescriptor<[Key: bigint], Anonymize<I93ot7g316idsl>, false, never>;
        /**
         * User locked tokens. [who => value]
         */
        UserLocked: StorageDescriptor<[Key: SS58String], bigint, false, never>;
        /**
         * Each week has a Point struct stored in PointHistory.
         */
        PointHistory: StorageDescriptor<[Key: Anonymize<I4totqt881mlti>], Anonymize<I393gnb7kgq98v>, false, never>;
        /**
         * User point history. [(who, epoch) => Point]
         */
        UserPointHistory: StorageDescriptor<Anonymize<Ifvilitm1tdmqi>, Anonymize<I393gnb7kgq98v>, false, never>;
        /**
         * User point epoch. [who => epoch]
         */
        UserPointEpoch: StorageDescriptor<[Key: bigint], Anonymize<I4totqt881mlti>, false, never>;
        /**
         * Slope changes. [block => slope]
         */
        SlopeChanges: StorageDescriptor<[Key: number], bigint, false, never>;
        /**
         * Farming pool incentive configurations.[pool_id => IncentiveConfig]
         */
        IncentiveConfigs: StorageDescriptor<[Key: number], Anonymize<I4bv41jk9n83m8>, false, never>;
        /**
         * User reward per token paid. [who => reward per token]
         */
        UserRewardPerTokenPaid: StorageDescriptor<[Key: SS58String], Anonymize<I2dbamvpq4935>, false, never>;
        /**
         * User rewards. [who => rewards]
         */
        Rewards: StorageDescriptor<[Key: SS58String], Anonymize<I2dbamvpq4935>, true, never>;
        /**
         * User markup infos. [who => UserMarkupInfo]
         */
        UserMarkupInfos: StorageDescriptor<[Key: SS58String], Anonymize<Iarr20ag9rpg5c>, true, never>;
        /**
         * Locked tokens for markup. [(token, who) => value]
         */
        LockedTokens: StorageDescriptor<Anonymize<Ifptjqqj04qat7>, Anonymize<I5o39ti65l0u4e>, true, never>;
        /**
         * Total locked tokens for markup. [token => value]
         */
        TotalLock: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * Markup coefficient. [token => MarkupCoefficientInfo]
         */
        MarkupCoefficient: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Ibrbnb4fv7rbdd>, true, never>;
        /**
         * The last position of all.
         */
        Position: StorageDescriptor<[], bigint, false, never>;
        /**
         * Positions owned by the user. [who => positions]
         */
        UserPositions: StorageDescriptor<[Key: SS58String], Anonymize<Iafqnechp3omqg>, false, never>;
        /**
         * Track positions by their expiration time
         */
        ExpiringPositions: StorageDescriptor<[Key: number], Anonymize<Iafqnechp3omqg>, false, never>;
        /**
         * Track the next block that has expiring positions
         */
        NextExpiringBlock: StorageDescriptor<[], number, false, never>;
        /**
         * Track position owner. [position => owner]
         */
        PositionOwner: StorageDescriptor<[Key: bigint], SS58String, true, never>;
    };
    Slpx: {
        /**
         * Contract whitelist
         */
        WhitelistAccountId: StorageDescriptor<[Key: Anonymize<I3em9l2q88o7if>], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * Charge corresponding fees for different CurrencyId
         */
        ExecutionFee: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, true, never>;
        /**
         * XCM fee for transferring to Moonbeam(BNC)
         */
        TransferToFee: StorageDescriptor<[Key: Anonymize<I3em9l2q88o7if>], bigint, true, never>;
        /**
         * Xcm Oracle configuration
         */
        XcmEthereumCallConfiguration: StorageDescriptor<[], Anonymize<Imng78fk88871>, true, never>;
        /**
         * Currency to support xcm oracle
         */
        CurrencyIdList: StorageDescriptor<[], Anonymize<I6ae21pstqk9et>, false, never>;
        /**
         * Currency to support xcm fee
         */
        SupportXcmFeeList: StorageDescriptor<[], Anonymize<I6ae21pstqk9et>, false, never>;
        /**
         * Order queue
         */
        OrderQueue: StorageDescriptor<[], Anonymize<Iec27c137mjssc>, false, never>;
        /**
         * Delay block
         */
        DelayBlock: StorageDescriptor<[], number, false, never>;
        /**
         * HyperBridge Oracle Config
         */
        HyperBridgeOracle: StorageDescriptor<[Key: number], Anonymize<Ifbdrgce969o4a>, true, never>;
        /**
         * Hydration chain oracle configuration
         */
        HydrationOracle: StorageDescriptor<[], Anonymize<I2dtppeq1iec09>, true, never>;
        /**
         * Async Mint configuration
         */
        AsyncMintConfig: StorageDescriptor<[], Anonymize<Iefb7gficrner>, false, never>;
        /**
         * Async Mint execution records
         */
        AsyncMintExecutions: StorageDescriptor<[Key: Anonymize<I3thiua0nporjs>], Anonymize<I5g2vv0ckl2m8b>, false, never>;
        /**
         * Async Mint execution records
         */
        HyperBridgeFeeExemptAccounts: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
    };
    FellowshipCollective: {
        /**
         * The number of members in the collective who have at least the rank according to the index
         * of the vec.
         */
        MemberCount: StorageDescriptor<[Key: number], number, false, never>;
        /**
         * The current members of the collective.
         */
        Members: StorageDescriptor<[Key: SS58String], number, true, never>;
        /**
         * The index of each ranks's member into the group of members who have at least that rank.
         */
        IdToIndex: StorageDescriptor<Anonymize<I7svnfko10tq2e>, number, true, never>;
        /**
         * The members in the collective by index. All indices in the range `0..MemberCount` will
         * return `Some`, however a member's index is not guaranteed to remain unchanged over time.
         */
        IndexToId: StorageDescriptor<Anonymize<I5g2vv0ckl2m8b>, SS58String, true, never>;
        /**
         * Votes on a given proposal, if it is ongoing.
         */
        Voting: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<I3gg47bgkgq9tr>, true, never>;
        /**
        
         */
        VotingCleanup: StorageDescriptor<[Key: number], Binary, true, never>;
    };
    FellowshipReferenda: {
        /**
         * The next free referendum index, aka the number of referenda started so far.
         */
        ReferendumCount: StorageDescriptor<[], number, false, never>;
        /**
         * Information concerning any given referendum.
         */
        ReferendumInfoFor: StorageDescriptor<[Key: number], Anonymize<Icoeje77srd9e5>, true, never>;
        /**
         * The sorted list of referenda ready to be decided but not yet being decided, ordered by
         * conviction-weighted approvals.
         *
         * This should be empty if `DecidingCount` is less than `TrackInfo::max_deciding`.
         */
        TrackQueue: StorageDescriptor<[Key: number], Anonymize<I95g6i7ilua7lq>, false, never>;
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
    StableAsset: {
        /**
         * The last pool id.
         */
        PoolCount: StorageDescriptor<[], number, false, never>;
        /**
         * The pool info.
         */
        Pools: StorageDescriptor<[Key: number], Anonymize<Ibe2akds4krf80>, true, never>;
        /**
         * Price anchor used to bind the corresponding pool and currency.
         */
        TokenRateCaches: StorageDescriptor<Anonymize<I26t6htp1ghfm3>, Anonymize<I200n1ov5tbcvr>, true, never>;
        /**
         * Record the maximum percentage that can exceed the token rate.
         */
        TokenRateHardcap: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], number, true, never>;
    };
    VtokenVoting: {
        /**
         * Information concerning any given referendum.
         */
        ReferendumInfoFor: StorageDescriptor<Anonymize<I3thiua0nporjs>, Anonymize<I5m768sb1iam8f>, true, never>;
        /**
         * All voting for a particular voter in a particular voting class. We store the balance for the
         * number of votes that we have recorded.
         */
        VotingForV2: StorageDescriptor<Anonymize<Ifptjqqj04qat7>, Anonymize<I2uhe6v3aqlo79>, false, never>;
        /**
         * The voting classes which have a non-zero lock requirement and the lock amounts which they
         * require. The actual amount locked on behalf of this pallet should always be the maximum of
         * this list.
         */
        ClassLocksFor: StorageDescriptor<[Key: SS58String], Anonymize<I2dbamvpq4935>, false, never>;
        /**
        
         */
        PendingReferendumInfo: StorageDescriptor<[Key: bigint], Anonymize<I3thiua0nporjs>, true, never>;
        /**
        
         */
        PendingVotingInfo: StorageDescriptor<[Key: bigint], Anonymize<If5lnhvjis90k>, true, never>;
        /**
        
         */
        PendingRemoveDelegatorVote: StorageDescriptor<[Key: bigint], Anonymize<I22oifipsnuvk4>, true, never>;
        /**
        
         */
        VoteLockingPeriod: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], number, true, never>;
        /**
        
         */
        UndecidingTimeout: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], number, true, never>;
        /**
        
         */
        Delegators: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Icgljjb6j82uhn>, false, never>;
        /**
        
         */
        VoteCapRatio: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], number, false, never>;
        /**
        
         */
        DelegatorVotes: StorageDescriptor<Anonymize<I3thiua0nporjs>, Anonymize<I42jj1su7asrm9>, false, never>;
        /**
        
         */
        PendingDelegatorVotes: StorageDescriptor<Anonymize<I3thiua0nporjs>, Anonymize<I42jj1su7asrm9>, false, never>;
        /**
        
         */
        ReferendumTimeoutV3: StorageDescriptor<Anonymize<I3thiua0nporjs>, Anonymize<Icgljjb6j82uhn>, false, never>;
        /**
        
         */
        VoteDelegatorFor: StorageDescriptor<Anonymize<I3udg9qslb775f>, number, true, never>;
        /**
        
         */
        ReferendumVoteStatusStore: StorageDescriptor<Anonymize<I3thiua0nporjs>, Anonymize<I6kqftg4r08qah>, false, never>;
    };
    LendMarket: {
        /**
         * The timestamp of the last calculation of accrued interest
         */
        LastAccruedInterestTime: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * Liquidation free collateral.
         */
        LiquidationFreeCollaterals: StorageDescriptor<[], Anonymize<I6ae21pstqk9et>, false, never>;
        /**
         * Total number of collateral tokens in circulation
         * CollateralType -> Balance
         */
        TotalSupply: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * Total amount of outstanding borrows of the underlying in this market
         * CurrencyId -> Balance
         */
        TotalBorrows: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * Total amount of reserves of the underlying held in this market
         * CurrencyId -> Balance
         */
        TotalReserves: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * Mapping of account addresses to outstanding borrow balances
         * CurrencyId -> Owner -> BorrowSnapshot
         */
        AccountBorrows: StorageDescriptor<Anonymize<Ifptjqqj04qat7>, Anonymize<Iavngg6vh7nl2j>, false, never>;
        /**
         * Mapping of account addresses to deposit details
         * CollateralType -> Owner -> Deposits
         */
        AccountDeposits: StorageDescriptor<Anonymize<Ifptjqqj04qat7>, Anonymize<Iao359lc45ru9s>, false, never>;
        /**
         * Mapping of account addresses to total deposit interest accrual
         * CurrencyId -> Owner -> EarnedSnapshot
         */
        AccountEarned: StorageDescriptor<Anonymize<Ifptjqqj04qat7>, Anonymize<I1ifiaqhtj7c9>, false, never>;
        /**
         * Accumulator of the total earned interest rate since the opening of the market
         * CurrencyId -> u128
         */
        BorrowIndex: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * The exchange rate from the underlying to the internal collateral
         */
        ExchangeRate: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * Mapping of borrow rate to currency type
         */
        BorrowRate: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * Mapping of supply rate to currency type
         */
        SupplyRate: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * Borrow utilization ratio
         */
        UtilizationRatio: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], number, false, never>;
        /**
         * Mapping of asset id to its market
         */
        Markets: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I1i2kfunpgo63g>, true, never>;
        /**
         * Mapping of lend token id to asset id
         * `lend token id`: voucher token id
         * `asset id`: underlying token id
         */
        UnderlyingAssetId: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Iebirugq1dbhv6>, true, never>;
        /**
         * Mapping of token id to supply reward speed
         */
        RewardSupplySpeed: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * Mapping of token id to borrow reward speed
         */
        RewardBorrowSpeed: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * The Reward market supply state for each market
         */
        RewardSupplyState: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I6km05m2f6usv7>, false, never>;
        /**
         * The Reward market borrow state for each market
         */
        RewardBorrowState: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I6km05m2f6usv7>, false, never>;
        /**
         * The Reward index for each market for each supplier as of the last time they accrued Reward
         */
        RewardSupplierIndex: StorageDescriptor<Anonymize<Ifptjqqj04qat7>, bigint, false, never>;
        /**
         * The Reward index for each market for each borrower as of the last time they accrued Reward
         */
        RewardBorrowerIndex: StorageDescriptor<Anonymize<Ifptjqqj04qat7>, bigint, false, never>;
        /**
         * The reward accrued but not yet transferred to each user.
         */
        RewardAccured: StorageDescriptor<[Key: SS58String], bigint, false, never>;
        /**
        
         */
        MarketBond: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I6ae21pstqk9et>, true, never>;
    };
    Prices: {
        /**
         * Mapping from currency id to it's emergency price
         */
        EmergencyPrice: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, true, never>;
        /**
         * Mapping from foreign vault token to our's vault token
         */
        ForeignToNativeAsset: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Iebirugq1dbhv6>, true, never>;
    };
    Oracle: {
        /**
         * Raw values for each oracle operators
         */
        RawValues: StorageDescriptor<Anonymize<Icoe72r8pkf564>, Anonymize<I9055m3udr8982>, true, never>;
        /**
         * Up to date combined value from Raw Values
         */
        Values: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I9055m3udr8982>, true, never>;
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
    ChannelCommission: {
        /**
         * Auto increment channel id
         */
        ChannelNextId: StorageDescriptor<[], number, false, never>;
        /**
         * Mapping a channel id to a receive account and a name, 【channel_id =>(receive_account,
         * name)】
         */
        Channels: StorageDescriptor<[Key: number], Anonymize<I92tce08cbhnmn>, true, never>;
        /**
         * Mapping a vtoken to a commission token, 【vtoken => commission_token】
         */
        CommissionTokens: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Iebirugq1dbhv6>, true, never>;
        /**
         * Mapping a channel + vtoken to corresponding commission rate, 【(channel_id, vtoken) =>
         * commission rate】
         */
        ChannelCommissionTokenRates: StorageDescriptor<Anonymize<I26t6htp1ghfm3>, number, false, never>;
        /**
         * Mapping a channel + vtoken to corresponding channel share, 【(channel_id, vtoken) => share】
         */
        ChannelVtokenShares: StorageDescriptor<Anonymize<I26t6htp1ghfm3>, number, false, never>;
        /**
         * 【vtoken => (old_issuance, new_issuance)】,old_issuance is the vtoken issuance at last
         * clearing point,  new_issuance is the ongoing accumulative issuance the last clearing point
         */
        VtokenIssuanceSnapshots: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I200n1ov5tbcvr>, false, never>;
        /**
         * Vtoken total minted amount in the ongoing period for the chain, 【vtoken => (old_total_mint,
         * new_total_mint)】
         */
        PeriodVtokenTotalMint: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I200n1ov5tbcvr>, false, never>;
        /**
         * Vtoken total redeemed amount in the ongoing period for the chain, 【vtoken =>
         * (old_total_redeem, new_total_redeem)】
         */
        PeriodVtokenTotalRedeem: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I200n1ov5tbcvr>, false, never>;
        /**
         * Vtoken minted amount in the ongoing period for the channel, 【(channel_id, vtoken) =>
         * (old_mint_amount, new_mint_amount)】
         */
        PeriodChannelVtokenMint: StorageDescriptor<Anonymize<I26t6htp1ghfm3>, Anonymize<I200n1ov5tbcvr>, false, never>;
        /**
         * Commission pool for last period and ongoing period, 【commission token => (old_amount,
         * new_amount)】
         */
        PeriodTotalCommissions: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<I200n1ov5tbcvr>, false, never>;
        /**
         * Commission amount that has been cleared for the current clearing process, 【commission token
         * => amount】
         */
        PeriodClearedCommissions: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, false, never>;
        /**
         * Commission amount to be claimed by channels, 【channel id + commission token => amount】
         */
        ChannelClaimableCommissions: StorageDescriptor<Anonymize<I26t6htp1ghfm3>, bigint, false, never>;
    };
    BuyBack: {
        /**
        
         */
        Infos: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], Anonymize<Ilqs3opgrh80o>, true, never>;
        /**
        
         */
        SwapOutMin: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, true, never>;
        /**
        
         */
        AddLiquiditySwapOutMin: StorageDescriptor<[Key: Anonymize<Iebirugq1dbhv6>], bigint, true, never>;
    };
    SlpV2: {
        /**
         * Configuration for different staking protocols.
         */
        ConfigurationByStakingProtocol: StorageDescriptor<[Key: Anonymize<Icj6nnp3j96bc6>], Anonymize<Iamub7qfj1haap>, true, never>;
        /**
         * StakingProtocol + DelegatorIndex => Delegator
         */
        DelegatorByStakingProtocolAndDelegatorIndex: StorageDescriptor<Anonymize<I8dlobfoa2kkke>, Anonymize<Ickhdoqhl8bqbi>, true, never>;
        /**
         * StakingProtocol + Delegator => DelegatorIndex
         */
        DelegatorIndexByStakingProtocolAndDelegator: StorageDescriptor<Anonymize<I1hif5qruqj4v>, number, true, never>;
        /**
         * StakingProtocol + DelegatorIndex => Delegator
         */
        LedgerByStakingProtocolAndDelegator: StorageDescriptor<Anonymize<I1hif5qruqj4v>, Anonymize<I4r7b9kd9ea9vf>, true, never>;
        /**
         * Validators for different staking protocols.
         */
        ValidatorsByStakingProtocolAndDelegator: StorageDescriptor<Anonymize<I1hif5qruqj4v>, Anonymize<Ie3rr1ggdh7418>, false, never>;
        /**
         * Next index of different staking protocols.
         */
        NextDelegatorIndexByStakingProtocol: StorageDescriptor<[Key: Anonymize<Icj6nnp3j96bc6>], number, false, never>;
        /**
         * Pending status for different query id.
         */
        PendingStatusByQueryId: StorageDescriptor<[Key: bigint], Anonymize<I9p3c3ohdngoau>, true, never>;
        /**
         * Last update ongoing time unit block number for different staking protocols.
         */
        LastUpdateOngoingTimeUnitBlockNumber: StorageDescriptor<[Key: Anonymize<Icj6nnp3j96bc6>], number, false, never>;
        /**
         * Last update token exchange rate block number for different staking protocols.
         */
        LastUpdateTokenExchangeRateBlockNumber: StorageDescriptor<Anonymize<I1hif5qruqj4v>, number, false, never>;
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
    Indices: {
        /**
         * Assign an previously unassigned index.
         *
         * Payment: `Deposit` is reserved from the sender account.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `index`: the index to be claimed. This must not be in use.
         *
         * Emits `IndexAssigned` if successful.
         *
         * ## Complexity
         * - `O(1)`.
         */
        claim: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Assign an index already owned by the sender to another account. The balance reservation
         * is effectively transferred to the new account.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `index`: the index to be re-assigned. This must be owned by the sender.
         * - `new`: the new owner of the index. This function is a no-op if it is equal to sender.
         *
         * Emits `IndexAssigned` if successful.
         *
         * ## Complexity
         * - `O(1)`.
         */
        transfer: TxDescriptor<Anonymize<I1u3ac7lafvv5b>>;
        /**
         * Free up an index owned by the sender.
         *
         * Payment: Any previous deposit placed for the index is unreserved in the sender account.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must own the index.
         *
         * - `index`: the index to be freed. This must be owned by the sender.
         *
         * Emits `IndexFreed` if successful.
         *
         * ## Complexity
         * - `O(1)`.
         */
        free: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Force an index to an account. This doesn't require a deposit. If the index is already
         * held, then any deposit is reimbursed to its current owner.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * - `index`: the index to be (re-)assigned.
         * - `new`: the new owner of the index. This function is a no-op if it is equal to sender.
         * - `freeze`: if set to `true`, will freeze the index so it cannot be transferred.
         *
         * Emits `IndexAssigned` if successful.
         *
         * ## Complexity
         * - `O(1)`.
         */
        force_transfer: TxDescriptor<Anonymize<I5teebeg0opib2>>;
        /**
         * Freeze an index so it will always point to the sender account. This consumes the
         * deposit.
         *
         * The dispatch origin for this call must be _Signed_ and the signing account must have a
         * non-frozen account `index`.
         *
         * - `index`: the index to be frozen in place.
         *
         * Emits `IndexFrozen` if successful.
         *
         * ## Complexity
         * - `O(1)`.
         */
        freeze: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Poke the deposit reserved for an index.
         *
         * The dispatch origin for this call must be _Signed_ and the signing account must have a
         * non-frozen account `index`.
         *
         * The transaction fees is waived if the deposit is changed after poking/reconsideration.
         *
         * - `index`: the index whose deposit is to be poked/reconsidered.
         *
         * Emits `DepositPoked` if successful.
         */
        poke_deposit: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
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
        transfer_allow_death: TxDescriptor<Anonymize<I65i612een2ak>>;
        /**
         * Exactly as `transfer_allow_death`, except the origin must be root and the source account
         * may be specified.
         */
        force_transfer: TxDescriptor<Anonymize<I5vvf47ira6s09>>;
        /**
         * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
         * kill the origin account.
         *
         * 99% of the time you want [`transfer_allow_death`] instead.
         *
         * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
         */
        transfer_keep_alive: TxDescriptor<Anonymize<I65i612een2ak>>;
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
        transfer_all: TxDescriptor<Anonymize<I5ns79ftlq8cnl>>;
        /**
         * Unreserve some balance from a user by force.
         *
         * Can only be called by ROOT.
         */
        force_unreserve: TxDescriptor<Anonymize<I59ofijoau4bjh>>;
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
        force_set_balance: TxDescriptor<Anonymize<Ieka2e164ntfss>>;
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
         * Set the account that will hold funds set aside for parachain bond
         */
        set_parachain_bond_account: TxDescriptor<Anonymize<Idhlknhp7vndhp>>;
        /**
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
        execute_leave_candidates: TxDescriptor<Anonymize<I6imgsrdabjjdm>>;
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
        execute_candidate_bond_less: TxDescriptor<Anonymize<I4b66js88p45m8>>;
        /**
         * Cancel pending request to adjust the collator candidate self bond
         */
        cancel_candidate_bond_less: TxDescriptor<undefined>;
        /**
         * If caller is not a delegator and not a collator, then join the set of delegators
         * If caller is a delegator, then makes delegation to change their delegation state
         */
        delegate: TxDescriptor<Anonymize<If353osofrqjga>>;
        /**
         * DEPRECATED use batch util with schedule_revoke_delegation for all delegations
         * Request to leave the set of delegators. If successful, the caller is scheduled to be
         * allowed to exit via a [DelegationAction::Revoke] towards all existing delegations.
         * Success forbids future delegation requests until the request is invoked or cancelled.
         */
        schedule_leave_delegators: TxDescriptor<undefined>;
        /**
         * DEPRECATED use batch util with execute_delegation_request for all delegations
         * Execute the right to exit the set of delegators and revoke all ongoing delegations.
         */
        execute_leave_delegators: TxDescriptor<Anonymize<Id7ht3qmm0pmas>>;
        /**
         * DEPRECATED use batch util with cancel_delegation_request for all delegations
         * Cancel a pending request to exit the set of delegators. Success clears the pending exit
         * request (thereby resetting the delay upon another `leave_delegators` call).
         */
        cancel_leave_delegators: TxDescriptor<undefined>;
        /**
         * Request to revoke an existing delegation. If successful, the delegation is scheduled
         * to be allowed to be revoked via the `execute_delegation_request` extrinsic.
         */
        schedule_revoke_delegation: TxDescriptor<Anonymize<Ieinuidojqh902>>;
        /**
         * Bond more for delegators wrt a specific collator candidate.
         */
        delegator_bond_more: TxDescriptor<Anonymize<I6ec8i49vphpbo>>;
        /**
         * Request bond less for delegators wrt a specific collator candidate.
         */
        schedule_delegator_bond_less: TxDescriptor<Anonymize<I78tmt4lg2noo1>>;
        /**
         * Execute pending request to change an existing delegation
         */
        execute_delegation_request: TxDescriptor<Anonymize<Ifj50lknlp6i9t>>;
        /**
         * Cancel request to change an existing delegation.
         */
        cancel_delegation_request: TxDescriptor<Anonymize<I4b66js88p45m8>>;
        /**
         * Hotfix to remove existing empty entries for candidates that have left.
         */
        hotfix_remove_delegation_requests_exited_candidates: TxDescriptor<Anonymize<Icolvgjhpn5o0s>>;
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
        delegate: TxDescriptor<Anonymize<Iam6m7eerh6h6v>>;
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
        unlock: TxDescriptor<Anonymize<Ic8m623qbgr5mp>>;
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
        remove_other_vote: TxDescriptor<Anonymize<Ieg7p9mojce0qk>>;
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
        submit: TxDescriptor<Anonymize<Ib9pt0t7gno7q4>>;
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
        dispatch_whitelisted_call_with_preimage: TxDescriptor<Anonymize<I7v5c9tuldh45d>>;
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
        /**
         * Authorize another `aliaser` location to alias into the local `origin` making this call.
         * The `aliaser` is only authorized until the provided `expiry` block number.
         * The call can also be used for a previously authorized alias in order to update its
         * `expiry` block number.
         *
         * Usually useful to allow your local account to be aliased into from a remote location
         * also under your control (like your account on another chain).
         *
         * WARNING: make sure the caller `origin` (you) trusts the `aliaser` location to act in
         * their/your name. Once authorized using this call, the `aliaser` can freely impersonate
         * `origin` in XCM programs executed on the local chain.
         */
        add_authorized_alias: TxDescriptor<Anonymize<Iauhjqifrdklq7>>;
        /**
         * Remove a previously authorized `aliaser` from the list of locations that can alias into
         * the local `origin` making this call.
         */
        remove_authorized_alias: TxDescriptor<Anonymize<Ie1uso9m8rt5cf>>;
        /**
         * Remove all previously authorized `aliaser`s that can alias into the local `origin`
         * making this call.
         */
        remove_all_authorized_aliases: TxDescriptor<undefined>;
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
        batch: TxDescriptor<Anonymize<If9h84vop1ud2e>>;
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
        as_derivative: TxDescriptor<Anonymize<I95iqinn1v9f4s>>;
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
        batch_all: TxDescriptor<Anonymize<If9h84vop1ud2e>>;
        /**
         * Dispatches a function call with a provided origin.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * ## Complexity
         * - O(1).
         */
        dispatch_as: TxDescriptor<Anonymize<Iefva374rimroe>>;
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
        force_batch: TxDescriptor<Anonymize<If9h84vop1ud2e>>;
        /**
         * Dispatch a function call with a specified weight.
         *
         * This function does not check the weight of the call, and instead allows the
         * Root origin to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        with_weight: TxDescriptor<Anonymize<I9sf1boihdee4o>>;
        /**
         * Dispatch a fallback call in the event the main call fails to execute.
         * May be called from any origin except `None`.
         *
         * This function first attempts to dispatch the `main` call.
         * If the `main` call fails, the `fallback` is attemted.
         * if the fallback is successfully dispatched, the weights of both calls
         * are accumulated and an event containing the main call error is deposited.
         *
         * In the event of a fallback failure the whole call fails
         * with the weights returned.
         *
         * - `main`: The main call to be dispatched. This is the primary action to execute.
         * - `fallback`: The fallback call to be dispatched in case the `main` call fails.
         *
         * ## Dispatch Logic
         * - If the origin is `root`, both the main and fallback calls are executed without
         * applying any origin filters.
         * - If the origin is not `root`, the origin filter is applied to both the `main` and
         * `fallback` calls.
         *
         * ## Use Case
         * - Some use cases might involve submitting a `batch` type call in either main, fallback
         * or both.
         */
        if_else: TxDescriptor<Anonymize<Ib3il1re0kddul>>;
        /**
         * Dispatches a function call with a provided origin.
         *
         * Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        dispatch_as_fallible: TxDescriptor<Anonymize<Iefva374rimroe>>;
    };
    Scheduler: {
        /**
         * Anonymously schedule a task.
         */
        schedule: TxDescriptor<Anonymize<I3q1qmerq329s7>>;
        /**
         * Cancel an anonymously scheduled task.
         */
        cancel: TxDescriptor<Anonymize<I5n4sebgkfr760>>;
        /**
         * Schedule a named task.
         */
        schedule_named: TxDescriptor<Anonymize<I6eg824e6fjb9c>>;
        /**
         * Cancel a named scheduled task.
         */
        cancel_named: TxDescriptor<Anonymize<Ifs1i5fk9cqvr6>>;
        /**
         * Anonymously schedule a task after a delay.
         */
        schedule_after: TxDescriptor<Anonymize<I7qjbmfe885ov4>>;
        /**
         * Schedule a named task after a delay.
         */
        schedule_named_after: TxDescriptor<Anonymize<I373fom61ldpl>>;
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
        proxy: TxDescriptor<Anonymize<If9sbgppso3l3r>>;
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
        add_proxy: TxDescriptor<Anonymize<I36o7ps27f842k>>;
        /**
         * Unregister a proxy account for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to remove as a proxy.
         * - `proxy_type`: The permissions currently enabled for the removed proxy account.
         */
        remove_proxy: TxDescriptor<Anonymize<I36o7ps27f842k>>;
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
        create_pure: TxDescriptor<Anonymize<Ie4ebalp1vm5ac>>;
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
        kill_pure: TxDescriptor<Anonymize<Iuqevbnrvdkd8>>;
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
        announce: TxDescriptor<Anonymize<Idj9faf6hgsdur>>;
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
        remove_announcement: TxDescriptor<Anonymize<Idj9faf6hgsdur>>;
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
        reject_announcement: TxDescriptor<Anonymize<I8mj1nm903hpts>>;
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
        proxy_announced: TxDescriptor<Anonymize<I4h7mqkdp0u1ih>>;
        /**
         * Poke / Adjust deposits made for proxies and announcements based on current values.
         * This can be used by accounts to possibly lower their locked amount.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * Emits `DepositPoked` if successful.
         */
        poke_deposit: TxDescriptor<undefined>;
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
        as_multi_threshold_1: TxDescriptor<Anonymize<Ia69km3o2rblpi>>;
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
        as_multi: TxDescriptor<Anonymize<I4kapheqtplrhh>>;
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
        /**
         * Poke the deposit reserved for an existing multisig operation.
         *
         * The dispatch origin for this call must be _Signed_ and must be the original depositor of
         * the multisig operation.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * - `threshold`: The total number of approvals needed for this multisig.
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multisig.
         * - `call_hash`: The hash of the call this deposit is reserved for.
         *
         * Emits `DepositPoked` if successful.
         */
        poke_deposit: TxDescriptor<Anonymize<I6lqh1vgb4mcja>>;
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
        add_registrar: TxDescriptor<Anonymize<I73kffnn32g4c7>>;
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
        set_account_id: TxDescriptor<Anonymize<I1u3ac7lafvv5b>>;
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
        provide_judgement: TxDescriptor<Anonymize<I9h4cqmadpj7l0>>;
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
        kill_identity: TxDescriptor<Anonymize<If31vrl50nund3>>;
        /**
         * Add the given account to the sender's subs.
         *
         * Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
         * to the sender.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * sub identity of `sub`.
         */
        add_sub: TxDescriptor<Anonymize<I29bkdd7n16li1>>;
        /**
         * Alter the associated name of the given sub-account.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * sub identity of `sub`.
         */
        rename_sub: TxDescriptor<Anonymize<I29bkdd7n16li1>>;
        /**
         * Remove the given account from the sender's subs.
         *
         * Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
         * to the sender.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * sub identity of `sub`.
         */
        remove_sub: TxDescriptor<Anonymize<I9jb9hqm18runn>>;
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
        add_username_authority: TxDescriptor<Anonymize<I85htvo8b885h>>;
        /**
         * Remove `authority` from the username authorities.
         */
        remove_username_authority: TxDescriptor<Anonymize<I13n219aci2a5j>>;
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
        set_username_for: TxDescriptor<Anonymize<Ialt2aiqe4ps5k>>;
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
        vest_other: TxDescriptor<Anonymize<If31vrl50nund3>>;
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
        vested_transfer: TxDescriptor<Anonymize<I3usr0jpt8ovnk>>;
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
        force_vested_transfer: TxDescriptor<Anonymize<I5a5fh6anhjgu7>>;
        /**
        
         */
        init_vesting_start_at: TxDescriptor<Anonymize<I3atr9j3ums3m2>>;
        /**
        
         */
        set_vesting_per_block: TxDescriptor<Anonymize<I2bvdo47pdo59f>>;
        /**
        
         */
        force_set_cliff: TxDescriptor<Anonymize<I2okmh2c5ub01c>>;
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
        spend_local: TxDescriptor<Anonymize<I7fcl4aua07ato>>;
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
        spend: TxDescriptor<Anonymize<I6qq5nnbjegi8u>>;
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
         * Ensure that the bulk of pre-images is upgraded.
         *
         * The caller pays no fee if at least 90% of pre-images were successfully updated.
         */
        ensure_updated: TxDescriptor<Anonymize<I3o5j3bli1pd8e>>;
    };
    Ethereum: {
        /**
         * Transact an Ethereum transaction.
         */
        transact: TxDescriptor<Anonymize<I13qib3vtm9cs3>>;
    };
    EVM: {
        /**
         * Withdraw balance from EVM into currency/balances pallet.
         */
        withdraw: TxDescriptor<Anonymize<Idcabvplu05lea>>;
        /**
         * Issue an EVM call operation. This is similar to a message call transaction in Ethereum.
         */
        call: TxDescriptor<Anonymize<Id38gdpcotl637>>;
        /**
         * Issue an EVM create operation. This is similar to a contract creation transaction in
         * Ethereum.
         */
        create: TxDescriptor<Anonymize<I73q3qf5u7nnqg>>;
        /**
         * Issue an EVM create2 operation.
         */
        create2: TxDescriptor<Anonymize<Idpm1bc2cr6dgj>>;
    };
    DynamicFee: {
        /**
        
         */
        note_min_gas_price_target: TxDescriptor<Anonymize<I6v8kghkt0dksl>>;
    };
    EVMAccounts: {
        /**
         * Binds a Substrate address to EVM address.
         * After binding, the EVM is able to convert an EVM address to the original Substrate
         * address. Without binding, the EVM converts an EVM address to a truncated Substrate
         * address, which doesn't correspond to the origin address.
         *
         * Binding an address is not necessary for interacting with the EVM.
         *
         * Parameters:
         * - `origin`: Substrate account binding an address
         *
         * Emits `EvmAccountBound` event when successful.
         */
        bind_evm_address: TxDescriptor<undefined>;
        /**
         * Adds an EVM address to the list of addresses that are allowed to deploy smart contracts.
         *
         * Parameters:
         * - `origin`: Substrate account whitelisting an address. Must be `ControllerOrigin`.
         * - `address`: EVM address that is whitelisted
         *
         * Emits `DeployerAdded` event when successful.
         */
        add_contract_deployer: TxDescriptor<Anonymize<Itmchvgqfl28g>>;
        /**
         * Removes an EVM address from the list of addresses that are allowed to deploy smart
         * contracts.
         *
         * Parameters:
         * - `origin`: Substrate account removing the EVM address from the whitelist. Must be
         * `ControllerOrigin`.
         * - `address`: EVM address that is removed from the whitelist
         *
         * Emits `DeployerRemoved` event when successful.
         */
        remove_contract_deployer: TxDescriptor<Anonymize<Itmchvgqfl28g>>;
        /**
         * Removes the account's EVM address from the list of addresses that are allowed to deploy
         * smart contracts. Based on the best practices, this extrinsic can be called by any
         * whitelisted account to renounce their own permission.
         *
         * Parameters:
         * - `origin`: Substrate account removing their EVM address from the whitelist.
         *
         * Emits `DeployerRemoved` event when successful.
         */
        renounce_contract_deployer: TxDescriptor<undefined>;
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
        transfer: TxDescriptor<Anonymize<I3a0noisblbb>>;
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
        transfer_with_fee: TxDescriptor<Anonymize<I7d12t2s4nb6n>>;
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
        transfer_multicurrencies: TxDescriptor<Anonymize<I4fvf7id1oq611>>;
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
    Tokens: {
        /**
         * Transfer some liquid free balance to another account.
         *
         * `transfer` will set the `FreeBalance` of the sender and receiver.
         * It will decrease the total issuance of the system by the
         * `TransferFee`. If the sender's account is below the existential
         * deposit as a result of the transfer, the account will be reaped.
         *
         * The dispatch origin for this call must be `Signed` by the
         * transactor.
         *
         * - `dest`: The recipient of the transfer.
         * - `currency_id`: currency type.
         * - `amount`: free balance amount to transfer.
         */
        transfer: TxDescriptor<Anonymize<I302t0ook7k95n>>;
        /**
         * Transfer all remaining balance to the given account.
         *
         * NOTE: This function only attempts to transfer _transferable_
         * balances. This means that any locked, reserved, or existential
         * deposits (when `keep_alive` is `true`), will not be transferred by
         * this function. To ensure that this function results in a killed
         * account, you might need to prepare the account by removing any
         * reference counters, storage deposits, etc...
         *
         * The dispatch origin for this call must be `Signed` by the
         * transactor.
         *
         * - `dest`: The recipient of the transfer.
         * - `currency_id`: currency type.
         * - `keep_alive`: A boolean to determine if the `transfer_all`
         * operation should send all of the funds the account has, causing
         * the sender account to be killed (false), or transfer everything
         * except at least the existential deposit, which will guarantee to
         * keep the sender account alive (true).
         */
        transfer_all: TxDescriptor<Anonymize<If84l0hb2pbh5j>>;
        /**
         * Same as the [`transfer`] call, but with a check that the transfer
         * will not kill the origin account.
         *
         * 99% of the time you want [`transfer`] instead.
         *
         * The dispatch origin for this call must be `Signed` by the
         * transactor.
         *
         * - `dest`: The recipient of the transfer.
         * - `currency_id`: currency type.
         * - `amount`: free balance amount to transfer.
         */
        transfer_keep_alive: TxDescriptor<Anonymize<I302t0ook7k95n>>;
        /**
         * Exactly as `transfer`, except the origin must be root and the source
         * account may be specified.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * - `source`: The sender of the transfer.
         * - `dest`: The recipient of the transfer.
         * - `currency_id`: currency type.
         * - `amount`: free balance amount to transfer.
         */
        force_transfer: TxDescriptor<Anonymize<I7td476oj5kt2h>>;
        /**
         * Set the balances of a given account.
         *
         * This will alter `FreeBalance` and `ReservedBalance` in storage. it
         * will also decrease the total issuance of the system
         * (`TotalIssuance`). If the new free or reserved balance is below the
         * existential deposit, it will reap the `AccountInfo`.
         *
         * The dispatch origin for this call is `root`.
         */
        set_balance: TxDescriptor<Anonymize<I1o4mqqd02b5sj>>;
    };
    OrmlXcm: {
        /**
         * Send an XCM message as parachain sovereign.
         */
        send_as_sovereign: TxDescriptor<Anonymize<Ia5cotcvi888ln>>;
    };
    ZenlinkProtocol: {
        /**
         * Set the new receiver of the protocol fee.
         *
         * # Arguments
         *
         * - `send_to`:
         * (1) Some(receiver): it turn on the protocol fee and the new receiver account.
         * (2) None: it turn off the protocol fee.
         */
        set_fee_receiver: TxDescriptor<Anonymize<Id3v70nvrro0hv>>;
        /**
         * Set the protocol fee point.
         *
         * # Arguments
         *
         * - `fee_point`:
         * 0 means that all exchange fees belong to the liquidity provider.
         * 30 means that all exchange fees belong to the fee receiver.
         */
        set_fee_point: TxDescriptor<Anonymize<I6msvbss3ktmnu>>;
        /**
         * Move some assets from one holder to another.
         *
         * # Arguments
         *
         * - `asset_id`: The foreign id.
         * - `target`: The receiver of the foreign.
         * - `amount`: The amount of the foreign to transfer.
         */
        transfer: TxDescriptor<Anonymize<Ifbs87e8855hrh>>;
        /**
         * Create pair by two assets.
         *
         * The order of foreign dot effect result.
         *
         * # Arguments
         *
         * - `asset_0`: Asset which make up Pair
         * - `asset_1`: Asset which make up Pair
         */
        create_pair: TxDescriptor<Anonymize<Ibugemvm1fr87g>>;
        /**
         * Provide liquidity to a pair.
         *
         * The order of foreign dot effect result.
         *
         * # Arguments
         *
         * - `asset_0`: Asset which make up pair
         * - `asset_1`: Asset which make up pair
         * - `amount_0_desired`: Maximum amount of asset_0 added to the pair
         * - `amount_1_desired`: Maximum amount of asset_1 added to the pair
         * - `amount_0_min`: Minimum amount of asset_0 added to the pair
         * - `amount_1_min`: Minimum amount of asset_1 added to the pair
         * - `deadline`: Height of the cutoff block of this transaction
         */
        add_liquidity: TxDescriptor<Anonymize<I11kqb3hb93c3c>>;
        /**
         * Extract liquidity.
         *
         * The order of foreign dot effect result.
         *
         * # Arguments
         *
         * - `asset_0`: Asset which make up pair
         * - `asset_1`: Asset which make up pair
         * - `amount_asset_0_min`: Minimum amount of asset_0 to exact
         * - `amount_asset_1_min`: Minimum amount of asset_1 to exact
         * - `recipient`: Account that accepts withdrawal of assets
         * - `deadline`: Height of the cutoff block of this transaction
         */
        remove_liquidity: TxDescriptor<Anonymize<Ici6p55173o3kg>>;
        /**
         * Sell amount of foreign by path.
         *
         * # Arguments
         *
         * - `amount_in`: Amount of the foreign will be sold
         * - `amount_out_min`: Minimum amount of target foreign
         * - `path`: path can convert to pairs.
         * - `recipient`: Account that receive the target foreign
         * - `deadline`: Height of the cutoff block of this transaction
         */
        swap_exact_assets_for_assets: TxDescriptor<Anonymize<Ib7tkro61h34d2>>;
        /**
         * Buy amount of foreign by path.
         *
         * # Arguments
         *
         * - `amount_out`: Amount of the foreign will be bought
         * - `amount_in_max`: Maximum amount of sold foreign
         * - `path`: path can convert to pairs.
         * - `recipient`: Account that receive the target foreign
         * - `deadline`: Height of the cutoff block of this transaction
         */
        swap_assets_for_exact_assets: TxDescriptor<Anonymize<Ig5896f16psh3>>;
        /**
         * Create bootstrap pair
         *
         * The order of asset don't affect result.
         *
         * # Arguments
         *
         * - `asset_0`: Asset which make up bootstrap pair
         * - `asset_1`: Asset which make up bootstrap pair
         * - `target_supply_0`: Target amount of asset_0 total contribute
         * - `target_supply_0`: Target amount of asset_1 total contribute
         * - `capacity_supply_0`: The max amount of asset_0 total contribute
         * - `capacity_supply_1`: The max amount of asset_1 total contribute
         * - `end`: The earliest ending block.
         */
        bootstrap_create: TxDescriptor<Anonymize<Ibsib3ed5u1164>>;
        /**
         * Contribute some asset to a bootstrap pair
         *
         * # Arguments
         *
         * - `asset_0`: Asset which make up bootstrap pair
         * - `asset_1`: Asset which make up bootstrap pair
         * - `amount_0_contribute`: The amount of asset_0 contribute to this bootstrap pair
         * - `amount_1_contribute`: The amount of asset_1 contribute to this bootstrap pair
         * - `deadline`: Height of the cutoff block of this transaction
         */
        bootstrap_contribute: TxDescriptor<Anonymize<I6g1lhais855g9>>;
        /**
         * Claim lp asset from a bootstrap pair
         *
         * # Arguments
         *
         * - `asset_0`: Asset which make up bootstrap pair
         * - `asset_1`: Asset which make up bootstrap pair
         * - `deadline`: Height of the cutoff block of this transaction
         */
        bootstrap_claim: TxDescriptor<Anonymize<I52cpe8da8o62l>>;
        /**
         * End a bootstrap pair
         *
         * # Arguments
         *
         * - `asset_0`: Asset which make up bootstrap pair
         * - `asset_1`: Asset which make up bootstrap pair
         */
        bootstrap_end: TxDescriptor<Anonymize<I7h9e3cbrb3kaa>>;
        /**
         * update a bootstrap pair
         *
         * # Arguments
         *
         * - `asset_0`: Asset which make up bootstrap pair
         * - `asset_1`: Asset which make up bootstrap pair
         * - `min_contribution_0`: The new min amount of asset_0 contribute
         * - `min_contribution_0`: The new min amount of asset_1 contribute
         * - `target_supply_0`: The new target amount of asset_0 total contribute
         * - `target_supply_0`: The new target amount of asset_1 total contribute
         * - `capacity_supply_0`: The new max amount of asset_0 total contribute
         * - `capacity_supply_1`: The new max amount of asset_1 total contribute
         * - `end`: The earliest ending block.
         */
        bootstrap_update: TxDescriptor<Anonymize<Ibsib3ed5u1164>>;
        /**
         * Contributor refund from disable bootstrap pair
         *
         * # Arguments
         *
         * - `asset_0`: Asset which make up bootstrap pair
         * - `asset_1`: Asset which make up bootstrap pair
         */
        bootstrap_refund: TxDescriptor<Anonymize<I7h9e3cbrb3kaa>>;
        /**
        
         */
        bootstrap_charge_reward: TxDescriptor<Anonymize<Ieaqa57prka9ld>>;
        /**
        
         */
        bootstrap_withdraw_reward: TxDescriptor<Anonymize<Iedoc1ioirjto2>>;
        /**
        
         */
        set_new_fee_receiver: TxDescriptor<Anonymize<Idqd6j83jfa92q>>;
    };
    Ismp: {
        /**
         * Execute the provided batch of ISMP messages, this will short-circuit and revert if any
         * of the provided messages are invalid. This is an unsigned extrinsic that permits anyone
         * execute ISMP messages for free, provided they have valid proofs and the messages have
         * not been previously processed.
         *
         * The dispatch origin for this call must be an unsigned one.
         *
         * - `messages`: the messages to handle or process.
         *
         * Emits different message events based on the Message received if successful.
         */
        handle_unsigned: TxDescriptor<Anonymize<I5nmhnue5h41rg>>;
        /**
         * Create a consensus client, using a subjectively chosen consensus state. This can also
         * be used to overwrite an existing consensus state. The dispatch origin for this
         * call must be `T::AdminOrigin`.
         *
         * - `message`: [`CreateConsensusState`] struct.
         *
         * Emits [`Event::ConsensusClientCreated`] if successful.
         */
        create_consensus_client: TxDescriptor<Anonymize<I8416p6oh7m35t>>;
        /**
         * Modify the unbonding period and challenge period for a consensus state.
         * The dispatch origin for this call must be `T::AdminOrigin`.
         *
         * - `message`: `UpdateConsensusState` struct.
         */
        update_consensus_state: TxDescriptor<Anonymize<I1cj3vacp7n158>>;
        /**
         * Add more funds to a message (request or response) to be used for delivery and execution.
         *
         * Should not be called on a message that has been completed (delivered or timed-out) as
         * those funds will be lost forever.
         */
        fund_message: TxDescriptor<Anonymize<I739ltdlbnqckb>>;
    };
    IsmpParachain: {
        /**
         * This allows block builders submit parachain consensus proofs as inherents. If the
         * provided [`ConsensusMessage`] is not for a parachain, this call will fail.
         */
        update_parachain_consensus: TxDescriptor<Anonymize<I5nk49fqq83rft>>;
        /**
         * Add some new parachains to the parachains whitelist
         */
        add_parachain: TxDescriptor<Anonymize<Ivalbtb85o2h0>>;
        /**
         * Removes some parachains from the parachains whitelist
         */
        remove_parachain: TxDescriptor<Anonymize<Ic8hk838gccoml>>;
    };
    TokenGateway: {
        /**
         * Teleports a registered asset
         * locks the asset and dispatches a request to token gateway on the destination
         */
        teleport: TxDescriptor<Anonymize<I987mg4ok5pkoi>>;
        /**
         * Set the token gateway address for specified chains
         */
        set_token_gateway_addresses: TxDescriptor<Anonymize<Ifbem5vkius10c>>;
        /**
         * Registers a multi-chain ERC6160 asset. The asset should not already exist.
         *
         * This works by dispatching a request to the TokenGateway module on each requested chain
         * to create the asset.
         * `native` should be true if this asset originates from this chain
         */
        create_erc6160_asset: TxDescriptor<Anonymize<If3mej48mrh5qf>>;
        /**
         * Registers a multi-chain ERC6160 asset. The asset should not already exist.
         *
         * This works by dispatching a request to the TokenGateway module on each requested chain
         * to create the asset.
         */
        update_erc6160_asset: TxDescriptor<Anonymize<Ibn1504vropo5n>>;
        /**
        
         */
        set_whitelist_addresses: TxDescriptor<Anonymize<Icjrp0nj828ep4>>;
    };
    FlexibleFee: {
        /**
         * Set user default fee currency
         * Parameters:
         * - `maybe_fee_currency`: The currency id to be set as the default fee currency.
         * If `None`, the user default fee currency will be removed.
         */
        set_user_default_fee_currency: TxDescriptor<Anonymize<I9e33amtaq58km>>;
        /**
         * Set universal fee currency order list
         * Parameters:
         * - `default_list`: The currency id list to be set as the universal fee currency order
         * list.
         */
        set_default_fee_currency_list: TxDescriptor<Anonymize<Ia85jfgnieg7o0>>;
        /**
         * Set universal fee currency order list
         * Parameters:
         * - `raw_call_name`: The raw call name to be set as the extra fee call.
         * - `fee_info`: The currency id, fee amount and receiver to be set as the extra fee.
         */
        set_extra_fee: TxDescriptor<Anonymize<I4j50qh0n84qes>>;
        /**
         * Dispatch EVM permit.
         * The main purpose of this function is to allow EVM accounts to pay for the transaction
         * fee in non-native currency by allowing them to self-dispatch pre-signed permit.
         * The EVM fee is paid in the currency set for the account.
         */
        dispatch_permit: TxDescriptor<Anonymize<I92pum5p0t4pat>>;
    };
    Salp: {
        /**
        
         */
        fund_retire: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
        
         */
        fund_end: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Edit the configuration for an in-progress crowdloan.
         *
         * Can only be called by Root origin.
         */
        edit: TxDescriptor<Anonymize<I50dt84l38nc68>>;
        /**
         * Withdraw full balance of the parachain.
         * - `index`: The parachain to whose crowdloan the contribution was made.
         */
        withdraw: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
        
         */
        refund: TxDescriptor<Anonymize<I87diq5b0qic4c>>;
        /**
        
         */
        redeem: TxDescriptor<Anonymize<I1j6hllalj2epr>>;
        /**
         * Remove a fund after the retirement period has ended and all funds have been returned.
         */
        dissolve_refunded: TxDescriptor<Anonymize<I1d28k4v5qap3a>>;
        /**
         * Remove a fund after the retirement period has ended and all funds have been returned.
         */
        dissolve: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
        
         */
        buyback_vstoken_by_stable_pool: TxDescriptor<Anonymize<Iv901693moogd>>;
    };
    AssetRegistry: {
        /**
        
         */
        register_token_metadata: TxDescriptor<Anonymize<I1n28f4ceil09b>>;
        /**
        
         */
        register_vtoken_metadata: TxDescriptor<Anonymize<Ieq8j5nmk3i7o0>>;
        /**
        
         */
        register_location: TxDescriptor<Anonymize<Idocritbkcpmn3>>;
        /**
        
         */
        force_set_location: TxDescriptor<Anonymize<Idocritbkcpmn3>>;
        /**
        
         */
        update_currency_metadata: TxDescriptor<Anonymize<I110m02ast38uc>>;
    };
    VtokenMinting: {
        /**
         * Mint v_currency by transferring currency to entrance_account.
         * The minted v_currency will be deposited to the minter's account.
         * Parameters:
         * - `currency_id`: The currency to mint.
         * - `currency_amount`: The amount of currency to mint.
         * - `remark`: The remark of minting.
         * - `channel_id`: The channel id of minting.
         */
        mint: TxDescriptor<Anonymize<I6l1cgblde3oca>>;
        /**
         * Redeem currency by burning v_currency. But need to wait for the unlock period.
         * The redeemed currency will be transferred to the redeemer's account.
         * Parameters:
         * - `v_currency_id`: The v_currency to redeem.
         * - `v_currency_amount`: The amount of v_currency to redeem.
         */
        redeem: TxDescriptor<Anonymize<Ib36ct6b1t9nk>>;
        /**
         * Already redeemed currency by burning v_currency. But need to wait for the unlock period.
         * In unlock period, you call rebond to cancel the redeem.
         * Parameters:
         * - `currency_id`: The currency to rebond.
         * - `currency_amount`: The amount of currency to rebond. The amount should be less than or
         * equal to the redeem amount.
         */
        rebond: TxDescriptor<Anonymize<Icmnhhde8qv456>>;
        /**
         * Same function as Rebond. But need to provide unlock_id.
         * Parameters:
         * - `currency_id`: The currency to rebond.
         * - `unlock_id`: The unlock_id to rebond.
         */
        rebond_by_unlock_id: TxDescriptor<Anonymize<Ibsdha57fv3ssk>>;
        /**
         * Set the unlock duration for a currency.
         * Parameters:
         * - `currency_id`: The currency to set unlock duration.
         * - `unlock_duration`: The unlock duration to set.
         */
        set_unlock_duration: TxDescriptor<Anonymize<I95h8ge6oaumen>>;
        /**
         * Set the minimum mint amount for a currency.
         * Parameters:
         * - `currency_id`: The currency to set minimum mint amount.
         * - `minimum_amount`: The minimum mint amount to set.
         */
        set_minimum_mint: TxDescriptor<Anonymize<I9gla6h44u54mh>>;
        /**
         * Set the minimum redeem amount for a currency.
         * Parameters:
         * - `currency_id`: The currency to set minimum redeem amount.
         * - `minimum_amount`: The minimum redeem amount to set.
         */
        set_minimum_redeem: TxDescriptor<Anonymize<I9gla6h44u54mh>>;
        /**
         * Support a token to rebond.
         * Parameters:
         * - `currency_id`: The currency to support rebond.
         */
        add_support_rebond_token: TxDescriptor<Anonymize<I6dlum3cbrie3d>>;
        /**
         * Remove the support of a token to rebond.
         * Parameters:
         * - `currency_id`: The currency to remove support rebond.
         */
        remove_support_rebond_token: TxDescriptor<Anonymize<I6dlum3cbrie3d>>;
        /**
         * Set the fees for mint and redeem.
         * Parameters:
         * - `mint_fee`: The fee for mint.
         * - `redeem_fee`: The fee for redeem.
         */
        set_fees: TxDescriptor<Anonymize<Idkdd97l7v4t7o>>;
        /**
         * Set the hook iteration limit.
         * Parameters:
         * - `limit`: The hook iteration limit.
         */
        set_hook_iteration_limit: TxDescriptor<Anonymize<Iamlqp3gs21baf>>;
        /**
         * Set the total amount of tokens that are currently locked for unlocking.
         * Parameters:
         * - `currency_id`: The currency to set unlocking total.
         * - `currency_amount`: The total amount of tokens that are currently locked for unlocking.
         */
        set_unlocking_total: TxDescriptor<Anonymize<Icmnhhde8qv456>>;
        /**
         * Set the minimum time unit for a currency.
         * Parameters:
         * - `currency_id`: The currency to set minimum time unit.
         * - `time_unit`: The minimum time unit to set.
         */
        set_min_time_unit: TxDescriptor<Anonymize<I4qh6vjmbpl1a6>>;
        /**
         * Set the ongoing time unit for a currency.
         * Parameters:
         * - `currency_id`: The currency to set ongoing time unit.
         * - `time_unit`: The ongoing time unit to set.
         */
        set_ongoing_time_unit: TxDescriptor<Anonymize<I4qh6vjmbpl1a6>>;
        /**
        
         */
        mint_with_lock: TxDescriptor<Anonymize<I6l1cgblde3oca>>;
        /**
         * Unlock the vtoken minted in an incentive mode
         * Parameters:
         * - `v_currency_id`: The v_currency to unlock.
         */
        unlock_incentive_minted_vtoken: TxDescriptor<Anonymize<Ibanc56kjmq87v>>;
        /**
         * Set the incentive coefficient for a vtoken when minted in an incentive mode
         * Parameters:
         * - `v_currency_id`: The v_currency to set incentive coefficient.
         * - `new_coef_op`: The new incentive coefficient to set.
         */
        set_incentive_coef: TxDescriptor<Anonymize<I8c1fkgvmb93fs>>;
        /**
         * Set the locked blocks for a vtoken when minted in an incentive mode
         * Parameters:
         * - `v_currency_id`: The v_currency to set locked blocks.
         * - `new_blockes_op`: The new locked blocks to set.
         */
        set_vtoken_incentive_lock_blocks: TxDescriptor<Anonymize<I30ffpa0bknqur>>;
        /**
         * Set Supported eths.
         * Parameters:
         * - `eths`: The supported eths.
         */
        set_supported_eth: TxDescriptor<Anonymize<Ifsksfqf7mb05t>>;
        /**
         * Set VToken issuance for exchange rate calculation.
         * This allows adjustment of the tracked vtoken issuance to handle cases where
         * vtokens might be burned on the Bifrost chain.
         * Parameters:
         * - `v_currency_id`: The v_currency to set issuance for.
         * - `adjustment`: The amount to adjust (positive to increase, negative to decrease).
         */
        set_v_currency_issuance: TxDescriptor<Anonymize<I33nmjabk01dfi>>;
    };
    Slp: {
        /**
         * *****************************
         * ****** Outer Calls ******
         * *****************************
         *
         * Delegator initialization work. Generate a new delegator and return its ID.
         */
        initialize_delegator: TxDescriptor<Anonymize<I8sqvh22141fr8>>;
        /**
         * First time bonding some amount to a delegator.
         */
        bond: TxDescriptor<Anonymize<I8vcp3s3t1r7ti>>;
        /**
         * Bond extra amount to a delegator.
         */
        bond_extra: TxDescriptor<Anonymize<I8vcp3s3t1r7ti>>;
        /**
         * Decrease some amount to a delegator. Leave no less than the minimum delegator
         * requirement.
         */
        unbond: TxDescriptor<Anonymize<I8vcp3s3t1r7ti>>;
        /**
         * Unbond all the active amount of a delegator.
         */
        unbond_all: TxDescriptor<Anonymize<I94c4ugqtmf885>>;
        /**
         * Rebond some unlocking amount to a delegator.
         */
        rebond: TxDescriptor<Anonymize<I5g2ic5lk6jvap>>;
        /**
         * Delegate to some validator set.
         */
        delegate: TxDescriptor<Anonymize<I6aqijved7jgk9>>;
        /**
         * Re-delegate existing delegation to a new validator set.
         */
        undelegate: TxDescriptor<Anonymize<I6aqijved7jgk9>>;
        /**
         * Re-delegate existing delegation to a new validator set.
         */
        redelegate: TxDescriptor<Anonymize<I962vs596sggoi>>;
        /**
         * Initiate payout for a certain delegator.
         */
        payout: TxDescriptor<Anonymize<I8ln2e9k7mblim>>;
        /**
         * Withdraw the due payout into free balance.
         */
        liquidize: TxDescriptor<Anonymize<I1pqjsjhm82q1i>>;
        /**
         * Initiate payout for a certain delegator.
         */
        chill: TxDescriptor<Anonymize<I94c4ugqtmf885>>;
        /**
        
         */
        transfer_back: TxDescriptor<Anonymize<I8rn283dnm6h0f>>;
        /**
        
         */
        transfer_to: TxDescriptor<Anonymize<Ibu6i8jb58o30n>>;
        /**
        
         */
        convert_asset: TxDescriptor<Anonymize<I8jm0ov76tih8s>>;
        /**
        
         */
        increase_token_pool: TxDescriptor<Anonymize<Ic7aob2k1l1jfu>>;
        /**
        
         */
        decrease_token_pool: TxDescriptor<Anonymize<Ic7aob2k1l1jfu>>;
        /**
        
         */
        update_ongoing_time_unit: TxDescriptor<Anonymize<I4qh6vjmbpl1a6>>;
        /**
        
         */
        refund_currency_due_unbond: TxDescriptor<Anonymize<I6dlum3cbrie3d>>;
        /**
        
         */
        supplement_fee_reserve: TxDescriptor<Anonymize<Iecuv9eudhio5i>>;
        /**
         * Charge staking host fee, tune vtoken/token exchange rate, and update delegator ledger
         * for single delegator.
         */
        charge_host_fee_and_tune_vtoken_exchange_rate: TxDescriptor<Anonymize<Ieh9ab34fgqfvc>>;
        /**
         * *****************************
         * ****** Storage Setters ******
         * *****************************
         * Update storage OperateOrigins<T>.
         */
        set_operate_origin: TxDescriptor<Anonymize<I2i20t4file901>>;
        /**
         * Update storage FeeSources<T>.
         */
        set_fee_source: TxDescriptor<Anonymize<Inp8hn3mu8c5j>>;
        /**
         * Update storage DelegatorsIndex2Multilocation<T> 和 DelegatorsMultilocation2Index<T>.
         */
        add_delegator: TxDescriptor<Anonymize<I68o6mdp1r65np>>;
        /**
         * Update storage DelegatorsIndex2Multilocation<T> 和 DelegatorsMultilocation2Index<T>.
         */
        remove_delegator: TxDescriptor<Anonymize<Iaba972j3va7k>>;
        /**
         * Update storage Validators<T>.
         */
        add_validator: TxDescriptor<Anonymize<Iaba972j3va7k>>;
        /**
         * Update storage Validators<T>.
         */
        remove_validator: TxDescriptor<Anonymize<Iaba972j3va7k>>;
        /**
         * Update storage ValidatorsByDelegator<T>.
         */
        set_validators_by_delegator: TxDescriptor<Anonymize<Iffj0b5herq802>>;
        /**
         * Update storage DelegatorLedgers<T>.
         */
        set_delegator_ledger: TxDescriptor<Anonymize<I8ja7ceebpen3k>>;
        /**
         * Update storage MinimumsAndMaximums<T>.
         */
        set_minimums_and_maximums: TxDescriptor<Anonymize<Icikcphjk1igug>>;
        /**
         * Update storage Delays<T>.
         */
        set_currency_delays: TxDescriptor<Anonymize<Ibnl8raecejsmo>>;
        /**
         * Set HostingFees storage.
         */
        set_hosting_fees: TxDescriptor<Anonymize<I1ufkvgdurghbk>>;
        /**
         * Set  CurrencyTuneExchangeRateLimit<T> storage.
         */
        set_currency_tune_exchange_rate_limit: TxDescriptor<Anonymize<I1q1g69il2fc15>>;
        /**
         * Set  OngoingTimeUnitUpdateInterval<T> storage.
         */
        set_ongoing_time_unit_update_interval: TxDescriptor<Anonymize<I9ltv8jlv2map8>>;
        /**
        
         */
        add_supplement_fee_account_to_whitelist: TxDescriptor<Anonymize<Iaba972j3va7k>>;
        /**
        
         */
        remove_supplement_fee_account_from_whitelist: TxDescriptor<Anonymize<Iaba972j3va7k>>;
        /**
         * ********************************************************************
         * *************Outer Confirming Xcm queries functions ****************
         * ********************************************************************
         */
        confirm_delegator_ledger_query_response: TxDescriptor<Anonymize<Idlhavidu7pq4f>>;
        /**
        
         */
        fail_delegator_ledger_query_response: TxDescriptor<Anonymize<Idlhavidu7pq4f>>;
        /**
        
         */
        confirm_validators_by_delegator_query_response: TxDescriptor<Anonymize<Idlhavidu7pq4f>>;
        /**
        
         */
        fail_validators_by_delegator_query_response: TxDescriptor<Anonymize<Idlhavidu7pq4f>>;
        /**
        
         */
        confirm_delegator_ledger: TxDescriptor<Anonymize<I203ivdv9ll218>>;
        /**
        
         */
        confirm_validators_by_delegator: TxDescriptor<Anonymize<I203ivdv9ll218>>;
        /**
         * Reset the whole storage Validators<T>.
         */
        reset_validators: TxDescriptor<Anonymize<Id37b9l6bk2ii9>>;
        /**
         * Reset the whole storage Validator_boost_list<T>.
         */
        set_validator_boost_list: TxDescriptor<Anonymize<Id37b9l6bk2ii9>>;
        /**
        
         */
        add_to_validator_boost_list: TxDescriptor<Anonymize<Iaba972j3va7k>>;
        /**
         * Update storage Validator_boost_list<T>.
         */
        remove_from_validator_boot_list: TxDescriptor<Anonymize<Iaba972j3va7k>>;
        /**
        
         */
        convert_treasury_vtoken: TxDescriptor<Anonymize<I58caqa2hcp37r>>;
        /**
        
         */
        clean_outdated_validator_boost_list: TxDescriptor<Anonymize<I9thv3jvjv8nr9>>;
    };
    XcmInterface: {
        /**
         * Sets the xcm_dest_weight and fee for XCM operation of XcmInterface.
         *
         * Parameters:
         * - `updates`: vec of tuple: (XcmOperationType, WeightChange, FeeChange).
         */
        update_xcm_dest_weight_and_fee: TxDescriptor<Anonymize<I5lkkn2erim0mo>>;
        /**
        
         */
        transfer_ethereum_assets: TxDescriptor<Anonymize<Id57q643bc33er>>;
    };
    TokenConversion: {
        /**
        
         */
        vsbond_convert_to_vstoken: TxDescriptor<Anonymize<I3tgr4mij0dq9t>>;
        /**
        
         */
        vstoken_convert_to_vsbond: TxDescriptor<Anonymize<Ic6tc8uub7lssk>>;
        /**
        
         */
        set_exchange_fee: TxDescriptor<Anonymize<I7dim4s22d4cc>>;
        /**
        
         */
        set_exchange_rate: TxDescriptor<Anonymize<I9adoavqh7j1qm>>;
        /**
        
         */
        set_relaychain_lease: TxDescriptor<Anonymize<I2cnb8psb4ovvm>>;
    };
    Farming: {
        /**
         * Create a farming pool.
         *
         * The state of the pool will be set to `Ongoing` if the current block number is greater
         * than or equal to the field `after_block_to_start` or the total shares of the pool is
         * greater than or equal to the field `min_deposit_to_start`.
         *
         * - `tokens_proportion`: The proportion of each token in the pool.
         * - `basic_rewards`: The basic reward of each token in the pool.
         * - `gauge_init`: The initial gauge pool info.
         * - `min_deposit_to_start`: The minimum deposit to start the pool.
         * - `after_block_to_start`: The block number to start the pool.
         * - `withdraw_limit_time`: The block number to limit the withdraw.
         * - `claim_limit_time`: The block number to limit the claim.
         * - `withdraw_limit_count`: The count to limit the withdraw.
         */
        create_farming_pool: TxDescriptor<Anonymize<I3frfca3bu3qda>>;
        /**
         * Charge the pool.
         *
         * Transfer the rewards from the exchanger to the pool. It will charge the rewards to the
         * gauge pool if the `if_gauge` is true, otherwise it will charge the rewards to the
         * farming pool.
         *
         * - `pid`: The pool id.
         * - `rewards`: The rewards to charge.
         * - `if_gauge`: If the rewards are for the gauge pool.
         */
        charge: TxDescriptor<Anonymize<I6bbnnm10sc5a6>>;
        /**
         * Deposit the pool.
         *
         * Mint the share to the exchanger and transfer the tokens to the pool. The state of the
         * pool should be `Ongoing` or `Charged`. The current block number should be greater than
         * or equal to the field `after_block_to_start` if the state of the pool is `Charged`.
         *
         * - `pid`: The pool id.
         * - `add_value`: The value to deposit.
         */
        deposit: TxDescriptor<Anonymize<I1ecpbq2c6b4si>>;
        /**
         * Withdraw from the pool.
         *
         * The state of the pool should be `Ongoing`, `Charged` or `Dead`.
         * User's withdraw limit count should be less than the field `withdraw_limit_count`.
         * It will remove the share from the user, but not transfer the tokens to the user
         * immediately.
         *
         * - `pid`: The pool id.
         * - `remove_value`: The value to withdraw.
         */
        withdraw: TxDescriptor<Anonymize<Ii1jr958aef3t>>;
        /**
         * Claim the rewards from the pool.
         *
         * The state of the pool should be `Ongoing` or `Dead`.
         * The user should not claim the rewards within the field `claim_limit_time`.
         * It will claim the rewards to the user, and transfer the tokens to the user immediately.
         *
         * - `pid`: The pool id.
         */
        claim: TxDescriptor<Anonymize<Ier970hnn9pgrj>>;
        /**
         * Withdraw the claim from the pool.
         *
         * It will immediately transfer the withdrawable tokens to the user.
         *
         * - `pid`: The pool id.
         */
        withdraw_claim: TxDescriptor<Anonymize<Ier970hnn9pgrj>>;
        /**
         * Force retire the pool.
         *
         * The state of the pool should be `Dead`.
         * It will retire the pool and transfer the withdrawable tokens to the users.
         *
         * - `pid`: The pool id.
         */
        force_retire_pool: TxDescriptor<Anonymize<Ier970hnn9pgrj>>;
        /**
         * Set the retire limit.
         *
         * - `limit`: The retire limit.
         */
        set_retire_limit: TxDescriptor<Anonymize<Iamlqp3gs21baf>>;
        /**
         * Close the pool.
         *
         * Change the state of the pool to `Dead` before retiring the pool.
         *
         * - `pid`: The pool id.
         */
        close_pool: TxDescriptor<Anonymize<Ier970hnn9pgrj>>;
        /**
         * Reuse retired pools
         *
         * - `pid`: The pool id.
         * - `basic_rewards`: The basic reward of each token in the pool.
         * - `min_deposit_to_start`: The minimum deposit to start the pool.
         * - `after_block_to_start`: The block number to start the pool.
         * - `withdraw_limit_time`: The block number to limit the withdraw.
         * - `claim_limit_time`: The block number to limit the claim.
         * - `withdraw_limit_count`: The count to limit the withdraw.
         * - `gauge_init`: The initial gauge pool info.
         */
        reset_pool: TxDescriptor<Anonymize<I7ee2c04njh4lr>>;
        /**
         * Kill the pool after retired.
         *
         * - `pid`: The pool id.
         */
        kill_pool: TxDescriptor<Anonymize<Ier970hnn9pgrj>>;
        /**
         * Edit the pool at the state of `Retired`, `Ongoing`, `Charged` or `UnCharged`.
         */
        edit_pool: TxDescriptor<Anonymize<Ido82tngjj5jid>>;
        /**
         * Force claim the rewards from the gauge pool.
         *
         * Control origin can force claim the rewards from the gauge pool to the users.
         *
         * - `gid`: The gauge pool id.
         */
        force_gauge_claim: TxDescriptor<Anonymize<Ial5va0b0vs25o>>;
        /**
         * Add whitelist and take effect immediately
         *
         * - `whitelist`: The whitelist to add
         */
        add_boost_pool_whitelist: TxDescriptor<Anonymize<Icm2mv7tlmp1c3>>;
        /**
         * Whitelist for next round in effect
         *
         * - `whitelist`: The whitelist for the next round
         */
        set_next_round_whitelist: TxDescriptor<Anonymize<Icm2mv7tlmp1c3>>;
        /**
         * Vote for the pool
         *
         * - `vote_list`: The vote list for the pool
         */
        vote: TxDescriptor<Anonymize<I821qafgn89idd>>;
        /**
         * Start the boost round
         *
         * - `round_length`: The length of the round
         */
        start_boost_round: TxDescriptor<Anonymize<Icn7fuqv1aq0de>>;
        /**
         * Force end of boost round
         */
        end_boost_round: TxDescriptor<undefined>;
        /**
         * Charge the boost rewards to the FarmingBoost account
         *
         * - `rewards`: The rewards to charge
         */
        charge_boost: TxDescriptor<Anonymize<Ifift2upjktcjs>>;
        /**
        
         */
        refresh: TxDescriptor<undefined>;
    };
    SystemStaking: {
        /**
         * Update token config，take effect when next round begins
         */
        token_config: TxDescriptor<Anonymize<I4n73j5spt03js>>;
        /**
         * Update token config，take effect when next round begins
         */
        delete_token: TxDescriptor<Anonymize<Ibmoqhjadutned>>;
        /**
         * refresh token info，query farming pallet, and update TokenInfo, change to new
         * config，ignore exec_delay, execute immediately
         */
        refresh_token_info: TxDescriptor<Anonymize<Ibmoqhjadutned>>;
        /**
         * payout to receiving account
         */
        payout: TxDescriptor<Anonymize<Ibmoqhjadutned>>;
    };
    FeeShare: {
        /**
         * Create a distribution
         *
         * - `token_type`: The token types involved in this distribution
         * - `tokens_proportion`: The proportion of the token distribution
         * - `if_auto`: Whether the distribution is automatic
         */
        create_distribution: TxDescriptor<Anonymize<Ieob0gouehce57>>;
        /**
         * Edit the distribution
         *
         * - `distribution_id`: Distribution ID
         * - `token_type`: The token types involved in this distribution
         * - `tokens_proportion`: The proportion of the token distribution
         * - `if_auto`: Whether the distribution is automatic
         */
        edit_distribution: TxDescriptor<Anonymize<I8eo9r9va149i7>>;
        /**
         * Set the era length
         *
         * - `era_length`: The interval between distribution executions
         */
        set_era_length: TxDescriptor<Anonymize<Iaeor8vejoqk4d>>;
        /**
         * Execute the distribution
         *
         * - `distribution_id`: Distribution ID
         */
        execute_distribute: TxDescriptor<Anonymize<I6d2fsv919ackd>>;
        /**
         * Delete the distribution
         *
         * - `distribution_id`: Distribution ID
         */
        delete_distribution: TxDescriptor<Anonymize<I6d2fsv919ackd>>;
        /**
         * USD Standard Accumulation Logic Configuration, can be overridden by the governance
         *
         * - `distribution_id`: Distribution ID
         * - `target_value`: Target's USD based value
         * - `interval`: The interval of the cumulative clearing operation
         * - `target_account_id`: When the cumulative dollar value falls below the target_value,
         * the funds will be transferred to the target_account_id
         */
        set_usd_config: TxDescriptor<Anonymize<I65sao41nc2u5n>>;
    };
    CrossInOut: {
        /**
         * Destroy some balance from an account and issue cross-out event.
         */
        cross_out: TxDescriptor<Anonymize<Ic7aob2k1l1jfu>>;
        /**
        
         */
        register_linked_account: TxDescriptor<Anonymize<Idraqa5k2q8rna>>;
        /**
        
         */
        change_outer_linked_account: TxDescriptor<Anonymize<Iclh6ip7gld2up>>;
        /**
        
         */
        deregister_currency_for_cross_in_out: TxDescriptor<Anonymize<I6dlum3cbrie3d>>;
        /**
        
         */
        add_to_register_whitelist: TxDescriptor<Anonymize<Iapol5cojcq8jr>>;
        /**
        
         */
        remove_from_register_whitelist: TxDescriptor<Anonymize<Iapol5cojcq8jr>>;
        /**
        
         */
        set_crossing_minimum_amount: TxDescriptor<Anonymize<Iarqih3rei93nj>>;
    };
    BbBNC: {
        /**
         * Set configuration.
         *
         * Set the minimum number of tokens and minimum time that users can lock.
         *
         * - `min_mint`: The minimum mint balance
         * - `min_block`: The minimum lockup time
         */
        set_config: TxDescriptor<Anonymize<Iadml5h1l6pdhd>>;
        /**
         * Create a lock.
         *
         * If the signer already has a position, the position will not be extended. it will be
         * created a new position until the maximum number of positions is reached.
         *
         * - `value`: The amount of tokens to lock
         * - `unlock_time`: The lockup time
         */
        create_lock: TxDescriptor<Anonymize<I4q8h00pii12o3>>;
        /**
         * Increase the lock amount.
         *
         * If the signer does not have the position, it doesn't work and the position will not be
         * created. Only the position existed and owned by the signer, the locking amount will be
         * increased.
         *
         * - `position`: The lock position
         * - `value`: The amount of tokens to increase
         */
        increase_amount: TxDescriptor<Anonymize<I5odhhedphq5gh>>;
        /**
         * Increase the unlock time.
         *
         * If the signer does not have the position, it doesn't work and the position will not be
         * created. Only the position existed and owned by the signer, the locking time will be
         * increased.
         *
         * - `position`: The lock position
         * - `time`: Additional lock time
         */
        increase_unlock_time: TxDescriptor<Anonymize<Iej62b4o01n76s>>;
        /**
         * Withdraw the locked tokens after unlock time.
         *
         * - `position`: The lock position
         */
        withdraw: TxDescriptor<Anonymize<Icni4v52b04265>>;
        /**
         * Notify rewards.
         *
         * Set the incentive controller and rewards token type for future round. Reward duration
         * should be one round interval. It will notify the rewards from incentive controller to
         * the system account and start a new round immediately, and the next round will auto start
         * at now + rewards_duration.
         *
         * - `incentive_from`: The incentive controller
         * - `rewards_duration`: The rewards duration
         * - `rewards`: The rewards
         */
        notify_rewards: TxDescriptor<Anonymize<I30l5icl49p3tp>>;
        /**
         * Get rewards for the signer.
         */
        get_rewards: TxDescriptor<undefined>;
        /**
         * Fast unlocking, handling fee applies
         *
         * When users want to redeem early regardless of cost, they can use this call.
         *
         * - `position`: The lock position
         */
        redeem_unlock: TxDescriptor<Anonymize<Icni4v52b04265>>;
        /**
         * Set markup configurations.
         *
         * - `currency_id`: The token type
         * - `markup`: The markup coefficient
         * - `hardcap`: The markup hardcap
         */
        set_markup_coefficient: TxDescriptor<Anonymize<I53fuja41j7ro>>;
        /**
         * Deposit markup.
         *
         * Deposit the token to the system account for the markup.
         *
         * - `currency_id`: The token type
         * - `value`: The amount of tokens to deposit
         */
        deposit_markup: TxDescriptor<Anonymize<I6e7p4l5e6t7n6>>;
        /**
         * Withdraw markup.
         *
         * Withdraw the token from the system account for the markup.
         *
         * - `currency_id`: The token type
         */
        withdraw_markup: TxDescriptor<Anonymize<I6dlum3cbrie3d>>;
        /**
         * Refresh the markup.
         *
         * Any user can call this function to refresh the markup coefficient. The maximum number of
         * accounts that can be refreshed in one execution is MarkupRefreshLimit.
         *
         * - `currency_id`: The token type
         */
        refresh: TxDescriptor<Anonymize<I6dlum3cbrie3d>>;
    };
    Slpx: {
        /**
         * vtoken mint and transfer to target chain
         * Parameters:
         * - `currency_id`: The currency id of the token to be minted
         * - `currency_amount`: The amount of the token to be minted
         * - `target_chain`: The target chain to transfer the token to
         * - `remark`: The remark of the order
         * - `channel_id`: The channel id of the order
         */
        mint: TxDescriptor<Anonymize<Ib400dopju2fto>>;
        /**
         * vtoken redeem and transfer to target chain
         * Parameters:
         * - `v_currency_id`: The currency id of the vtoken to be redeemed
         * - `v_currency_amount`: The amount of the vtoken to be redeemed
         * - `target_chain`: The target chain to transfer the token to
         */
        redeem: TxDescriptor<Anonymize<I1v5t6dj5g22i2>>;
        /**
         * Add the contract account to the whitelist
         * Parameters:
         * - `support_chain`: The support chain of Slpx
         * - `contract_address`: The contract address of the contract
         */
        add_whitelist: TxDescriptor<Anonymize<I7idb2fg10ips5>>;
        /**
         * Remove the contract account from the whitelist
         * Parameters:
         * - `support_chain`: The support chain of Slpx
         * - `contract_address`: The contract address of the contract
         */
        remove_whitelist: TxDescriptor<Anonymize<I7idb2fg10ips5>>;
        /**
         * Set the execution fee for the currency
         * Parameters:
         * - `currency_id`: The currency id of the token
         * - `execution_fee`: The execution fee of the token
         */
        set_execution_fee: TxDescriptor<Anonymize<I7u9oegj4csj51>>;
        /**
         * Set the transfer fee for the currency
         * Parameters:
         * - `support_chain`: The support chain of Slpx
         * - `transfer_to_fee`: The transfer fee of the token
         */
        set_transfer_to_fee: TxDescriptor<Anonymize<I6s65kicknm51n>>;
        /**
         * Set the currency to support the Ethereum call switch
         * Parameters:
         * - `currency_id`: The currency id of the token
         * - `is_support`: Whether to support the Ethereum call switch
         */
        support_xcm_oracle: TxDescriptor<Anonymize<Ifuaakr3i6qaje>>;
        /**
         * Set the Ethereum call configuration
         * Parameters:
         * - `xcm_fee`: The XCM fee of Sending Xcm
         * - `xcm_weight`: The XCM weight of Sending Xcm
         * - `period`: The period of Sending Xcm
         * - `contract`: The address of XcmOracle
         */
        set_xcm_oracle_configuration: TxDescriptor<Anonymize<I792urf76hgnm9>>;
        /**
         * Set the currency to support the XCM fee
         * Parameters:
         * - `currency_id`: The currency id of the token
         * - `is_support`: Whether to support the XCM fee
         */
        set_currency_support_xcm_fee: TxDescriptor<Anonymize<Ifuaakr3i6qaje>>;
        /**
         * Set the delay block, Order will be executed after the delay block.
         * Parameters:
         * - `delay_block`: The delay block
         */
        set_delay_block: TxDescriptor<Anonymize<I7j4i782lpafvm>>;
        /**
         * Force add order
         * Parameters:
         * - `source_chain_caller`: The caller of the source chain
         * - `bifrost_chain_caller`: The caller of the bifrost chain
         * - `currency_id`: The currency id of the token
         * - `target_chain`: The target chain to transfer the token to
         * - `remark`: The remark of the order
         * - `channel_id`: The channel id of the order
         */
        force_add_order: TxDescriptor<Anonymize<If6ndkvmfijbvo>>;
        /**
         * vtoken mint and transfer to target chain
         * Parameters:
         * - `evm_caller`: The caller of the EVM contract
         * - `currency_id`: The currency id of the token to be minted
         * - `target_chain`: The target chain to transfer the token to
         * - `remark`: The remark of the order
         * - `channel_id`: The channel id of the order
         */
        mint_with_channel_id: TxDescriptor<Anonymize<I3tnke0lsl8p00>>;
        /**
         * EVM create order
         * Parameters:
         * - `source_chain_caller`: The caller of the source chain
         * - `source_chain_id`: The source chain id
         * - `source_chain_block_number`: The source chain block number
         * - `currency_id`: The currency id of the token
         * - `currency_amount`: The currency amount of the token
         * - `send_to`: The target chain to transfer the token to
         * - `remark`: The remark of the order
         * - `channel_id`: The channel id of the order
         */
        evm_create_order: TxDescriptor<Anonymize<I9guvk97s8codm>>;
        /**
         * Parameters:
         * - `chain_id`: The chain id of destination chain
         * - `to`: The address of destination contract
         * - `timeout`: The timeout of the oracle
         * - `payer`: The payer of the oracle
         * - `fee`: The fee of the oracle
         * - `tokens`: The tokens of the oracle
         */
        set_hyperbridge_oracle: TxDescriptor<Anonymize<In9igsl3fgg3q>>;
        /**
         * Set Hydration Oracle Config
         * Parameters:
         * - `period`: The period of Sending Xcm
         * - `tokens`: The tokens of the oracle
         */
        set_hydration_oracle: TxDescriptor<Anonymize<I8lpggdq99dmfc>>;
        /**
         * Execute Async Mint
         */
        async_mint: TxDescriptor<Anonymize<I5q1a9s86bsjba>>;
        /**
         * Update Async Mint configuration
         */
        update_async_mint_config: TxDescriptor<Anonymize<If9ob1e8r14nrm>>;
        /**
         * Correct vToken reserves for Hyperbridge
         *
         * Parameters:
         * - `chain_id`: The target chain ID for correction
         * - `currency_id`: The currency ID of the vToken
         * - `amount`: The amount of vToken to mint and transfer
         */
        force_increase_hyperbridge_reserve: TxDescriptor<Anonymize<I8jbqjsr1ivn77>>;
        /**
         * Set Hyperbridge fee exempt accounts
         *
         * Parameters:
         * - `accounts`: The accounts to exempt from Hyperbridge fee
         */
        set_hyperbridge_fee_exempt_accounts: TxDescriptor<Anonymize<I9gel4bv68gacj>>;
    };
    FellowshipCollective: {
        /**
         * Introduce a new member.
         *
         * - `origin`: Must be the `AddOrigin`.
         * - `who`: Account of non-member which will become a member.
         *
         * Weight: `O(1)`
         */
        add_member: TxDescriptor<Anonymize<Icu8seopr711dn>>;
        /**
         * Increment the rank of an existing member by one.
         *
         * - `origin`: Must be the `PromoteOrigin`.
         * - `who`: Account of existing member.
         *
         * Weight: `O(1)`
         */
        promote_member: TxDescriptor<Anonymize<Icu8seopr711dn>>;
        /**
         * Decrement the rank of an existing member by one. If the member is already at rank zero,
         * then they are removed entirely.
         *
         * - `origin`: Must be the `DemoteOrigin`.
         * - `who`: Account of existing member of rank greater than zero.
         *
         * Weight: `O(1)`, less if the member's index is highest in its rank.
         */
        demote_member: TxDescriptor<Anonymize<Icu8seopr711dn>>;
        /**
         * Remove the member entirely.
         *
         * - `origin`: Must be the `RemoveOrigin`.
         * - `who`: Account of existing member of rank greater than zero.
         * - `min_rank`: The rank of the member or greater.
         *
         * Weight: `O(min_rank)`.
         */
        remove_member: TxDescriptor<Anonymize<Iddd2a11b8876r>>;
        /**
         * Add an aye or nay vote for the sender to the given proposal.
         *
         * - `origin`: Must be `Signed` by a member account.
         * - `poll`: Index of a poll which is ongoing.
         * - `aye`: `true` if the vote is to approve the proposal, `false` otherwise.
         *
         * Transaction fees are be waived if the member is voting on any particular proposal
         * for the first time and the call is successful. Subsequent vote changes will charge a
         * fee.
         *
         * Weight: `O(1)`, less if there was no previous vote on the poll by the member.
         */
        vote: TxDescriptor<Anonymize<I8bvk21lpmah75>>;
        /**
         * Remove votes from the given poll. It must have ended.
         *
         * - `origin`: Must be `Signed` by any account.
         * - `poll_index`: Index of a poll which is completed and for which votes continue to
         * exist.
         * - `max`: Maximum number of vote items from remove in this call.
         *
         * Transaction fees are waived if the operation is successful.
         *
         * Weight `O(max)` (less if there are fewer items to remove than `max`).
         */
        cleanup_poll: TxDescriptor<Anonymize<I449n3riv6jbum>>;
        /**
         * Exchanges a member with a new account and the same existing rank.
         *
         * - `origin`: Must be the `ExchangeOrigin`.
         * - `who`: Account of existing member of rank greater than zero to be exchanged.
         * - `new_who`: New Account of existing member of rank greater than zero to exchanged to.
         */
        exchange_member: TxDescriptor<Anonymize<I72edo3nnc5ukn>>;
    };
    FellowshipReferenda: {
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
        submit: TxDescriptor<Anonymize<Ib9pt0t7gno7q4>>;
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
    StablePool: {
        /**
         * Creates a new liquidity pool with the specified parameters.
         */
        create_pool: TxDescriptor<Anonymize<I7m1ou0telopf8>>;
        /**
         * Adds liquidity to an existing pool.
         */
        add_liquidity: TxDescriptor<Anonymize<I4r3lr1hp3q5vu>>;
        /**
         * Swaps one asset for another in a specified pool.
         */
        swap: TxDescriptor<Anonymize<Ibqd4ibtu385pg>>;
        /**
         * Redeems a proportion of assets from a liquidity pool.
         */
        redeem_proportion: TxDescriptor<Anonymize<Id846uvbhv0ups>>;
        /**
         * Redeems a single asset from a liquidity pool.
         */
        redeem_single: TxDescriptor<Anonymize<Iel8d6vl7kun8s>>;
        /**
         * Redeems multiple assets from a liquidity pool.
         */
        redeem_multi: TxDescriptor<Anonymize<Ia5vm4875s01on>>;
        /**
         * Modifies the parameter 'a' of a pool at a future block.
         */
        modify_a: TxDescriptor<Anonymize<I1io386vc3pmlf>>;
        /**
         * Modifies the fees of a specified liquidity pool.
         */
        modify_fees: TxDescriptor<Anonymize<Idnoja8d5k0dtr>>;
        /**
         * Modifies the fee and yield recipients of a liquidity pool.
         */
        modify_recipients: TxDescriptor<Anonymize<I95j99jsac0h95>>;
        /**
         * Edits the token rates for the specified pool.
         */
        edit_token_rate: TxDescriptor<Anonymize<Idti8pnde3jga2>>;
        /**
         * Configures the auto-refresh settings for a given vToken.
         *
         * This method sets the hard cap for the specified vToken's token rate.
         * Only an authorized origin can call this function.
         */
        config_vtoken_auto_refresh: TxDescriptor<Anonymize<Icu74rtf3kd9gd>>;
        /**
         * Removes the auto-refresh configuration for a given vToken.
         *
         * This method deletes the hard cap setting for the specified vToken.
         * Only an authorized origin can call this function.
         */
        remove_vtoken_auto_refresh: TxDescriptor<Anonymize<I8v7akpi7cdcp5>>;
    };
    VtokenVoting: {
        /**
        
         */
        vote: TxDescriptor<Anonymize<I7826235520epg>>;
        /**
         * If poll_index exists, it indicates a normal voting user; if it is None,
         * it indicates a proxy voting user.
         */
        unlock: TxDescriptor<Anonymize<I495l5qf52l5ch>>;
        /**
        
         */
        remove_delegator_vote: TxDescriptor<Anonymize<Ibtoub2npklubb>>;
        /**
        
         */
        kill_referendum: TxDescriptor<Anonymize<Iaj42ghmtrj594>>;
        /**
        
         */
        add_delegator: TxDescriptor<Anonymize<Iefli0cgm44m3b>>;
        /**
        
         */
        set_referendum_status: TxDescriptor<Anonymize<Iaij9kantm3v0b>>;
        /**
        
         */
        set_vote_locking_period: TxDescriptor<Anonymize<I8l8g9smisvqei>>;
        /**
        
         */
        set_undeciding_timeout: TxDescriptor<Anonymize<I2ce5d3bnbbfhi>>;
        /**
        
         */
        notify_vote: TxDescriptor<Anonymize<Iasr6pj6shs0fl>>;
        /**
        
         */
        notify_remove_delegator_vote: TxDescriptor<Anonymize<Iasr6pj6shs0fl>>;
        /**
        
         */
        set_vote_cap_ratio: TxDescriptor<Anonymize<Ifuh1k8nfv6s7l>>;
        /**
         * Updates the status of a referendum vote.
         *
         * Emits an `ReferendumStatusUpdated` event if successful.
         */
        update_referendum_vote_status: TxDescriptor<Anonymize<Ict2ktlupdmfrm>>;
        /**
        
         */
        delegate: TxDescriptor<Anonymize<Idghtot34d3hq8>>;
        /**
        
         */
        undelegate: TxDescriptor<Anonymize<I8v7akpi7cdcp5>>;
        /**
        
         */
        delegate_vote: TxDescriptor<Anonymize<I7826235520epg>>;
    };
    LendMarket: {
        /**
         * Stores a new market and its related currency. Returns `Err` if a currency
         * is not attached to an existent market.
         *
         * All provided market states must be `Pending`, otherwise an error will be returned.
         *
         * If a currency is already attached to a market, then the market will be replaced
         * by the new provided value.
         *
         * The lend token id and asset id are bound, the lend token id of new provided market
         * cannot be duplicated with the existing one, otherwise it will return
         * `InvalidLendTokenId`.
         *
         * - `asset_id`: Market related currency
         * - `market`: The market that is going to be stored
         */
        add_market: TxDescriptor<Anonymize<I5uf09856s8hsn>>;
        /**
         * Activates a market. Returns `Err` if the market currency does not exist.
         *
         * If the market is already activated, does nothing.
         *
         * - `asset_id`: Market related currency
         */
        activate_market: TxDescriptor<Anonymize<If0uionjq98ocd>>;
        /**
         * Updates the rate model of a stored market. Returns `Err` if the market
         * currency does not exist or the rate model is invalid.
         *
         * - `asset_id`: Market related currency
         * - `rate_model`: The new rate model to be updated
         */
        update_rate_model: TxDescriptor<Anonymize<I2lb07lr6m4m1b>>;
        /**
         * Updates a stored market. Returns `Err` if the market currency does not exist.
         *
         * - `asset_id`: market related currency
         * - `collateral_factor`: the collateral utilization ratio
         * - `reserve_factor`: fraction of interest currently set aside for reserves
         * - `close_factor`: maximum liquidation ratio at one time
         * - `liquidate_incentive`: liquidation incentive ratio
         * - `cap`: market capacity
         */
        update_market: TxDescriptor<Anonymize<Ienmtmhvu9c5gc>>;
        /**
         * Force updates a stored market. Returns `Err` if the market currency
         * does not exist.
         *
         * - `asset_id`: market related currency
         * - `market`: the new market parameters
         */
        force_update_market: TxDescriptor<Anonymize<I5uf09856s8hsn>>;
        /**
         * Add reward for the pallet account.
         *
         * - `amount`: Reward amount added
         */
        add_reward: TxDescriptor<Anonymize<I3qt1hgg4djhgb>>;
        /**
         * Withdraw reward token from pallet account.
         *
         * The origin must conform to `UpdateOrigin`.
         *
         * - `target_account`: account receive reward token.
         * - `amount`: Withdraw amount
         */
        withdraw_missing_reward: TxDescriptor<Anonymize<I153e8dbo2i3pv>>;
        /**
         * Updates reward speed for the specified market
         *
         * The origin must conform to `UpdateOrigin`.
         *
         * - `asset_id`: Market related currency
         * - `reward_per_block`: reward amount per block.
         */
        update_market_reward_speed: TxDescriptor<Anonymize<Ilat0prj8bnun>>;
        /**
         * Claim reward from all market.
         */
        claim_reward: TxDescriptor<undefined>;
        /**
         * Claim reward from the specified market.
         *
         * - `asset_id`: Market related currency
         */
        claim_reward_for_market: TxDescriptor<Anonymize<If0uionjq98ocd>>;
        /**
         * Sender supplies assets into the market and receives internal supplies in exchange.
         *
         * - `asset_id`: the asset to be deposited.
         * - `mint_amount`: the amount to be deposited.
         */
        mint: TxDescriptor<Anonymize<Ic9p67gsdqt1ro>>;
        /**
         * Sender redeems some of internal supplies in exchange for the underlying asset.
         *
         * - `asset_id`: the asset to be redeemed.
         * - `redeem_amount`: the amount to be redeemed.
         */
        redeem: TxDescriptor<Anonymize<I158shpkf1icfg>>;
        /**
         * Sender redeems all of internal supplies in exchange for the underlying asset.
         *
         * - `asset_id`: the asset to be redeemed.
         */
        redeem_all: TxDescriptor<Anonymize<If0uionjq98ocd>>;
        /**
         * Sender borrows assets from the protocol to their own address.
         *
         * - `asset_id`: the asset to be borrowed.
         * - `borrow_amount`: the amount to be borrowed.
         */
        borrow: TxDescriptor<Anonymize<I2kudr318ju7fu>>;
        /**
         * Sender repays some of their debts.
         *
         * - `asset_id`: the asset to be repaid.
         * - `repay_amount`: the amount to be repaid.
         */
        repay_borrow: TxDescriptor<Anonymize<I3chmoe7ts2vks>>;
        /**
         * Sender repays all of their debts.
         *
         * - `asset_id`: the asset to be repaid.
         */
        repay_borrow_all: TxDescriptor<Anonymize<If0uionjq98ocd>>;
        /**
         * Set the collateral asset.
         *
         * - `asset_id`: the asset to be set.
         * - `enable`: turn on/off the collateral option.
         */
        collateral_asset: TxDescriptor<Anonymize<I533e8jlem55p4>>;
        /**
         * The sender liquidates the borrower's collateral.
         *
         * - `borrower`: the borrower to be liquidated.
         * - `liquidation_asset_id`: the assert to be liquidated.
         * - `repay_amount`: the amount to be repaid borrow.
         * - `collateral_asset_id`: The collateral to seize from the borrower.
         */
        liquidate_borrow: TxDescriptor<Anonymize<Iene1sabvs33in>>;
        /**
         * Add reserves by transferring from payer.
         *
         * May only be called from `T::ReserveOrigin`.
         *
         * - `payer`: the payer account.
         * - `asset_id`: the assets to be added.
         * - `add_amount`: the amount to be added.
         */
        add_reserves: TxDescriptor<Anonymize<I1j0vp2lik6fqa>>;
        /**
         * Reduces reserves by transferring to receiver.
         *
         * May only be called from `T::ReserveOrigin`.
         *
         * - `receiver`: the receiver account.
         * - `asset_id`: the assets to be reduced.
         * - `reduce_amount`: the amount to be reduced.
         */
        reduce_reserves: TxDescriptor<Anonymize<Ifgt33ij9dem7c>>;
        /**
         * Sender redeems some of internal supplies in exchange for the underlying asset.
         *
         * - `asset_id`: the asset to be redeemed.
         * - `redeem_amount`: the amount to be redeemed.
         */
        reduce_incentive_reserves: TxDescriptor<Anonymize<Ibt8nqfprp1t99>>;
        /**
         * Update liquidation free collateral.
         *
         * The `assets` won't be counted when do general
         */
        update_liquidation_free_collateral: TxDescriptor<Anonymize<Iap9nfjdhnmblj>>;
        /**
        
         */
        add_market_bond: TxDescriptor<Anonymize<Ie5efe5gkg0kqs>>;
    };
    Prices: {
        /**
         * Set emergency price
         */
        set_price: TxDescriptor<Anonymize<I5hb3jd6s8k4qo>>;
        /**
         * Reset emergency price
         */
        reset_price: TxDescriptor<Anonymize<If0uionjq98ocd>>;
        /**
         * Set foreign vault token mapping
         */
        set_foreign_asset: TxDescriptor<Anonymize<I3jqe98jp6jqj5>>;
    };
    Oracle: {
        /**
         * Feed the external value.
         *
         * Require authorized operator.
         */
        feed_values: TxDescriptor<Anonymize<Idea758kkrtvus>>;
    };
    OracleMembership: {
        /**
         * Add a member `who` to the set.
         *
         * May only be called from `T::AddOrigin`.
         */
        add_member: TxDescriptor<Anonymize<Icu8seopr711dn>>;
        /**
         * Remove a member `who` from the set.
         *
         * May only be called from `T::RemoveOrigin`.
         */
        remove_member: TxDescriptor<Anonymize<Icu8seopr711dn>>;
        /**
         * Swap out one member `remove` for another `add`.
         *
         * May only be called from `T::SwapOrigin`.
         *
         * Prime membership is *not* passed from `remove` to `add`, if extant.
         */
        swap_member: TxDescriptor<Anonymize<Id09aqt1ca773l>>;
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
        change_key: TxDescriptor<Anonymize<I79cmnv5q6b3p>>;
        /**
         * Set the prime member. Must be a current member.
         *
         * May only be called from `T::PrimeOrigin`.
         */
        set_prime: TxDescriptor<Anonymize<Icu8seopr711dn>>;
        /**
         * Remove the prime member if it exists.
         *
         * May only be called from `T::PrimeOrigin`.
         */
        clear_prime: TxDescriptor<undefined>;
    };
    LeverageStaking: {
        /**
         * Deposit flash loan
         *
         * Using borrowed funds to increase the amount of liquid staking (yield-bearing) assets.
         *
         * - `asset_id`: The asset id of the token
         * - `rate`: Leverage rate
         */
        flash_loan_deposit: TxDescriptor<Anonymize<I7am60vl6fh2ak>>;
    };
    ChannelCommission: {
        /**
        
         */
        register_channel: TxDescriptor<Anonymize<Id4du8qeonl5uo>>;
        /**
        
         */
        remove_channel: TxDescriptor<Anonymize<Ib73p6n69t2jsn>>;
        /**
        
         */
        update_channel_receive_account: TxDescriptor<Anonymize<I69nisu7k9olcl>>;
        /**
        
         */
        set_channel_commission_token: TxDescriptor<Anonymize<Ievk931u2c7sqn>>;
        /**
        
         */
        set_commission_tokens: TxDescriptor<Anonymize<Ie2jvm478jd2jv>>;
        /**
        
         */
        claim_commissions: TxDescriptor<Anonymize<Ib73p6n69t2jsn>>;
        /**
        
         */
        set_channel_vtoken_shares: TxDescriptor<Anonymize<Ibfeiifn3uif9a>>;
    };
    CloudsConvert: {
        /**
        
         */
        clouds_to_vebnc: TxDescriptor<Anonymize<I59ijflfqmnqm2>>;
        /**
        
         */
        charge_vbnc: TxDescriptor<Anonymize<I3qt1hgg4djhgb>>;
    };
    BuyBack: {
        /**
         * Configuration for setting up buybacks and adding liquidity.
         */
        set_vtoken: TxDescriptor<Anonymize<Ifor98fsce0gmh>>;
        /**
         * Charge the buyback account.
         */
        charge: TxDescriptor<Anonymize<I6e7p4l5e6t7n6>>;
        /**
         * Remove the configuration of the buyback.
         */
        remove_vtoken: TxDescriptor<Anonymize<I6dlum3cbrie3d>>;
    };
    SlpV2: {
        /**
         * Set the XCM fee for a specific XCM task.
         *
         * Can only be called by governance
         *
         * Parameters
         * - `staking_protocol`: Slp supports staking protocols.
         * - `configuration`: The staking protocol configuration.
         */
        set_protocol_configuration: TxDescriptor<Anonymize<Iok3ke9gllunv>>;
        /**
         * Add a delegator to the staking protocol.
         *
         * Can only be called by governance
         *
         * Parameters
         * - `staking_protocol`: Slp supports staking protocols.
         * - `delegator`: If delegator is None, the delegator will be derived from sovereign
         * account.
         */
        add_delegator: TxDescriptor<Anonymize<I1dpf04lbh0g77>>;
        /**
         * Remove a delegator from the staking protocol.
         *
         * Can only be called by governance
         *
         * Parameters
         * - `staking_protocol`: Slp supports staking protocols.
         * - `delegator`: Delegator that need to be removed.
         */
        remove_delegator: TxDescriptor<Anonymize<Iduuc186lvhgmv>>;
        /**
         * Add a validator to the staking protocol.
         *
         * Can only be called by governance
         *
         * Parameters
         * - `staking_protocol`: Slp supports staking protocols.
         * - `delegator`: Select the delegator which is existed.
         * - `validator`: Validator that need to be added.
         */
        add_validator: TxDescriptor<Anonymize<Ieprlpg14vh08o>>;
        /**
         * Remove a validator from the staking protocol.
         *
         * Can only be called by governance
         *
         * Parameters
         * - `staking_protocol`: Slp supports staking protocols.
         * - `delegator`: Select the delegator which is existed.
         * - `validator`: Validator that need to be removed.
         */
        remove_validator: TxDescriptor<Anonymize<Ieprlpg14vh08o>>;
        /**
         * Set the update token exchange rate limit for a specific staking protocol.
         *
         * Can only be called by governance.
         *
         * Parameters
         * - `staking_protocol`: Slp supports staking protocols.
         * - `delegator`: Select the delegator which is existed.
         * - `ledger`: Ledger that need to be set.
         */
        set_ledger: TxDescriptor<Anonymize<Ifvladst7gf7jp>>;
        /**
         * Transfer the staking token to remote chain.
         * Transfer the free balance of the Entrance Account to the selected delegator.
         *
         * Can be called by governance or staking protocol operator.
         *
         * Parameters
         * - `staking_protocol`: Slp supports staking protocols.
         * - `delegator`: Select the delegator which is existed.
         */
        transfer_to: TxDescriptor<Anonymize<I2vujg8u335g7a>>;
        /**
         * Transfer the staking token back from remote chain.
         * Transfer the amount of tokens from the selected delegator back to the entrance account.
         *
         * Can be called by governance or staking protocol operator.
         *
         * Parameters
         * - `staking_protocol`: Slp supports staking protocols.
         * - `delegator`: Select the delegator which is existed.
         * - `amount`: The amount of tokens to transfer back.
         */
        transfer_back: TxDescriptor<Anonymize<Idle45vlbjmfo0>>;
        /**
         * Update the ongoing time unit for a specific staking protocol.
         * Update frequency controlled by update_time_unit_interval.
         * Less than update_time_unit_interval will report an error.
         *
         * Can be called by governance or staking protocol operator.
         *
         * Parameters
         * - `staking_protocol`: Slp supports staking protocols.
         * - `time_uint_option`: If time_uint is None, the ongoing time unit will be increased by
         * one. Otherwise, the ongoing time unit will be updated to the specified time unit.
         */
        update_ongoing_time_unit: TxDescriptor<Anonymize<I38ao3jdscg8o5>>;
        /**
         * Update the token exchange rate for a specific staking protocol.
         * Update frequency controlled by update_exchange_rate_interval.
         * Amount max update for token pool * max_update_token_exchange_rate.
         *
         * Can be called by governance or staking protocol operator.
         *
         * Parameters
         * - `staking_protocol`: Slp supports staking protocols.
         * - `delegator`: Select the delegator which is existed.
         * - `amount`: The amount of tokens to update the token exchange rate.
         */
        update_token_exchange_rate: TxDescriptor<Anonymize<I5kj7kli9hm86u>>;
        /**
         * Manipulate a delegator to perform Dapp staking related operations.
         *
         * Can be called by governance or staking protocol operator.
         *
         * Parameters
         * - `staking_protocol`: Slp supports staking protocols.
         * - `delegator`: Select the delegator which is existed.
         * - `task`: The Dapp staking task.
         */
        astar_dapp_staking: TxDescriptor<Anonymize<I8kr5s6u6ue9e7>>;
        /**
         * Processing Xcm message execution results.
         *
         * Can be called by governance or xcm origin.
         */
        notify_astar_dapp_staking: TxDescriptor<Anonymize<Iasr6pj6shs0fl>>;
        /**
         * Manipulate a delegator to perform Dapp staking related operations.
         *
         * Can be called by governance or staking protocol operator.
         *
         * Parameters
         * - `staking_protocol`: Slp supports staking protocols.
         * - `delegator`: Select the delegator which is existed.
         * - `task`: The Dapp staking task.
         */
        ethereum_staking: TxDescriptor<Anonymize<I4c9kt1ip8g4lh>>;
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
        ExtrinsicFailed: PlainDescriptor<Anonymize<I7pbnbt70rdp6m>>;
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
        /**
         * An invalid authorized upgrade was rejected while trying to apply it.
         */
        RejectedInvalidAuthorizedUpgrade: PlainDescriptor<Anonymize<I92lvnr2lhfkjg>>;
    };
    Indices: {
        /**
         * A account index was assigned.
         */
        IndexAssigned: PlainDescriptor<Anonymize<Ia1u3jll6a06ae>>;
        /**
         * A account index has been freed up (unassigned).
         */
        IndexFreed: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A account index has been frozen to its current account ID.
         */
        IndexFrozen: PlainDescriptor<Anonymize<Ia1u3jll6a06ae>>;
        /**
         * A deposit to reserve an index has been poked/reconsidered.
         */
        DepositPoked: PlainDescriptor<Anonymize<Ic9g5lvl9iddc5>>;
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
    TransactionPayment: {
        /**
         * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
         * has been paid by `who`.
         */
        TransactionFeePaid: PlainDescriptor<Anonymize<Ier2cke86dqbr2>>;
    };
    Session: {
        /**
         * New session has happened. Note that the argument is the session index, not the
         * block number as the type might suggest.
         */
        NewSession: PlainDescriptor<Anonymize<I2hq50pu2kdjpo>>;
        /**
         * Validator has been disabled.
         */
        ValidatorDisabled: PlainDescriptor<Anonymize<I9acqruh7322g2>>;
        /**
         * Validator has been re-enabled.
         */
        ValidatorReenabled: PlainDescriptor<Anonymize<I9acqruh7322g2>>;
    };
    ParachainStaking: {
        /**
         * Started new round.
         */
        NewRound: PlainDescriptor<Anonymize<I68vefv6bi40pm>>;
        /**
         * Account joined the set of collator candidates.
         */
        JoinedCollatorCandidates: PlainDescriptor<Anonymize<I2tar7hv83bhs9>>;
        /**
         * Candidate selected for collators. Total Exposed Amount includes all delegations.
         */
        CollatorChosen: PlainDescriptor<Anonymize<I7m6jdbthkclds>>;
        /**
         * Candidate requested to decrease a self bond.
         */
        CandidateBondLessRequested: PlainDescriptor<Anonymize<Idcbd1egqu902f>>;
        /**
         * Candidate has increased a self bond.
         */
        CandidateBondedMore: PlainDescriptor<Anonymize<I4b9s9ufqtqpag>>;
        /**
         * Candidate has decreased a self bond.
         */
        CandidateBondedLess: PlainDescriptor<Anonymize<I2prd76if4ekis>>;
        /**
         * Candidate temporarily leave the set of collator candidates without unbonding.
         */
        CandidateWentOffline: PlainDescriptor<Anonymize<I4b66js88p45m8>>;
        /**
         * Candidate rejoins the set of collator candidates.
         */
        CandidateBackOnline: PlainDescriptor<Anonymize<I4b66js88p45m8>>;
        /**
         * Candidate has requested to leave the set of candidates.
         */
        CandidateScheduledExit: PlainDescriptor<Anonymize<I8uo8rqvrpdign>>;
        /**
         * Cancelled request to leave the set of candidates.
         */
        CancelledCandidateExit: PlainDescriptor<Anonymize<I4b66js88p45m8>>;
        /**
         * Cancelled request to decrease candidate's bond.
         */
        CancelledCandidateBondLess: PlainDescriptor<Anonymize<Idn49754fsdtru>>;
        /**
         * Candidate has left the set of candidates.
         */
        CandidateLeft: PlainDescriptor<Anonymize<I680fmn7ufn665>>;
        /**
         * Delegator requested to decrease a bond for the collator candidate.
         */
        DelegationDecreaseScheduled: PlainDescriptor<Anonymize<I369fnsmd2kjhd>>;
        /**
        
         */
        DelegationIncreased: PlainDescriptor<Anonymize<I2a4el6f8bntsn>>;
        /**
        
         */
        DelegationDecreased: PlainDescriptor<Anonymize<I2a4el6f8bntsn>>;
        /**
         * Delegator requested to leave the set of delegators.
         */
        DelegatorExitScheduled: PlainDescriptor<Anonymize<Igut3khe172gn>>;
        /**
         * Delegator requested to revoke delegation.
         */
        DelegationRevocationScheduled: PlainDescriptor<Anonymize<I7oac900a2ho0o>>;
        /**
         * Delegator has left the set of delegators.
         */
        DelegatorLeft: PlainDescriptor<Anonymize<I7bui4st6iq68m>>;
        /**
         * Delegation revoked.
         */
        DelegationRevoked: PlainDescriptor<Anonymize<I27psftcg9098g>>;
        /**
         * Delegation kicked.
         */
        DelegationKicked: PlainDescriptor<Anonymize<I27psftcg9098g>>;
        /**
         * Cancelled a pending request to exit the set of delegators.
         */
        DelegatorExitCancelled: PlainDescriptor<Anonymize<Icuam3sm8vhog2>>;
        /**
         * Cancelled request to change an existing delegation.
         */
        CancelledDelegationRequest: PlainDescriptor<Anonymize<Ifjv4i6s7q1stt>>;
        /**
         * New delegation (increase of the existing one).
         */
        Delegation: PlainDescriptor<Anonymize<Id1re1vndv0kab>>;
        /**
         * Delegation from candidate state has been remove.
         */
        DelegatorLeftCandidate: PlainDescriptor<Anonymize<Ie3dfke5vrt21s>>;
        /**
         * Paid the account (delegator or collator) the balance as liquid rewards.
         */
        Rewarded: PlainDescriptor<Anonymize<Ibl3t1j4prdqji>>;
        /**
         * Transferred to account which holds funds reserved for parachain bond.
         */
        ReservedForParachainBond: PlainDescriptor<Anonymize<I7j4m7a3pkvsf4>>;
        /**
         * Account (re)set for parachain bond treasury.
         */
        ParachainBondAccountSet: PlainDescriptor<Anonymize<Id9sjif2ghpo08>>;
        /**
         * Percent of inflation reserved for parachain bond (re)set.
         */
        ParachainBondReservePercentSet: PlainDescriptor<Anonymize<I6fomjr8ghrs40>>;
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
    };
    ConvictionVoting: {
        /**
         * An account has delegated their vote to another account. \[who, target\]
         */
        Delegated: PlainDescriptor<Anonymize<I2na29tt2afp0j>>;
        /**
         * An \[account\] has cancelled a previous delegation operation.
         */
        Undelegated: PlainDescriptor<SS58String>;
        /**
         * An account has voted
         */
        Voted: PlainDescriptor<Anonymize<I9qfchhljqsjjl>>;
        /**
         * A vote has been removed
         */
        VoteRemoved: PlainDescriptor<Anonymize<I9qfchhljqsjjl>>;
        /**
         * The lockup period of a conviction vote expired, and the funds have been unlocked.
         */
        VoteUnlocked: PlainDescriptor<Anonymize<I7kij8p9kchdjo>>;
    };
    Referenda: {
        /**
         * A referendum has been submitted.
         */
        Submitted: PlainDescriptor<Anonymize<I229ijht536qdu>>;
        /**
         * The decision deposit has been placed.
         */
        DecisionDepositPlaced: PlainDescriptor<Anonymize<I62nte77gksm0f>>;
        /**
         * The decision deposit has been refunded.
         */
        DecisionDepositRefunded: PlainDescriptor<Anonymize<I62nte77gksm0f>>;
        /**
         * A deposit has been slashed.
         */
        DepositSlashed: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
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
        SubmissionDepositRefunded: PlainDescriptor<Anonymize<I62nte77gksm0f>>;
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
        WhitelistedCallDispatched: PlainDescriptor<Anonymize<Iao0880t6bdk6t>>;
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
         * An XCM message was sent.
         */
        Sent: PlainDescriptor<Anonymize<If8u5kl4h8070m>>;
        /**
         * An XCM message failed to send.
         */
        SendFailed: PlainDescriptor<Anonymize<Ibmuil6p3vl83l>>;
        /**
         * An XCM message failed to process.
         */
        ProcessXcmError: PlainDescriptor<Anonymize<I7lul91g50ae87>>;
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
        /**
         * An `aliaser` location was authorized by `target` to alias it, authorization valid until
         * `expiry` block number.
         */
        AliasAuthorized: PlainDescriptor<Anonymize<I3gghqnh2mj0is>>;
        /**
         * `target` removed alias authorization for `aliaser`.
         */
        AliasAuthorizationRemoved: PlainDescriptor<Anonymize<I6iv852roh6t3h>>;
        /**
         * `target` removed all alias authorizations.
         */
        AliasesAuthorizationsRemoved: PlainDescriptor<Anonymize<I9oc2o6itbiopq>>;
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
    Utility: {
        /**
         * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
         * well as the error.
         */
        BatchInterrupted: PlainDescriptor<Anonymize<I559a3l6k1tuhi>>;
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
        ItemFailed: PlainDescriptor<Anonymize<Ia74hfkpnt69k4>>;
        /**
         * A call was dispatched.
         */
        DispatchedAs: PlainDescriptor<Anonymize<Icdh3rm93onuu7>>;
        /**
         * Main call was dispatched.
         */
        IfElseMainSuccess: PlainDescriptor<undefined>;
        /**
         * The fallback call was dispatched.
         */
        IfElseFallbackCalled: PlainDescriptor<Anonymize<Ic8o3lkomig9pc>>;
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
        Dispatched: PlainDescriptor<Anonymize<I5fbs546684p2n>>;
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
        /**
         * Agenda is incomplete from `when`.
         */
        AgendaIncomplete: PlainDescriptor<Anonymize<Ibtsa3docbr9el>>;
    };
    Proxy: {
        /**
         * A proxy was executed correctly, with the given.
         */
        ProxyExecuted: PlainDescriptor<Anonymize<Icdh3rm93onuu7>>;
        /**
         * A pure account has been created by new proxy with given
         * disambiguation index and proxy type.
         */
        PureCreated: PlainDescriptor<Anonymize<I7svoh0vdq580e>>;
        /**
         * An announcement was placed to make a call in the future.
         */
        Announced: PlainDescriptor<Anonymize<I2ur0oeqg495j8>>;
        /**
         * A proxy was added.
         */
        ProxyAdded: PlainDescriptor<Anonymize<I8isvjsseb7fjo>>;
        /**
         * A proxy was removed.
         */
        ProxyRemoved: PlainDescriptor<Anonymize<I8isvjsseb7fjo>>;
        /**
         * A deposit stored for proxies or announcements was poked / updated.
         */
        DepositPoked: PlainDescriptor<Anonymize<I1bhd210c3phjj>>;
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
        MultisigExecuted: PlainDescriptor<Anonymize<I2e077c652dip6>>;
        /**
         * A multisig operation has been cancelled.
         */
        MultisigCancelled: PlainDescriptor<Anonymize<I5qolde99acmd1>>;
        /**
         * The deposit for a multisig operation has been updated/poked.
         */
        DepositPoked: PlainDescriptor<Anonymize<I8gtde5abn1g9a>>;
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
    Treasury: {
        /**
         * We have ended a spend period and will now allocate funds.
         */
        Spending: PlainDescriptor<Anonymize<I8iksqi3eani0a>>;
        /**
         * Some funds have been allocated.
         */
        Awarded: PlainDescriptor<Anonymize<I16enopmju1p0q>>;
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
        SpendApproved: PlainDescriptor<Anonymize<I38bmcrmh852rk>>;
        /**
         * The inactive funds of the pallet have been updated.
         */
        UpdatedInactive: PlainDescriptor<Anonymize<I4hcillge8de5f>>;
        /**
         * A new asset spend proposal has been approved.
         */
        AssetSpendApproved: PlainDescriptor<Anonymize<I8usdc6tg7829p>>;
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
    Ethereum: {
        /**
         * An ethereum transaction was successfully executed.
         */
        Executed: PlainDescriptor<Anonymize<Iea4g5ovhnolus>>;
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
    EVMAccounts: {
        /**
         * Binding was created.
         */
        Bound: PlainDescriptor<Anonymize<I8363i1h1dgh0n>>;
        /**
         * Deployer was added.
         */
        DeployerAdded: PlainDescriptor<Anonymize<Ibqjgs3foip9fb>>;
        /**
         * Deployer was removed.
         */
        DeployerRemoved: PlainDescriptor<Anonymize<Ibqjgs3foip9fb>>;
    };
    XTokens: {
        /**
         * Transferred `Asset` with fee.
         */
        TransferredAssets: PlainDescriptor<Anonymize<I1hgaklii9a5gl>>;
    };
    Tokens: {
        /**
         * An account was created with some free balance.
         */
        Endowed: PlainDescriptor<Anonymize<I3d8ss06imalrs>>;
        /**
         * An account was removed whose balance was non-zero but below
         * ExistentialDeposit, resulting in an outright loss.
         */
        DustLost: PlainDescriptor<Anonymize<I3d8ss06imalrs>>;
        /**
         * Transfer succeeded.
         */
        Transfer: PlainDescriptor<Anonymize<I1452l7htqmdul>>;
        /**
         * Some balance was reserved (moved from free to reserved).
         */
        Reserved: PlainDescriptor<Anonymize<I3d8ss06imalrs>>;
        /**
         * Some balance was unreserved (moved from reserved to free).
         */
        Unreserved: PlainDescriptor<Anonymize<I3d8ss06imalrs>>;
        /**
         * Some reserved balance was repatriated (moved from reserved to
         * another account).
         */
        ReserveRepatriated: PlainDescriptor<Anonymize<I5k7trgmhddpc9>>;
        /**
         * A balance was set by root.
         */
        BalanceSet: PlainDescriptor<Anonymize<Ifg1v23kle5pvs>>;
        /**
         * The total issuance of an currency has been set
         */
        TotalIssuanceSet: PlainDescriptor<Anonymize<Ic7aob2k1l1jfu>>;
        /**
         * Some balances were withdrawn (e.g. pay for transaction fee)
         */
        Withdrawn: PlainDescriptor<Anonymize<I3d8ss06imalrs>>;
        /**
         * Some balances were slashed (e.g. due to mis-behavior)
         */
        Slashed: PlainDescriptor<Anonymize<Idog3297nuhubu>>;
        /**
         * Deposited some balance into an account
         */
        Deposited: PlainDescriptor<Anonymize<I3d8ss06imalrs>>;
        /**
         * Some funds are locked
         */
        LockSet: PlainDescriptor<Anonymize<I7aphsup25pr8u>>;
        /**
         * Some locked funds were unlocked
         */
        LockRemoved: PlainDescriptor<Anonymize<Id9ivc2gke7kda>>;
        /**
         * Some free balance was locked.
         */
        Locked: PlainDescriptor<Anonymize<I3d8ss06imalrs>>;
        /**
         * Some locked balance was freed.
         */
        Unlocked: PlainDescriptor<Anonymize<I3d8ss06imalrs>>;
        /**
        
         */
        Issued: PlainDescriptor<Anonymize<Ic7aob2k1l1jfu>>;
        /**
        
         */
        Rescinded: PlainDescriptor<Anonymize<Ic7aob2k1l1jfu>>;
    };
    UnknownTokens: {
        /**
         * Deposit success.
         */
        Deposited: PlainDescriptor<Anonymize<I32sqi67deo8lb>>;
        /**
         * Withdraw success.
         */
        Withdrawn: PlainDescriptor<Anonymize<I32sqi67deo8lb>>;
    };
    OrmlXcm: {
        /**
         * XCM message sent. \[to, message\]
         */
        Sent: PlainDescriptor<Anonymize<I7dhoiqi8n693s>>;
    };
    ZenlinkProtocol: {
        /**
         * Foreign Asset
         * Some assets were transferred. \[asset_id, owner, target, amount\]
         */
        Transferred: PlainDescriptor<Anonymize<I1kmrn95024uj4>>;
        /**
         * Some assets were burned. \[asset_id, owner, amount\]
         */
        Burned: PlainDescriptor<Anonymize<Ibianp5jdpolv7>>;
        /**
         * Some assets were minted. \[asset_id, owner, amount\]
         */
        Minted: PlainDescriptor<Anonymize<Ibianp5jdpolv7>>;
        /**
         * Swap
         * Create a trading pair. \[asset_0, asset_1\]
         */
        PairCreated: PlainDescriptor<Anonymize<I84fmreorpmm3e>>;
        /**
         * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
         * mint_balance_lp\]
         */
        LiquidityAdded: PlainDescriptor<Anonymize<I9e73asfoaqs2i>>;
        /**
         * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
         * burn_balance_lp\]
         */
        LiquidityRemoved: PlainDescriptor<Anonymize<I9ugpnf3tjcb6b>>;
        /**
         * Transact in trading \[owner, recipient, swap_path, balances\]
         */
        AssetSwap: PlainDescriptor<Anonymize<Idg56vb718jpor>>;
        /**
         * Transfer by xcm
         * Transferred to parachain. \[asset_id, src, para_id, dest, amount, used_weight\]
         */
        TransferredToParachain: PlainDescriptor<Anonymize<Icjttivfuq4kl0>>;
        /**
         * Contribute to bootstrap pair. \[who, asset_0, asset_0_contribute, asset_1_contribute\]
         */
        BootstrapContribute: PlainDescriptor<Anonymize<I7aqqpfb5d3acb>>;
        /**
         * A bootstrap pair end. \[asset_0, asset_1, asset_0_amount, asset_1_amount,
         * total_lp_supply]
         */
        BootstrapEnd: PlainDescriptor<Anonymize<I67tkv8m7b9as3>>;
        /**
         * Create a bootstrap pair. \[bootstrap_pair_account, asset_0, asset_1,
         * total_supply_0,total_supply_1, capacity_supply_0,capacity_supply_1, end\]
         */
        BootstrapCreated: PlainDescriptor<Anonymize<I53hhk4qo3m9a6>>;
        /**
         * Claim a bootstrap pair. \[bootstrap_pair_account, claimer, receiver, asset_0, asset_1,
         * asset_0_refund, asset_1_refund, lp_amount\]
         */
        BootstrapClaim: PlainDescriptor<Anonymize<I73e059ch622rh>>;
        /**
         * Update a bootstrap pair. \[caller, asset_0, asset_1,
         * total_supply_0,total_supply_1, capacity_supply_0,capacity_supply_1\]
         */
        BootstrapUpdate: PlainDescriptor<Anonymize<I53hhk4qo3m9a6>>;
        /**
         * Refund from disable bootstrap pair. \[bootstrap_pair_account, caller, asset_0, asset_1,
         * asset_0_refund, asset_1_refund\]
         */
        BootstrapRefund: PlainDescriptor<Anonymize<I8s0297rim8oc1>>;
        /**
         * Bootstrap distribute some rewards to contributors.
         */
        DistributeReward: PlainDescriptor<Anonymize<Ibanc5bru9o3gt>>;
        /**
         * Charge reward into a bootstrap.
         */
        ChargeReward: PlainDescriptor<Anonymize<Ibanc5bru9o3gt>>;
        /**
         * Withdraw all reward from a bootstrap.
         */
        WithdrawReward: PlainDescriptor<Anonymize<Ia9haecbvl560l>>;
    };
    Ismp: {
        /**
         * Emitted when a state machine is successfully updated to a new height
         */
        StateMachineUpdated: PlainDescriptor<Anonymize<Ial9kpmfj9nsqr>>;
        /**
         * Emitted when a state commitment is vetoed by a fisherman
         */
        StateCommitmentVetoed: PlainDescriptor<Anonymize<I2ra3uepvk35si>>;
        /**
         * Indicates that a consensus client has been created
         */
        ConsensusClientCreated: PlainDescriptor<Anonymize<I9ljfa9qc631nt>>;
        /**
         * Indicates that a consensus client has been created
         */
        ConsensusClientFrozen: PlainDescriptor<Anonymize<I9ljfa9qc631nt>>;
        /**
         * An Outgoing Response has been deposited
         */
        Response: PlainDescriptor<Anonymize<I1apjv9m70hqn0>>;
        /**
         * An Outgoing Request has been deposited
         */
        Request: PlainDescriptor<Anonymize<I68i9mkj0i3heo>>;
        /**
         * Some errors handling some ismp messages
         */
        Errors: PlainDescriptor<Anonymize<I6vqpfjes12rn2>>;
        /**
         * Post Request Handled
         */
        PostRequestHandled: PlainDescriptor<Anonymize<I7qo7cp2e3aerl>>;
        /**
         * Post Response Handled
         */
        PostResponseHandled: PlainDescriptor<Anonymize<I7qo7cp2e3aerl>>;
        /**
         * Get Response Handled
         */
        GetRequestHandled: PlainDescriptor<Anonymize<I7qo7cp2e3aerl>>;
        /**
         * Post request timeout handled
         */
        PostRequestTimeoutHandled: PlainDescriptor<Anonymize<I53bm5fak9v07m>>;
        /**
         * Post response timeout handled
         */
        PostResponseTimeoutHandled: PlainDescriptor<Anonymize<I53bm5fak9v07m>>;
        /**
         * Get request timeout handled
         */
        GetRequestTimeoutHandled: PlainDescriptor<Anonymize<I53bm5fak9v07m>>;
    };
    IsmpParachain: {
        /**
         * Parachains with the `para_ids` have been added to the whitelist
         */
        ParachainsAdded: PlainDescriptor<Anonymize<Ivalbtb85o2h0>>;
        /**
         * Parachains with the `para_ids` have been removed from the whitelist
         */
        ParachainsRemoved: PlainDescriptor<Anonymize<Ic8hk838gccoml>>;
    };
    Hyperbridge: {
        /**
         * Hyperbridge governance has now updated it's host params on this chain.
         */
        HostParamsUpdated: PlainDescriptor<Anonymize<If7o6tu2tbpm0f>>;
        /**
         * A relayer has withdrawn some fees
         */
        RelayerFeeWithdrawn: PlainDescriptor<Anonymize<Ic262ibdoec56a>>;
        /**
         * Hyperbridge has withdrawn it's protocol revenue
         */
        ProtocolRevenueWithdrawn: PlainDescriptor<Anonymize<Ic262ibdoec56a>>;
    };
    TokenGateway: {
        /**
         * An asset has been teleported
         */
        AssetTeleported: PlainDescriptor<Anonymize<I9cdaua1ufuf68>>;
        /**
         * An asset has been received and transferred to the beneficiary's account
         */
        AssetReceived: PlainDescriptor<Anonymize<Ibd4ev4rmnpul7>>;
        /**
         * An asset has been refunded and transferred to the beneficiary's account
         */
        AssetRefunded: PlainDescriptor<Anonymize<Ibd4ev4rmnpul7>>;
        /**
         * ERC6160 asset creation request dispatched to hyperbridge
         */
        ERC6160AssetRegistrationDispatched: PlainDescriptor<Anonymize<Icr3t2kod9dj5d>>;
        /**
         * Whitelist has been reset
         */
        WhitelistReset: PlainDescriptor<Anonymize<I9b25mq8qrg0o8>>;
    };
    FlexibleFee: {
        /**
         * Transfer to another chain
         */
        TransferTo: PlainDescriptor<Anonymize<I7c48q22j7l1q8>>;
        /**
         * Set user default fee currency
         */
        SetDefaultFeeCurrency: PlainDescriptor<Anonymize<I3shlhcndrf1f0>>;
        /**
         * Set universal fee currency order list
         */
        SetFeeCurrencyList: PlainDescriptor<Anonymize<Ia85jfgnieg7o0>>;
        /**
         * Set extra fee by call
         */
        SetExtraFee: PlainDescriptor<Anonymize<I4j50qh0n84qes>>;
    };
    Salp: {
        /**
         * Create a new crowdloaning campaign. [fund_index]
         */
        Created: PlainDescriptor<number>;
        /**
         * Contributing to a crowd sale. [who, fund_index, amount]
         */
        Contributing: PlainDescriptor<Anonymize<Ic4lis4f2abd9o>>;
        /**
         * Contributed to a crowd sale. [who, fund_index, amount]
         */
        Contributed: PlainDescriptor<Anonymize<I7fcree6lak6uv>>;
        /**
         * Fail on contribute to crowd sale. [who, fund_index, amount]
         */
        ContributeFailed: PlainDescriptor<Anonymize<I7fcree6lak6uv>>;
        /**
         * Withdrew full balance of a contributor. [who, fund_index, amount]
         */
        Withdrew: PlainDescriptor<Anonymize<I4ojmnsk1dchql>>;
        /**
         * refund to account. [who, fund_index,value]
         */
        Refunded: PlainDescriptor<Anonymize<Icl5s4108hio7m>>;
        /**
         * all refund
         */
        AllRefunded: PlainDescriptor<number>;
        /**
         * redeem to account. [who, fund_index, first_slot, last_slot, value]
         */
        Redeemed: PlainDescriptor<Anonymize<Icl5s4108hio7m>>;
        /**
         * Fund is edited. [fund_index]
         */
        Edited: PlainDescriptor<number>;
        /**
         * Fund is dissolved. [fund_index]
         */
        Dissolved: PlainDescriptor<number>;
        /**
         * The vsToken/vsBond was be unlocked. [who, fund_index, value]
         */
        Unlocked: PlainDescriptor<Anonymize<I7fcree6lak6uv>>;
        /**
        
         */
        AllUnlocked: PlainDescriptor<number>;
        /**
         * Fund status change
         */
        Failed: PlainDescriptor<number>;
        /**
        
         */
        Success: PlainDescriptor<number>;
        /**
        
         */
        Retired: PlainDescriptor<number>;
        /**
        
         */
        End: PlainDescriptor<number>;
        /**
        
         */
        Continued: PlainDescriptor<Anonymize<Ielgh4t8o7rcvt>>;
        /**
        
         */
        RefundedDissolved: PlainDescriptor<Anonymize<Ielgh4t8o7rcvt>>;
        /**
        
         */
        Buyback: PlainDescriptor<bigint>;
        /**
        
         */
        VstokenUnlocked: PlainDescriptor<SS58String>;
        /**
        
         */
        BuybackByStablePool: PlainDescriptor<Anonymize<Iv901693moogd>>;
        /**
        
         */
        Reserved: PlainDescriptor<Anonymize<I93gagnlb9gm3u>>;
        /**
        
         */
        ReservationCancelled: PlainDescriptor<Anonymize<Idn2ghub1o4i40>>;
        /**
        
         */
        ReservationFullyHandled: PlainDescriptor<Anonymize<I37r4bdai8o9mp>>;
        /**
        
         */
        ReservationHandled: PlainDescriptor<Anonymize<I37r4bdai8o9mp>>;
    };
    AssetRegistry: {
        /**
         * The asset registered.
         */
        AssetRegistered: PlainDescriptor<Anonymize<Ij8p6ct1brfmo>>;
        /**
         * The asset updated.
         */
        AssetUpdated: PlainDescriptor<Anonymize<Ij8p6ct1brfmo>>;
        /**
         * The CurrencyId registered.
         */
        CurrencyIdRegistered: PlainDescriptor<Anonymize<I7utese4puubr9>>;
        /**
         * Location Force set.
         */
        LocationSet: PlainDescriptor<Anonymize<I3qdgms9h4is9n>>;
        /**
         * The CurrencyId updated.
         */
        CurrencyIdUpdated: PlainDescriptor<Anonymize<I7utese4puubr9>>;
    };
    VtokenMinting: {
        /**
         * Vtoken minted successfully.
         */
        Minted: PlainDescriptor<Anonymize<I8e477rrh15djf>>;
        /**
         * Vtoken redeemed successfully.
         */
        Redeemed: PlainDescriptor<Anonymize<I3nuinrik5mleq>>;
        /**
         * Process redeem successfully.
         */
        RedeemSuccess: PlainDescriptor<Anonymize<I49iq2qck2mkkq>>;
        /**
         * Vtoken rebonded successfully.
         */
        Rebonded: PlainDescriptor<Anonymize<I2qaqth7uqvdf9>>;
        /**
         * Vtoken rebonded by unlock_id successfully.
         */
        RebondedByUnlockId: PlainDescriptor<Anonymize<I7hgbfjfqur3o0>>;
        /**
         * Set unlock duration.
         */
        UnlockDurationSet: PlainDescriptor<Anonymize<I95h8ge6oaumen>>;
        /**
         * Set minimum mint amount.
         */
        MinimumMintSet: PlainDescriptor<Anonymize<I9gla6h44u54mh>>;
        /**
         * Set minimum redeem amount.
         */
        MinimumRedeemSet: PlainDescriptor<Anonymize<I9gla6h44u54mh>>;
        /**
         * Support rebond token added.
         */
        SupportRebondTokenAdded: PlainDescriptor<Anonymize<I6dlum3cbrie3d>>;
        /**
         * Support rebond token removed.
         */
        SupportRebondTokenRemoved: PlainDescriptor<Anonymize<I6dlum3cbrie3d>>;
        /**
         * Set mint fee and redeem fee.
         */
        FeeSet: PlainDescriptor<Anonymize<Idkdd97l7v4t7o>>;
        /**
         * Set hook iteration limit.
         */
        HookIterationLimitSet: PlainDescriptor<Anonymize<Iamlqp3gs21baf>>;
        /**
         * Set unlock total amount.
         */
        UnlockingTotalSet: PlainDescriptor<Anonymize<Icmnhhde8qv456>>;
        /**
         * Set minimum time unit.
         */
        MinTimeUnitSet: PlainDescriptor<Anonymize<I4qh6vjmbpl1a6>>;
        /**
         * Fast redeem failed.
         */
        FastRedeemFailed: PlainDescriptor<Anonymize<Id3k8o0e2cab51>>;
        /**
         * Set ongoing time unit.
         */
        SetOngoingTimeUnit: PlainDescriptor<Anonymize<I4qh6vjmbpl1a6>>;
        /**
         * Incentivized minting.
         */
        IncentivizedMinting: PlainDescriptor<Anonymize<Ib754le9rlkqse>>;
        /**
         * Incentive coefficient set.
         */
        VtokenIncentiveCoefSet: PlainDescriptor<Anonymize<I3pbnpd5raifhq>>;
        /**
         * Incentive lock blocks set.
         */
        VtokenIncentiveLockBlocksSet: PlainDescriptor<Anonymize<I18s38m9j5bg00>>;
        /**
         * Set Supported eths.
         */
        SupportedEthSet: PlainDescriptor<Anonymize<Ifsksfqf7mb05t>>;
        /**
         * VToken issuance adjusted.
         */
        VtokenIssuanceSet: PlainDescriptor<Anonymize<Ifgbhtfo78kca0>>;
    };
    Slp: {
        /**
        
         */
        DelegatorInitialized: PlainDescriptor<Anonymize<Iab17gup71picv>>;
        /**
        
         */
        DelegatorBonded: PlainDescriptor<Anonymize<I2p503tvhr95gj>>;
        /**
        
         */
        DelegatorBondExtra: PlainDescriptor<Anonymize<I9grg7g6ua578n>>;
        /**
        
         */
        DelegatorUnbond: PlainDescriptor<Anonymize<I6umd4hgu2puph>>;
        /**
        
         */
        DelegatorUnbondAll: PlainDescriptor<Anonymize<I44127qd8nvu47>>;
        /**
        
         */
        DelegatorRebond: PlainDescriptor<Anonymize<I5tdcum59p9pac>>;
        /**
        
         */
        Delegated: PlainDescriptor<Anonymize<I2dgahqu6ln4jl>>;
        /**
        
         */
        Undelegated: PlainDescriptor<Anonymize<I1hn8tvlbussv>>;
        /**
        
         */
        Payout: PlainDescriptor<Anonymize<I96on68vm4ih94>>;
        /**
        
         */
        Liquidize: PlainDescriptor<Anonymize<Idgas9g0pc3k9g>>;
        /**
        
         */
        Chill: PlainDescriptor<Anonymize<I44127qd8nvu47>>;
        /**
        
         */
        TransferBack: PlainDescriptor<Anonymize<Ibu6i8jb58o30n>>;
        /**
        
         */
        TransferTo: PlainDescriptor<Anonymize<Ibu6i8jb58o30n>>;
        /**
        
         */
        ConvertAsset: PlainDescriptor<Anonymize<Iaevo3h2jsoemi>>;
        /**
        
         */
        DelegatorAdded: PlainDescriptor<Anonymize<Iep8a74k7e6r72>>;
        /**
        
         */
        DelegatorRemoved: PlainDescriptor<Anonymize<Iab17gup71picv>>;
        /**
        
         */
        ValidatorsAdded: PlainDescriptor<Anonymize<Ib6t0ubljgp22u>>;
        /**
        
         */
        ValidatorsRemoved: PlainDescriptor<Anonymize<Ib6t0ubljgp22u>>;
        /**
        
         */
        Refund: PlainDescriptor<Anonymize<I3rgoh4223434f>>;
        /**
        
         */
        FundMoveFromExitToEntrance: PlainDescriptor<Anonymize<Ic7aob2k1l1jfu>>;
        /**
        
         */
        TimeUnitUpdated: PlainDescriptor<Anonymize<I2vfuukfl5d6al>>;
        /**
        
         */
        PoolTokenIncreased: PlainDescriptor<Anonymize<Ic7aob2k1l1jfu>>;
        /**
        
         */
        HostingFeeCharged: PlainDescriptor<Anonymize<Ic7aob2k1l1jfu>>;
        /**
        
         */
        PoolTokenDecreased: PlainDescriptor<Anonymize<Ic7aob2k1l1jfu>>;
        /**
        
         */
        FeeSupplemented: PlainDescriptor<Anonymize<Ibu6i8jb58o30n>>;
        /**
        
         */
        ValidatorsByDelegatorSet: PlainDescriptor<Anonymize<I9ns66h5mcst21>>;
        /**
        
         */
        OperateOriginSet: PlainDescriptor<Anonymize<I5ch6hqvso9cfc>>;
        /**
        
         */
        FeeSourceSet: PlainDescriptor<Anonymize<Inp8hn3mu8c5j>>;
        /**
        
         */
        DelegatorLedgerSet: PlainDescriptor<Anonymize<I81p9lds919n0g>>;
        /**
        
         */
        DelegatorLedgerQueryResponseConfirmed: PlainDescriptor<Anonymize<I87hura2cobcv1>>;
        /**
        
         */
        DelegatorLedgerQueryResponseFailed: PlainDescriptor<Anonymize<I30pg328m00nr3>>;
        /**
        
         */
        ValidatorsByDelegatorQueryResponseConfirmed: PlainDescriptor<Anonymize<I3lbtb6q8ittcg>>;
        /**
        
         */
        ValidatorsByDelegatorQueryResponseFailed: PlainDescriptor<Anonymize<I30pg328m00nr3>>;
        /**
        
         */
        MinimumsMaximumsSet: PlainDescriptor<Anonymize<I788n87nobc2o6>>;
        /**
        
         */
        CurrencyDelaysSet: PlainDescriptor<Anonymize<I99tkds5qdlj77>>;
        /**
        
         */
        HostingFeesSet: PlainDescriptor<Anonymize<Ian267bdq9joaf>>;
        /**
        
         */
        CurrencyTuneExchangeRateLimitSet: PlainDescriptor<Anonymize<I91fa8tnsgpjgh>>;
        /**
        
         */
        OngoingTimeUnitUpdateIntervalSet: PlainDescriptor<Anonymize<Iemo1133hhf28q>>;
        /**
        
         */
        SupplementFeeAccountWhitelistAdded: PlainDescriptor<Anonymize<Iaba972j3va7k>>;
        /**
        
         */
        SupplementFeeAccountWhitelistRemoved: PlainDescriptor<Anonymize<Iaba972j3va7k>>;
        /**
        
         */
        ValidatorsReset: PlainDescriptor<Anonymize<Id37b9l6bk2ii9>>;
        /**
        
         */
        ValidatorBoostListSet: PlainDescriptor<Anonymize<I8o6tg2fcd6krf>>;
        /**
        
         */
        ValidatorBoostListAdded: PlainDescriptor<Anonymize<Iouj49kqoegp1>>;
        /**
        
         */
        RemovedFromBoostList: PlainDescriptor<Anonymize<Iaba972j3va7k>>;
        /**
        
         */
        OutdatedValidatorBoostListCleaned: PlainDescriptor<Anonymize<Ife8sj002g6s56>>;
        /**
        
         */
        BurnFeeFailed: PlainDescriptor<Anonymize<Ic7aob2k1l1jfu>>;
    };
    XcmInterface: {
        /**
        
         */
        XcmDestWeightAndFeeUpdated: PlainDescriptor<Anonymize<I400tsccl54f69>>;
        /**
        
         */
        TransferredEthereumAssets: PlainDescriptor<Anonymize<I7i2rquf9o1sc4>>;
    };
    TokenConversion: {
        /**
        
         */
        VsbondConvertToVsksm: PlainDescriptor<Anonymize<I41epceuu5tcos>>;
        /**
        
         */
        VsksmConvertToVsbond: PlainDescriptor<Anonymize<I41epceuu5tcos>>;
        /**
        
         */
        VsbondConvertToVsdot: PlainDescriptor<Anonymize<I44sdvnu7uoqf6>>;
        /**
        
         */
        VsdotConvertToVsbond: PlainDescriptor<Anonymize<I44sdvnu7uoqf6>>;
        /**
        
         */
        VsbondConvertToVstoken: PlainDescriptor<Anonymize<I75rts6phosqgv>>;
        /**
        
         */
        VstokenConvertToVsbond: PlainDescriptor<Anonymize<I75rts6phosqgv>>;
        /**
        
         */
        ExchangeFeeSet: PlainDescriptor<Anonymize<I7dim4s22d4cc>>;
        /**
        
         */
        ExchangeRateSet: PlainDescriptor<Anonymize<I9adoavqh7j1qm>>;
        /**
        
         */
        RelaychainLeaseSet: PlainDescriptor<Anonymize<I2cnb8psb4ovvm>>;
    };
    Farming: {
        /**
         * A farming pool is created.
         */
        FarmingPoolCreated: PlainDescriptor<Anonymize<Ier970hnn9pgrj>>;
        /**
         * The farming pool is reset.
         */
        FarmingPoolReset: PlainDescriptor<Anonymize<Ier970hnn9pgrj>>;
        /**
         * The farming pool is closed.
         */
        FarmingPoolClosed: PlainDescriptor<Anonymize<Ier970hnn9pgrj>>;
        /**
         * The farming pool is killed.
         */
        FarmingPoolKilled: PlainDescriptor<Anonymize<Ier970hnn9pgrj>>;
        /**
         * The farming pool is edited.
         */
        FarmingPoolEdited: PlainDescriptor<Anonymize<Ier970hnn9pgrj>>;
        /**
         * The pool is charged.
         */
        Charged: PlainDescriptor<Anonymize<Id05qchr7uq1gj>>;
        /**
         * The pool is deposited.
         */
        Deposited: PlainDescriptor<Anonymize<Ibppp57f2thdnk>>;
        /**
         * The pool is withdrawn.
         */
        Withdrawn: PlainDescriptor<Anonymize<Ibjg5nv0nue710>>;
        /**
         * The pool is claimed.
         */
        Claimed: PlainDescriptor<Anonymize<Ic7bjpulvng8ff>>;
        /**
         * The pool is withdrawn claimed.
         */
        WithdrawClaimed: PlainDescriptor<Anonymize<Ic7bjpulvng8ff>>;
        /**
         * The gauge pool is withdrawn.
         */
        GaugeWithdrawn: PlainDescriptor<Anonymize<I821hq5m5igcn>>;
        /**
         * All gauge pools have been claimed.
         */
        AllForceGaugeClaimed: PlainDescriptor<Anonymize<Ial5va0b0vs25o>>;
        /**
         * Partially gauge pools have been claimed.
         */
        PartiallyForceGaugeClaimed: PlainDescriptor<Anonymize<Ial5va0b0vs25o>>;
        /**
         * All pools is retired.
         */
        AllRetired: PlainDescriptor<Anonymize<Ier970hnn9pgrj>>;
        /**
         * Partially pools is retired.
         */
        PartiallyRetired: PlainDescriptor<Anonymize<Ier970hnn9pgrj>>;
        /**
         * The retire limit is set.
         */
        RetireLimitSet: PlainDescriptor<Anonymize<Iamlqp3gs21baf>>;
        /**
         * The round has ended.
         */
        RoundEnd: PlainDescriptor<Anonymize<I1fd2u5ls04lpi>>;
        /**
         * The round has started to fail.
         */
        RoundStartError: PlainDescriptor<Anonymize<I55nu158c3eng2>>;
        /**
         * The round has started.
         */
        RoundStart: PlainDescriptor<Anonymize<Icn7fuqv1aq0de>>;
        /**
         * The exchanger is voted.
         */
        Voted: PlainDescriptor<Anonymize<I2d67dgvoue7rb>>;
        /**
         * The boost pool is charged.
         */
        BoostCharged: PlainDescriptor<Anonymize<I2sfpbn9h49adg>>;
    };
    SystemStaking: {
        /**
         * A new staking round has started.
         *
         * - `current`: The index of the current round.
         * - `first`: The block number at which this round started.
         * - `length`: The length of the round in blocks.
         */
        NewRound: PlainDescriptor<Anonymize<Ial6i7mt9utr8>>;
        /**
         * Configuration of a token has been changed.
         *
         * - `token`: The identifier of the token whose configuration changed.
         * - `exec_delay`: The delay in blocks before the changes take effect.
         * - `system_stakable_base`: The base value of system-stakable assets.
         */
        TokenConfigChanged: PlainDescriptor<Anonymize<Ib6jm3sbjvr41g>>;
        /**
         * A deposit operation has failed.
         *
         * - `token`: The identifier of the token being deposited.
         * - `amount`: The amount of the token to be deposited.
         * - `system_stakable_amount`: The amount staked in the system-stakable pool.
         * - `system_shadow_amount`: The amount shadow-staked in the system.
         * - `pending_redeem_amount`: The amount pending redemption.
         */
        DepositFailed: PlainDescriptor<Anonymize<I32m7n87450pqk>>;
        /**
         * Minting operation succeeded.
         *
         * - `token`: The identifier of the token being minted.
         * - `amount`: The amount of the token to be minted.
         * - `system_stakable_amount`: The amount staked in the system-stakable pool.
         * - `system_shadow_amount`: The amount shadow-staked in the system.
         * - `pending_redeem_amount`: The amount pending redemption.
         */
        MintSuccess: PlainDescriptor<Anonymize<I32m7n87450pqk>>;
        /**
         * Minting operation failed.
         *
         * # Parameters
         * (Same as MintSuccess)
         */
        MintFailed: PlainDescriptor<Anonymize<I32m7n87450pqk>>;
        /**
         * Withdrawal operation succeeded.
         *
         * # Parameters
         * (Same as MintSuccess)
         */
        WithdrawSuccess: PlainDescriptor<Anonymize<I32m7n87450pqk>>;
        /**
         * Withdrawal operation failed.
         *
         * # Parameters
         * (Same as MintSuccess)
         */
        WithdrawFailed: PlainDescriptor<Anonymize<I32m7n87450pqk>>;
        /**
         * A redemption operation has succeeded.
         *
         * # Parameters
         * (Same as MintSuccess)
         */
        Redeemed: PlainDescriptor<Anonymize<I32m7n87450pqk>>;
        /**
         * A redemption operation has failed.
         *
         * # Parameters
         * (Same as MintSuccess)
         */
        RedeemFailed: PlainDescriptor<Anonymize<I32m7n87450pqk>>;
        /**
         * The specified token could not be found.
         *
         * - `token`: The identifier of the token that was not found.
         */
        VtokenNotFound: PlainDescriptor<Anonymize<Ibmoqhjadutned>>;
        /**
         * Token information has been refreshed.
         *
         * - `token`: The identifier of the token whose information was refreshed.
         */
        TokenInfoRefreshed: PlainDescriptor<Anonymize<Ibmoqhjadutned>>;
        /**
         * A payout has been made.
         *
         * - `token`: The identifier of the token involved in the payout.
         * - `vtoken`: The identifier of the vtoken involved.
         * - `from`: The account from which the payout originated.
         * - `to`: The account to which the payout was made.
         * - `amount`: The total amount of the payout.
         * - `free`: The amount of free balance after the payout.
         * - `vfree`: The amount of vtoken free balance after the payout.
         * - `shadow`: The shadow balance after the payout.
         */
        Payout: PlainDescriptor<Anonymize<Idmkbek876hj4c>>;
        /**
         * payout error
         */
        PayoutFailed: PlainDescriptor<Anonymize<Ibmoqhjadutned>>;
    };
    FeeShare: {
        /**
         * A successful call of the `CreateDistribution` extrinsic will create this event.
         */
        Created: PlainDescriptor<Anonymize<I3096t0on20q3r>>;
        /**
         * A successful call of the `EditDistribution` extrinsic will create this event.
         */
        Edited: PlainDescriptor<Anonymize<I3096t0on20q3r>>;
        /**
         * A successful call of the `SetEraLength` extrinsic will create this event.
         */
        EraLengthSet: PlainDescriptor<Anonymize<I1s5stmgs1hmpi>>;
        /**
         * A successful call of the `ExecuteDistribute` extrinsic will create this event.
         */
        Executed: PlainDescriptor<Anonymize<I6d2fsv919ackd>>;
        /**
         * A successful call of the `DeleteDistribution` extrinsic will create this event.
         */
        Deleted: PlainDescriptor<Anonymize<I6d2fsv919ackd>>;
        /**
         * A failed call of the `ExecuteDistribute` extrinsic will create this event.
         */
        ExecuteFailed: PlainDescriptor<Anonymize<Im4b2ikida3i9>>;
        /**
         * A successful call of the `SetUSDConfig` extrinsic will create this event.
         */
        USDConfigSet: PlainDescriptor<Anonymize<Ia6mtguicisar7>>;
    };
    CrossInOut: {
        /**
         * Event emitted when a currency is successfully crossed out from a location.
         */
        CrossedOut: PlainDescriptor<Anonymize<Ibm9jk932uhjiv>>;
        /**
         * Event emitted when a currency is deregistered.
         */
        CurrencyDeregistered: PlainDescriptor<Anonymize<I6dlum3cbrie3d>>;
        /**
         * Event emitted when a linked account is successfully registered.
         */
        LinkedAccountRegistered: PlainDescriptor<Anonymize<Idraqa5k2q8rna>>;
        /**
         * Event emitted when an account is added to the register list.
         */
        AddedToRegisterList: PlainDescriptor<Anonymize<Iapol5cojcq8jr>>;
        /**
         * Event emitted when an account is removed from the register list.
         */
        RemovedFromRegisterList: PlainDescriptor<Anonymize<Iapol5cojcq8jr>>;
        /**
         * Event emitted when the crossing minimum amounts are set for a currency.
         */
        CrossingMinimumAmountSet: PlainDescriptor<Anonymize<Iarqih3rei93nj>>;
    };
    BbBNC: {
        /**
         * The minimum number of TokenType and minimum time that users can lock has been set.
         */
        ConfigSet: PlainDescriptor<Anonymize<I4l0aflet4nrh2>>;
        /**
         * A successful call of the `create_lock` function.
         */
        Minted: PlainDescriptor<Anonymize<I1d1m4pqd4gk9n>>;
        /**
         * Change in TokenType locked after calling.
         */
        Supply: PlainDescriptor<Anonymize<I9l001vgvntb06>>;
        /**
         * A position was created.
         */
        LockCreated: PlainDescriptor<Anonymize<I4n99li1ojr2lt>>;
        /**
         * A position was extended.
         */
        UnlockTimeIncreased: PlainDescriptor<Anonymize<I11eppnh5mek19>>;
        /**
         * A position was increased.
         */
        AmountIncreased: PlainDescriptor<Anonymize<I583v57rub6gg>>;
        /**
         * A position was withdrawn.
         */
        Withdrawn: PlainDescriptor<Anonymize<I583v57rub6gg>>;
        /**
         * Incentive config set.
         */
        IncentiveSet: PlainDescriptor<Anonymize<I4jhonprkmaiu3>>;
        /**
         * The rewards for this round have been added to the system account.
         */
        RewardAdded: PlainDescriptor<Anonymize<I9l30vpvn51jcs>>;
        /**
         * The user has received the reward.
         */
        Rewarded: PlainDescriptor<Anonymize<I2sfpbn9h49adg>>;
        /**
         * This currency_id has been refreshed.
         */
        AllRefreshed: PlainDescriptor<Anonymize<I6dlum3cbrie3d>>;
        /**
         * This currency_id has been partially refreshed.
         */
        PartiallyRefreshed: PlainDescriptor<Anonymize<I6dlum3cbrie3d>>;
        /**
         * Notify reward failed.
         */
        NotifyRewardFailed: PlainDescriptor<Anonymize<I9l30vpvn51jcs>>;
        /**
         * Markup has been deposited.
         */
        MarkupDeposited: PlainDescriptor<Anonymize<Icglvublte8208>>;
        /**
         * Markup has been withdrawn.
         */
        MarkupWithdrawn: PlainDescriptor<Anonymize<Iabmnrd4204mhc>>;
    };
    Slpx: {
        /**
         * Add the contract account to the whitelist
         */
        AddWhitelistAccountId: PlainDescriptor<Anonymize<I3r2vobfen6tu5>>;
        /**
         * Remove the contract account from the whitelist
         */
        RemoveWhitelistAccountId: PlainDescriptor<Anonymize<I3r2vobfen6tu5>>;
        /**
         * Set the transfer fee for the currency, only for Moonbeam
         */
        SetTransferToFee: PlainDescriptor<Anonymize<I6s65kicknm51n>>;
        /**
         * Set the execution fee for the order
         */
        SetExecutionFee: PlainDescriptor<Anonymize<I7u9oegj4csj51>>;
        /**
         * Support currency to xcm oracle
         */
        SupportXcmOracle: PlainDescriptor<Anonymize<Ifuaakr3i6qaje>>;
        /**
         * Set the xcm oracle configuration
         */
        SetXcmOracleConfiguration: PlainDescriptor<Anonymize<I792urf76hgnm9>>;
        /**
         * Send Xcm message
         */
        XcmOracle: PlainDescriptor<Anonymize<I2trdp5iask9k1>>;
        /**
         * Set the currency to support the XCM fee
         */
        SetCurrencyToSupportXcmFee: PlainDescriptor<Anonymize<Ifuaakr3i6qaje>>;
        /**
         * Set the delay block
         */
        SetDelayBlock: PlainDescriptor<Anonymize<I7j4i782lpafvm>>;
        /**
         * Create order
         */
        CreateOrder: PlainDescriptor<Anonymize<Ic72ofb1evmh8f>>;
        /**
         * Order handled
         */
        OrderHandled: PlainDescriptor<Anonymize<Ic72ofb1evmh8f>>;
        /**
         * Order failed
         */
        OrderFailed: PlainDescriptor<Anonymize<Ic72ofb1evmh8f>>;
        /**
         * Xcm oracle failed
         */
        XcmOracleFailed: PlainDescriptor<Anonymize<Ia74hfkpnt69k4>>;
        /**
         * Withdraw xcm fee
         */
        InsufficientAssets: PlainDescriptor<undefined>;
        /**
         * Set HyperBridge Oracle Config
         */
        SetHyperBridgeOracleConfig: PlainDescriptor<Anonymize<Ido7vo1b67803n>>;
        /**
         * Set Hydration Oracle Config
         */
        SetHydrationOracleConfig: PlainDescriptor<Anonymize<Iqdolbo3k85bf>>;
        /**
         * Async Mint executed
         */
        AsyncMintExecuted: PlainDescriptor<Anonymize<I1s6n791iat49a>>;
        /**
         * Async Mint configuration updated
         */
        AsyncMintConfigUpdated: PlainDescriptor<Anonymize<If9ob1e8r14nrm>>;
        /**
         * Async Mint execution failed
         */
        AsyncMintExecutionFailed: PlainDescriptor<Anonymize<Icb87m5nbt8smg>>;
    };
    FellowshipCollective: {
        /**
         * A member `who` has been added.
         */
        MemberAdded: PlainDescriptor<Anonymize<I4cbvqmqadhrea>>;
        /**
         * The member `who`se rank has been changed to the given `rank`.
         */
        RankChanged: PlainDescriptor<Anonymize<Im1pm2vf6llcn>>;
        /**
         * The member `who` of given `rank` has been removed from the collective.
         */
        MemberRemoved: PlainDescriptor<Anonymize<Im1pm2vf6llcn>>;
        /**
         * The member `who` has voted for the `poll` with the given `vote` leading to an updated
         * `tally`.
         */
        Voted: PlainDescriptor<Anonymize<I21jsoeb0o6476>>;
        /**
         * The member `who` had their `AccountId` changed to `new_who`.
         */
        MemberExchanged: PlainDescriptor<Anonymize<Ier6ck0tpfo7>>;
    };
    FellowshipReferenda: {
        /**
         * A referendum has been submitted.
         */
        Submitted: PlainDescriptor<Anonymize<I229ijht536qdu>>;
        /**
         * The decision deposit has been placed.
         */
        DecisionDepositPlaced: PlainDescriptor<Anonymize<I62nte77gksm0f>>;
        /**
         * The decision deposit has been refunded.
         */
        DecisionDepositRefunded: PlainDescriptor<Anonymize<I62nte77gksm0f>>;
        /**
         * A deposit has been slashed.
         */
        DepositSlashed: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * A referendum has moved into the deciding phase.
         */
        DecisionStarted: PlainDescriptor<Anonymize<Ic6ecdcp9ut7jd>>;
        /**
        
         */
        ConfirmStarted: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
        
         */
        ConfirmAborted: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A referendum has ended its confirmation phase and is ready for approval.
         */
        Confirmed: PlainDescriptor<Anonymize<I27notaksll8qt>>;
        /**
         * A referendum has been approved and its proposal has been scheduled.
         */
        Approved: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A proposal has been rejected by referendum.
         */
        Rejected: PlainDescriptor<Anonymize<I27notaksll8qt>>;
        /**
         * A referendum has been timed out without being decided.
         */
        TimedOut: PlainDescriptor<Anonymize<I27notaksll8qt>>;
        /**
         * A referendum has been cancelled.
         */
        Cancelled: PlainDescriptor<Anonymize<I27notaksll8qt>>;
        /**
         * A referendum has been killed.
         */
        Killed: PlainDescriptor<Anonymize<I27notaksll8qt>>;
        /**
         * The submission deposit has been refunded.
         */
        SubmissionDepositRefunded: PlainDescriptor<Anonymize<I62nte77gksm0f>>;
        /**
         * Metadata for a referendum has been set.
         */
        MetadataSet: PlainDescriptor<Anonymize<I4f1hv034jf1dt>>;
        /**
         * Metadata for a referendum has been cleared.
         */
        MetadataCleared: PlainDescriptor<Anonymize<I4f1hv034jf1dt>>;
    };
    StableAsset: {
        /**
         * A new pool is created.
         */
        CreatePool: PlainDescriptor<Anonymize<I54dj4621btbog>>;
        /**
         * Liquidity is added to the pool.
         */
        LiquidityAdded: PlainDescriptor<Anonymize<I8eeivtdimg5sg>>;
        /**
         * Token is swapped.
         */
        TokenSwapped: PlainDescriptor<Anonymize<I2i1mj9dta3f5r>>;
        /**
         * Token is redeemed by proportion.
         */
        RedeemedProportion: PlainDescriptor<Anonymize<Ie26sa5pkqc7lh>>;
        /**
         * Token is redeemed by single asset.
         */
        RedeemedSingle: PlainDescriptor<Anonymize<I5a9b1h9uneb16>>;
        /**
         * Token is redeemed by multiple assets.
         */
        RedeemedMulti: PlainDescriptor<Anonymize<It3rcku7atiln>>;
        /**
         * The pool field balances is updated.
         */
        BalanceUpdated: PlainDescriptor<Anonymize<I2e6ar36i5p9qo>>;
        /**
         * Yield is collected.
         */
        YieldCollected: PlainDescriptor<Anonymize<Ifssptimng3fig>>;
        /**
         * Fee is collected.
         */
        FeeCollected: PlainDescriptor<Anonymize<I2d4kqt7h8dvva>>;
        /**
         * The pool amplification coefficient is modified.
         */
        AModified: PlainDescriptor<Anonymize<I6ou90sd9g7cje>>;
        /**
         * The pool fees are modified.
         */
        FeeModified: PlainDescriptor<Anonymize<I3dqh1v95db76q>>;
        /**
         * The pool recipients are modified.
         */
        RecipientModified: PlainDescriptor<Anonymize<Iec84e3i3f9e7f>>;
        /**
         * The token rate is set.
         */
        TokenRateSet: PlainDescriptor<Anonymize<Id99ueqaguc9dv>>;
        /**
         * The hardcap of the token rate is configured.
         */
        TokenRateHardcapConfigured: PlainDescriptor<Anonymize<Icu74rtf3kd9gd>>;
        /**
         * The hardcap of the token rate is removed.
         */
        TokenRateHardcapRemoved: PlainDescriptor<Anonymize<I8v7akpi7cdcp5>>;
        /**
         * The token rate is refreshed.
         */
        TokenRateRefreshFailed: PlainDescriptor<Anonymize<I931cottvong90>>;
        /**
         * Rate adjustment was limited by hardcap
         * Parameters: [pool_id, vtoken, current_rate, target_rate, adjusted_rate]
         */
        RateAdjustmentLimited: PlainDescriptor<Anonymize<I4km0f35j8vt1e>>;
    };
    VtokenVoting: {
        /**
         * A vote has been cast.
         *
         * - `who`: The account that cast the vote.
         * - `vtoken`: The token used for voting.
         * - `poll_index`: The index of the poll being voted on.
         * - `token_vote`: The vote cast using the token.
         * - `delegator_vote`: The vote cast by a delegator.
         */
        Voted: PlainDescriptor<Anonymize<I1u6hbnc76ae0b>>;
        /**
         * A user's vote has been unlocked, allowing them to retrieve their tokens.
         *
         * - `who`: The account whose tokens are unlocked.
         * - `vtoken`: The token that was locked during voting.
         * - `poll_index`: The index of the poll associated with the unlocking,
         * If set to none, the unlocked assets are those voted for by users through delegation.
         */
        Unlocked: PlainDescriptor<Anonymize<Ie0lvd1qdm103>>;
        /**
         * A delegator's vote has been removed.
         *
         * - `who`: The account that dispatched remove_delegator_vote.
         * - `vtoken`: The token associated with the delegator's vote.
         * - `derivative_index`: The index of the derivative.
         */
        DelegatorVoteRemoved: PlainDescriptor<Anonymize<Ib3hb8lrtttf9v>>;
        /**
         * A delegator has been added.
         *
         * - `vtoken`: The token associated with the delegator.
         * - `derivative_index`: The index of the derivative being added for the delegator.
         */
        DelegatorAdded: PlainDescriptor<Anonymize<Iefli0cgm44m3b>>;
        /**
         * A new referendum information has been created.
         *
         * - `vtoken`: The token associated with the referendum.
         * - `poll_index`: The index of the poll.
         * - `info`: The referendum information (details about the poll).
         */
        ReferendumInfoCreated: PlainDescriptor<Anonymize<Iaij9kantm3v0b>>;
        /**
         * Referendum information has been updated.
         *
         * - `vtoken`: The token associated with the referendum.
         * - `poll_index`: The index of the poll.
         * - `info`: The updated referendum information.
         */
        ReferendumInfoSet: PlainDescriptor<Anonymize<Iaij9kantm3v0b>>;
        /**
         * The vote locking period has been set.
         *
         * - `vtoken`: The token for which the locking period is being set.
         * - `locking_period`: The period for which votes will be locked (in block numbers).
         */
        VoteLockingPeriodSet: PlainDescriptor<Anonymize<I8l8g9smisvqei>>;
        /**
         * The undeciding timeout period has been set.
         *
         * - `vtoken`: The token associated with the timeout.
         * - `undeciding_timeout`: The period of time before a poll is considered undecided.
         */
        UndecidingTimeoutSet: PlainDescriptor<Anonymize<I2ce5d3bnbbfhi>>;
        /**
         * A referendum has been killed (cancelled or ended).
         *
         * - `vtoken`: The token associated with the referendum.
         * - `poll_index`: The index of the poll being killed.
         */
        ReferendumKilled: PlainDescriptor<Anonymize<Iaj42ghmtrj594>>;
        /**
         * A notification about the result of a vote has been sent.
         *
         * - `vtoken`: The token associated with the poll.
         * - `poll_index`: The index of the poll.
         * - `success`: Whether the notification was successful or not.
         */
        VoteNotified: PlainDescriptor<Anonymize<Iet09kgtjdhfi9>>;
        /**
         * A notification about the removal of a delegator's vote has been sent.
         *
         * - `vtoken`: The token associated with the poll.
         * - `poll_index`: The index of the poll.
         * - `success`: Whether the notification was successful or not.
         */
        DelegatorVoteRemovedNotified: PlainDescriptor<Anonymize<Iet09kgtjdhfi9>>;
        /**
         * A response has been received from a specific location.
         *
         * - `responder`: The location that sent the response.
         * - `query_id`: The ID of the query that was responded to.
         * - `response`: The content of the response.
         */
        ResponseReceived: PlainDescriptor<Anonymize<Ierak47ctqnjrn>>;
        /**
         * The vote cap ratio has been set.
         *
         * - `vtoken`: The token associated with the cap.
         * - `vote_cap_ratio`: The maximum allowed ratio for the vote.
         */
        VoteCapRatioSet: PlainDescriptor<Anonymize<Ifuh1k8nfv6s7l>>;
        /**
         * A referendum's status was updated.
         */
        ReferendumStatusUpdated: PlainDescriptor<Anonymize<I5ca2goaq3h8bs>>;
        /**
         * An account has delegated their vote to another account. \[who, target\]
         */
        Delegated: PlainDescriptor<Anonymize<I10r7il4gvbcae>>;
        /**
         * An \[account\] has cancelled a previous delegation operation.
         */
        Undelegated: PlainDescriptor<SS58String>;
    };
    LendMarket: {
        /**
         * Enable collateral for certain asset
         * [sender, asset_id]
         */
        CollateralAssetAdded: PlainDescriptor<Anonymize<Icoe72r8pkf564>>;
        /**
         * Disable collateral for certain asset
         * [sender, asset_id]
         */
        CollateralAssetRemoved: PlainDescriptor<Anonymize<Icoe72r8pkf564>>;
        /**
         * Event emitted when assets are deposited
         * [sender, asset_id, amount]
         */
        Deposited: PlainDescriptor<Anonymize<I82kd33a80644k>>;
        /**
         * Event emitted when assets are redeemed
         * [sender, asset_id, amount]
         */
        Redeemed: PlainDescriptor<Anonymize<I82kd33a80644k>>;
        /**
         * Event emitted when cash is borrowed
         * [sender, asset_id, amount]
         */
        Borrowed: PlainDescriptor<Anonymize<I82kd33a80644k>>;
        /**
         * Event emitted when a borrow is repaid
         * [sender, asset_id, amount]
         */
        RepaidBorrow: PlainDescriptor<Anonymize<I82kd33a80644k>>;
        /**
         * Event emitted when a borrow is liquidated
         * [liquidator, borrower, liquidation_asset_id, collateral_asset_id, repay_amount,
         * collateral_amount]
         */
        LiquidatedBorrow: PlainDescriptor<Anonymize<Ibnls8eh7606j5>>;
        /**
         * Event emitted when the reserves are reduced
         * [admin, asset_id, reduced_amount, total_reserves]
         */
        ReservesReduced: PlainDescriptor<Anonymize<I2jen5a002vjo5>>;
        /**
         * Event emitted when the reserves are added
         * [admin, asset_id, added_amount, total_reserves]
         */
        ReservesAdded: PlainDescriptor<Anonymize<I2jen5a002vjo5>>;
        /**
         * New market is set
         * [new_interest_rate_model]
         */
        NewMarket: PlainDescriptor<Anonymize<I7gtc6jb6l82np>>;
        /**
         * Event emitted when a market is activated
         * [admin, asset_id]
         */
        ActivatedMarket: PlainDescriptor<Anonymize<Iebirugq1dbhv6>>;
        /**
         * New market parameters is updated
         * [admin, asset_id]
         */
        UpdatedMarket: PlainDescriptor<Anonymize<I7gtc6jb6l82np>>;
        /**
         * Reward added
         */
        RewardAdded: PlainDescriptor<Anonymize<I95l2k9b1re95f>>;
        /**
         * Reward withdrawed
         */
        RewardWithdrawn: PlainDescriptor<Anonymize<I95l2k9b1re95f>>;
        /**
         * Event emitted when market reward speed updated.
         */
        MarketRewardSpeedUpdated: PlainDescriptor<Anonymize<Icj4504vnoorlb>>;
        /**
         * Deposited when Reward is distributed to a supplier
         */
        DistributedSupplierReward: PlainDescriptor<Anonymize<Iedc2b32l00pnc>>;
        /**
         * Deposited when Reward is distributed to a borrower
         */
        DistributedBorrowerReward: PlainDescriptor<Anonymize<Iedc2b32l00pnc>>;
        /**
         * Reward Paid for user
         */
        RewardPaid: PlainDescriptor<Anonymize<I95l2k9b1re95f>>;
        /**
         * Event emitted when the incentive reserves are redeemed and transfer to receiver's
         * account [receive_account_id, asset_id, reduced_amount]
         */
        IncentiveReservesReduced: PlainDescriptor<Anonymize<I82kd33a80644k>>;
        /**
         * Liquidation free collaterals has been updated
         */
        LiquidationFreeCollateralsUpdated: PlainDescriptor<Anonymize<I6ae21pstqk9et>>;
        /**
        
         */
        MarketBonded: PlainDescriptor<Anonymize<Ie5efe5gkg0kqs>>;
    };
    Prices: {
        /**
         * Set emergency price. \[asset_id, price_detail\]
         */
        SetPrice: PlainDescriptor<Anonymize<Ifrnnpj83g127a>>;
        /**
         * Reset emergency price. \[asset_id\]
         */
        ResetPrice: PlainDescriptor<Anonymize<Iebirugq1dbhv6>>;
    };
    Oracle: {
        /**
         * New feed data is submitted.
         */
        NewFeedData: PlainDescriptor<Anonymize<I1eml7ojrir0mf>>;
        /**
        
         */
        FeedValueReachingLimit: PlainDescriptor<Anonymize<I9ah39ggsni5h8>>;
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
    LeverageStaking: {
        /**
         * User's leverage rate has been changed.
         */
        FlashLoanDeposited: PlainDescriptor<Anonymize<I64s470272rog7>>;
    };
    ChannelCommission: {
        /**
        
         */
        ChannelRegistered: PlainDescriptor<Anonymize<Ifq40td50oojcr>>;
        /**
        
         */
        ChannelRemoved: PlainDescriptor<Anonymize<Ib73p6n69t2jsn>>;
        /**
        
         */
        ChannelReceiveAccountUpdated: PlainDescriptor<Anonymize<I4pgd6mkjk426o>>;
        /**
        
         */
        CommissionTokenSet: PlainDescriptor<Anonymize<I98hpr879arfv5>>;
        /**
        
         */
        ChannelCommissionSet: PlainDescriptor<Anonymize<Ievk931u2c7sqn>>;
        /**
        
         */
        CommissionClaimed: PlainDescriptor<Anonymize<I7rjrrm2njpd6g>>;
        /**
        
         */
        ChannelVtokenSharesUpdated: PlainDescriptor<Anonymize<Ielfbmscl7ukmv>>;
        /**
        
         */
        VtokenIssuanceSnapshotUpdated: PlainDescriptor<Anonymize<I673slhfrj1s4r>>;
        /**
        
         */
        PeriodVtokenTotalMintUpdated: PlainDescriptor<Anonymize<Iedejl9np3oh6e>>;
        /**
        
         */
        PeriodVtokenTotalRedeemUpdated: PlainDescriptor<Anonymize<I59j15t8ardoqh>>;
        /**
        
         */
        PeriodChannelVtokenMintUpdated: PlainDescriptor<Anonymize<Id5kb2ocrab7gs>>;
        /**
        
         */
        PeriodTotalCommissionsUpdated: PlainDescriptor<Anonymize<Ie0kb5p5oqesib>>;
        /**
        
         */
        ChannelClaimableCommissionUpdated: PlainDescriptor<Anonymize<I7rjrrm2njpd6g>>;
        /**
         * Emitted when a Permill calculation fails.
         * This event carries the numerator and denominator that caused the failure.
         */
        CalculationFailed: PlainDescriptor<Anonymize<Ic8tdmoaknl87u>>;
        /**
         * Bifrost commission transfer failed.
         * Parameters are the commission token and the amount that failed to transfer.
         */
        BifrostCommissionTransferFailed: PlainDescriptor<Anonymize<I1iscme8538ekh>>;
        /**
         * Error event indicating that the removal process of clearing was not completed.
         */
        RemovalNotCompleteError: PlainDescriptor<Anonymize<Ia9at2kloifkm>>;
        /**
         * Error event indicating that the clearing environment setting failed.
         */
        SetClearingEnvironmentFailed: PlainDescriptor<Anonymize<Ibe6clpska8jpe>>;
    };
    CloudsConvert: {
        /**
        
         */
        CloudsConverted: PlainDescriptor<Anonymize<Ic5ic29aibpkll>>;
        /**
        
         */
        VbncCharged: PlainDescriptor<Anonymize<I6v3aulqfb3eps>>;
    };
    BuyBack: {
        /**
         * A successful call of the `Charge` extrinsic will create this event.
         */
        Charged: PlainDescriptor<Anonymize<Icglvublte8208>>;
        /**
         * A successful call of the `SetVtoken` extrinsic will create this event.
         */
        ConfigSet: PlainDescriptor<Anonymize<I3o2122ij3mdp9>>;
        /**
         * A successful call of the `RemoveVtoken` extrinsic will create this event.
         */
        Removed: PlainDescriptor<Anonymize<I6dlum3cbrie3d>>;
        /**
         * A failed call of the `BuyBack` extrinsic will create this event.
         */
        BuyBackFailed: PlainDescriptor<Anonymize<Idu9ifj08mb2m9>>;
        /**
         * A successful call of the `BuyBack` extrinsic will create this event.
         */
        BuyBackSuccess: PlainDescriptor<Anonymize<Idu9ifj08mb2m9>>;
        /**
         * A failed call of the `AddLiquidity` extrinsic will create this event.
         */
        AddLiquidityFailed: PlainDescriptor<Anonymize<Idu9ifj08mb2m9>>;
        /**
         * A successful call of the `AddLiquidity` extrinsic will create this event.
         */
        AddLiquiditySuccess: PlainDescriptor<Anonymize<Idu9ifj08mb2m9>>;
        /**
         * A failed call of the `SetSwapOutMin` extrinsic will create this event.
         */
        SetSwapOutMinFailed: PlainDescriptor<Anonymize<Idu9ifj08mb2m9>>;
        /**
         * A successful call of the `SetSwapOutMin` extrinsic will create this event.
         */
        SetSwapOutMinSuccess: PlainDescriptor<Anonymize<Idu9ifj08mb2m9>>;
    };
    SlpV2: {
        /**
         * Add a delegator to the staking protocol.
         */
        AddDelegator: PlainDescriptor<Anonymize<I1rrnio7jcs0u8>>;
        /**
         * Remove a delegator from the staking protocol.
         */
        RemoveDelegator: PlainDescriptor<Anonymize<I1rrnio7jcs0u8>>;
        /**
         * Add a validator to the staking protocol.
         */
        AddValidator: PlainDescriptor<Anonymize<Ieprlpg14vh08o>>;
        /**
         * Remove a validator from the staking protocol.
         */
        RemoveValidator: PlainDescriptor<Anonymize<Ieprlpg14vh08o>>;
        /**
         * Set configuration for a specific staking protocol.
         */
        SetConfiguration: PlainDescriptor<Anonymize<Iok3ke9gllunv>>;
        /**
         * Set ledger for a specific delegator.
         */
        SetLedger: PlainDescriptor<Anonymize<Ifvladst7gf7jp>>;
        /**
         * Send xcm task.
         */
        SendXcmTask: PlainDescriptor<Anonymize<Iat73h6pu514au>>;
        /**
         * Xcm task response received.
         */
        NotifyResponseReceived: PlainDescriptor<Anonymize<I5lh65scrfj49b>>;
        /**
         * Time unit updated.
         */
        TimeUnitUpdated: PlainDescriptor<Anonymize<I6v46ileea69h8>>;
        /**
         * Token exchange rate updated.
         */
        TokenExchangeRateUpdated: PlainDescriptor<Anonymize<I8sdd7udi8ebmk>>;
        /**
         * Transfer the staking token to remote chain.
         */
        TransferTo: PlainDescriptor<Anonymize<Ifldp5atp2n26t>>;
        /**
         * Transfer the staking token back from remote chain.
         */
        TransferBack: PlainDescriptor<Anonymize<I3hd4vted81pma>>;
        /**
         * Ethereum staking task.
         */
        EthereumStaking: PlainDescriptor<Anonymize<I4c9kt1ip8g4lh>>;
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
    Indices: {
        /**
         * The index was not already assigned.
         */
        NotAssigned: PlainDescriptor<undefined>;
        /**
         * The index is assigned to another account.
         */
        NotOwner: PlainDescriptor<undefined>;
        /**
         * The index was not available.
         */
        InUse: PlainDescriptor<undefined>;
        /**
         * The source and destination accounts are identical.
         */
        NotTransfer: PlainDescriptor<undefined>;
        /**
         * The index is permanent and may not be freed/changed.
         */
        Permanent: PlainDescriptor<undefined>;
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
        /**
         * Too many locations authorized to alias origin.
         */
        TooManyAuthorizedAliases: PlainDescriptor<undefined>;
        /**
         * Expiry block number is in the past.
         */
        ExpiresInPast: PlainDescriptor<undefined>;
        /**
         * The alias to remove authorization for was not found.
         */
        AliasNotFound: PlainDescriptor<undefined>;
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
    Utility: {
        /**
         * Too many calls batched.
         */
        TooManyCalls: PlainDescriptor<undefined>;
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
         * Multisig operation not found in storage.
         */
        NotFound: PlainDescriptor<undefined>;
        /**
         * Only the account that originally created the multisig is able to cancel it or update
         * its deposits.
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
        /**
         * change to the same per_block param
         */
        SamePerBlock: PlainDescriptor<undefined>;
        /**
         * VestingStartAt storage is not set
         */
        VestingStartAtNotSet: PlainDescriptor<undefined>;
        /**
         * Wrong amount
         */
        WrongLockedAmount: PlainDescriptor<undefined>;
        /**
         * Wrong vesting during cliff period
         */
        WrongCliffVesting: PlainDescriptor<undefined>;
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
        /**
         * Address not allowed to deploy contracts either via CREATE or CALL(CREATE).
         */
        CreateOriginNotAllowed: PlainDescriptor<undefined>;
    };
    EVMAccounts: {
        /**
         * EVM Account's nonce is not zero
         */
        TruncatedAccountAlreadyUsed: PlainDescriptor<undefined>;
        /**
         * Address is already bound
         */
        AddressAlreadyBound: PlainDescriptor<undefined>;
        /**
         * Bound address cannot be used
         */
        BoundAddressCannotBeUsed: PlainDescriptor<undefined>;
        /**
         * Address not whitelisted
         */
        AddressNotWhitelisted: PlainDescriptor<undefined>;
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
         * The transferring asset amount is zero.
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
    Tokens: {
        /**
         * The balance is too low
         */
        BalanceTooLow: PlainDescriptor<undefined>;
        /**
         * Cannot convert Amount into Balance type
         */
        AmountIntoBalanceFailed: PlainDescriptor<undefined>;
        /**
         * Failed because liquidity restrictions due to locking
         */
        LiquidityRestrictions: PlainDescriptor<undefined>;
        /**
         * Failed because the maximum locks was exceeded
         */
        MaxLocksExceeded: PlainDescriptor<undefined>;
        /**
         * Transfer/payment would kill account
         */
        KeepAlive: PlainDescriptor<undefined>;
        /**
         * Value too low to create account due to existential deposit
         */
        ExistentialDeposit: PlainDescriptor<undefined>;
        /**
         * Beneficiary account must pre-exist
         */
        DeadAccount: PlainDescriptor<undefined>;
        /**
        
         */
        TooManyReserves: PlainDescriptor<undefined>;
    };
    Currencies: {
        /**
         * Unable to convert the Amount type into Balance.
         */
        AmountIntoBalanceFailed: PlainDescriptor<undefined>;
        /**
         * Balance is too low.
         */
        BalanceTooLow: PlainDescriptor<undefined>;
        /**
         * Deposit result is not expected
         */
        DepositFailed: PlainDescriptor<undefined>;
    };
    UnknownTokens: {
        /**
         * The balance is too low.
         */
        BalanceTooLow: PlainDescriptor<undefined>;
        /**
         * The operation will cause balance to overflow.
         */
        BalanceOverflow: PlainDescriptor<undefined>;
        /**
         * Unhandled asset.
         */
        UnhandledAsset: PlainDescriptor<undefined>;
    };
    OrmlXcm: {
        /**
         * The message and destination combination was not recognized as being
         * reachable.
         */
        Unreachable: PlainDescriptor<undefined>;
        /**
         * The message and destination was recognized as being reachable but
         * the operation could not be completed.
         */
        SendFailure: PlainDescriptor<undefined>;
        /**
         * The version of the `Versioned` value used is not able to be
         * interpreted.
         */
        BadVersion: PlainDescriptor<undefined>;
    };
    ZenlinkProtocol: {
        /**
         * Require the admin who can reset the admin and receiver of the protocol fee.
         */
        RequireProtocolAdmin: PlainDescriptor<undefined>;
        /**
         * Require the admin candidate who can become new admin after confirm.
         */
        RequireProtocolAdminCandidate: PlainDescriptor<undefined>;
        /**
         * Invalid fee_point
         */
        InvalidFeePoint: PlainDescriptor<undefined>;
        /**
         * Unsupported AssetId by this ZenlinkProtocol Version.
         */
        UnsupportedAssetType: PlainDescriptor<undefined>;
        /**
         * Account balance must be greater than or equal to the transfer amount.
         */
        InsufficientAssetBalance: PlainDescriptor<undefined>;
        /**
         * Account native currency balance must be greater than ExistentialDeposit.
         */
        NativeBalanceTooLow: PlainDescriptor<undefined>;
        /**
         * Trading pair can't be created.
         */
        DeniedCreatePair: PlainDescriptor<undefined>;
        /**
         * Trading pair already exists.
         */
        PairAlreadyExists: PlainDescriptor<undefined>;
        /**
         * Trading pair does not exist.
         */
        PairNotExists: PlainDescriptor<undefined>;
        /**
         * Asset does not exist.
         */
        AssetNotExists: PlainDescriptor<undefined>;
        /**
         * Liquidity is not enough.
         */
        InsufficientLiquidity: PlainDescriptor<undefined>;
        /**
         * Trading pair does have enough foreign.
         */
        InsufficientPairReserve: PlainDescriptor<undefined>;
        /**
         * Get target amount is less than exception.
         */
        InsufficientTargetAmount: PlainDescriptor<undefined>;
        /**
         * Sold amount is more than exception.
         */
        ExcessiveSoldAmount: PlainDescriptor<undefined>;
        /**
         * Can't find pair though trading path.
         */
        InvalidPath: PlainDescriptor<undefined>;
        /**
         * Incorrect foreign amount range.
         */
        IncorrectAssetAmountRange: PlainDescriptor<undefined>;
        /**
         * Overflow.
         */
        Overflow: PlainDescriptor<undefined>;
        /**
         * Transaction block number is larger than the end block number.
         */
        Deadline: PlainDescriptor<undefined>;
        /**
         * Location given was invalid or unsupported.
         */
        AccountIdBadLocation: PlainDescriptor<undefined>;
        /**
         * XCM execution failed.
         */
        ExecutionFailed: PlainDescriptor<undefined>;
        /**
         * Transfer to self by XCM message.
         */
        DeniedTransferToSelf: PlainDescriptor<undefined>;
        /**
         * Not in ZenlinkRegistedParaChains.
         */
        TargetChainNotRegistered: PlainDescriptor<undefined>;
        /**
         * Can't pass the K value check
         */
        InvariantCheckFailed: PlainDescriptor<undefined>;
        /**
         * Created pair can't create now
         */
        PairCreateForbidden: PlainDescriptor<undefined>;
        /**
         * Pair is not in bootstrap
         */
        NotInBootstrap: PlainDescriptor<undefined>;
        /**
         * Amount of contribution is invalid.
         */
        InvalidContributionAmount: PlainDescriptor<undefined>;
        /**
         * Amount of contribution is invalid.
         */
        UnqualifiedBootstrap: PlainDescriptor<undefined>;
        /**
         * Zero contribute in bootstrap
         */
        ZeroContribute: PlainDescriptor<undefined>;
        /**
         * Bootstrap deny refund
         */
        DenyRefund: PlainDescriptor<undefined>;
        /**
         * Bootstrap is disable
         */
        DisableBootstrap: PlainDescriptor<undefined>;
        /**
         * Not eligible to contribute
         */
        NotQualifiedAccount: PlainDescriptor<undefined>;
        /**
         * Reward of bootstrap is not set.
         */
        NoRewardTokens: PlainDescriptor<undefined>;
        /**
         * Charge bootstrap extrinsic args has error,
         */
        ChargeRewardParamsError: PlainDescriptor<undefined>;
        /**
         * Exist some reward in bootstrap,
         */
        ExistRewardsInBootstrap: PlainDescriptor<undefined>;
    };
    Ismp: {
        /**
         * Invalid ISMP message
         */
        InvalidMessage: PlainDescriptor<undefined>;
        /**
         * Requested message was not found
         */
        MessageNotFound: PlainDescriptor<undefined>;
        /**
         * Encountered an error while creating the consensus client.
         */
        ConsensusClientCreationFailed: PlainDescriptor<undefined>;
        /**
         * Couldn't update unbonding period
         */
        UnbondingPeriodUpdateFailed: PlainDescriptor<undefined>;
        /**
         * Couldn't update challenge period
         */
        ChallengePeriodUpdateFailed: PlainDescriptor<undefined>;
    };
    TokenGateway: {
        /**
         * A asset that has not been registered
         */
        UnregisteredAsset: PlainDescriptor<undefined>;
        /**
         * Error while teleporting asset
         */
        AssetTeleportError: PlainDescriptor<undefined>;
        /**
         * Coprocessor was not configured in the runtime
         */
        CoprocessorNotConfigured: PlainDescriptor<undefined>;
        /**
         * Asset or update Dispatch Error
         */
        DispatchError: PlainDescriptor<undefined>;
        /**
         * Asset Id creation failed
         */
        AssetCreationError: PlainDescriptor<undefined>;
        /**
         * Asset decimals not found
         */
        AssetDecimalsNotFound: PlainDescriptor<undefined>;
        /**
         * Protocol Params have not been initialized
         */
        NotInitialized: PlainDescriptor<undefined>;
        /**
         * Unknown Asset
         */
        UnknownAsset: PlainDescriptor<undefined>;
        /**
         * BoundedVec conversion failed
         */
        FailToConvert: PlainDescriptor<undefined>;
    };
    FlexibleFee: {
        /**
         * The account does not have enough balance to perform the operation.
         */
        NotEnoughBalance: PlainDescriptor<undefined>;
        /**
         * An error occurred during currency conversion.
         */
        ConversionError: PlainDescriptor<undefined>;
        /**
         * No weight or fee information is available for the requested operation.
         */
        WeightAndFeeNotExist: PlainDescriptor<undefined>;
        /**
         * The message cannot be weighed, possibly due to insufficient information.
         */
        UnweighableMessage: PlainDescriptor<undefined>;
        /**
         * The XCM execution has failed.
         */
        XcmExecutionFailed: PlainDescriptor<undefined>;
        /**
         * The specified currency is not supported by the system.
         */
        CurrencyNotSupport: PlainDescriptor<undefined>;
        /**
         * The maximum number of currencies that can be handled has been reached.
         */
        MaxCurrenciesReached: PlainDescriptor<undefined>;
        /**
         * EVM permit expired.
         */
        EvmPermitExpired: PlainDescriptor<undefined>;
        /**
         * EVM permit is invalid.
         */
        EvmPermitInvalid: PlainDescriptor<undefined>;
        /**
         * EVM permit call failed.
         */
        EvmPermitCallExecutionError: PlainDescriptor<undefined>;
        /**
         * EVM permit call failed.
         */
        EvmPermitRunnerError: PlainDescriptor<undefined>;
        /**
         * Percentage calculation failed due to overflow.
         */
        PercentageCalculationFailed: PlainDescriptor<undefined>;
    };
    Salp: {
        /**
         * The first slot needs to at least be less than 3 `max_value`.
         */
        FirstSlotTooFarInFuture: PlainDescriptor<undefined>;
        /**
         * Last slot must be greater than first slot.
         */
        LastSlotBeforeFirstSlot: PlainDescriptor<undefined>;
        /**
         * The last slot cannot be more then 3 slots after the first slot.
         */
        LastSlotTooFarInFuture: PlainDescriptor<undefined>;
        /**
         * There was an overflow.
         */
        Overflow: PlainDescriptor<undefined>;
        /**
         * The contribution was below the minimum, `MinContribution`.
         */
        ContributionTooSmall: PlainDescriptor<undefined>;
        /**
         * The account doesn't have any contribution to the fund.
         */
        ZeroContribution: PlainDescriptor<undefined>;
        /**
         * Invalid fund index.
         */
        InvalidParaId: PlainDescriptor<undefined>;
        /**
         * Invalid fund status.
         */
        InvalidFundStatus: PlainDescriptor<undefined>;
        /**
         * Invalid contribution status.
         */
        InvalidContributionStatus: PlainDescriptor<undefined>;
        /**
         * Contributions exceed maximum amount.
         */
        CapExceeded: PlainDescriptor<undefined>;
        /**
         * The fund has been registered.
         */
        FundAlreadyCreated: PlainDescriptor<undefined>;
        /**
         * Crosschain xcm failed
         */
        XcmFailed: PlainDescriptor<undefined>;
        /**
         * Don't have enough vsToken/vsBond to refund
         */
        NotEnoughReservedAssetsToRefund: PlainDescriptor<undefined>;
        /**
         * Don't have enough token to refund by users
         */
        NotEnoughBalanceInRefundPool: PlainDescriptor<undefined>;
        /**
         * Don't have enough vsToken/vsBond to unlock
         */
        NotEnoughBalanceToUnlock: PlainDescriptor<undefined>;
        /**
         * The vsBond is expired now
         */
        VSBondExpired: PlainDescriptor<undefined>;
        /**
         * The vsBond cannot be redeemed by now
         */
        UnRedeemableNow: PlainDescriptor<undefined>;
        /**
         * Dont have enough vsToken/vsBond to redeem
         */
        NotEnoughFreeAssetsToRedeem: PlainDescriptor<undefined>;
        /**
         * Don't have enough token to redeem by users
         */
        NotEnoughBalanceInRedeemPool: PlainDescriptor<undefined>;
        /**
        
         */
        NotEnoughBalanceInFund: PlainDescriptor<undefined>;
        /**
        
         */
        InvalidFundSameSlot: PlainDescriptor<undefined>;
        /**
        
         */
        InvalidFundNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        InvalidRefund: PlainDescriptor<undefined>;
        /**
        
         */
        NotEnoughBalanceToContribute: PlainDescriptor<undefined>;
        /**
        
         */
        NotSupportTokenType: PlainDescriptor<undefined>;
        /**
         * Responder is not a relay chain
         */
        ResponderNotRelayChain: PlainDescriptor<undefined>;
        /**
         * No contribution record found
         */
        NotFindContributionValue: PlainDescriptor<undefined>;
        /**
        
         */
        ArgumentsError: PlainDescriptor<undefined>;
    };
    AssetRegistry: {
        /**
         * The given location could not be used (e.g. because it cannot be expressed in the
         * desired version of XCM).
         */
        BadLocation: PlainDescriptor<undefined>;
        /**
         * Location existed
         */
        LocationExisted: PlainDescriptor<undefined>;
        /**
         * AssetId not exists
         */
        AssetIdNotExists: PlainDescriptor<undefined>;
        /**
         * AssetId exists
         */
        AssetIdExisted: PlainDescriptor<undefined>;
        /**
         * CurrencyId not exists
         */
        CurrencyIdNotExists: PlainDescriptor<undefined>;
        /**
         * CurrencyId exists
         */
        CurrencyIdExisted: PlainDescriptor<undefined>;
    };
    VtokenMinting: {
        /**
         * Below minimum mint amount.
         */
        BelowMinimumMint: PlainDescriptor<undefined>;
        /**
         * Below minimum redeem amount.
         */
        BelowMinimumRedeem: PlainDescriptor<undefined>;
        /**
         * Invalid token to rebond.
         */
        InvalidRebondToken: PlainDescriptor<undefined>;
        /**
         * Token type not support.
         */
        NotSupportTokenType: PlainDescriptor<undefined>;
        /**
         * Not enough balance to unlock.
         */
        NotEnoughBalanceToUnlock: PlainDescriptor<undefined>;
        /**
         * Token unlock ledger not found.
         */
        TokenToRebondNotZero: PlainDescriptor<undefined>;
        /**
         * Ongoing time unit not set.
         */
        OngoingTimeUnitNotSet: PlainDescriptor<undefined>;
        /**
         * Token unlock ledger not found.
         */
        TokenUnlockLedgerNotFound: PlainDescriptor<undefined>;
        /**
         * User unlock ledger not found.
         */
        UserUnlockLedgerNotFound: PlainDescriptor<undefined>;
        /**
         * Time unit unlock ledger not found.
         */
        TimeUnitUnlockLedgerNotFound: PlainDescriptor<undefined>;
        /**
         * Unlock duration not found.
         */
        UnlockDurationNotFound: PlainDescriptor<undefined>;
        /**
         * Unexpected error.
         */
        Unexpected: PlainDescriptor<undefined>;
        /**
         * Calculation overflow.
         */
        CalculationOverflow: PlainDescriptor<undefined>;
        /**
         * Exceed maximum unlock id.
         */
        ExceedMaximumUnlockId: PlainDescriptor<undefined>;
        /**
         * Too many redeems.
         */
        TooManyRedeems: PlainDescriptor<undefined>;
        /**
         * Can not rebond.
         */
        CanNotRebond: PlainDescriptor<undefined>;
        /**
         * Not enough balance.
         */
        NotEnoughBalance: PlainDescriptor<undefined>;
        /**
         * veBNC checking error.
         */
        VeBNCCheckingError: PlainDescriptor<undefined>;
        /**
         * IncentiveCoef not found.
         */
        IncentiveCoefNotFound: PlainDescriptor<undefined>;
        /**
         * Too many locks.
         */
        TooManyLocks: PlainDescriptor<undefined>;
        /**
         * No unlock record.
         */
        NoUnlockRecord: PlainDescriptor<undefined>;
        /**
         * Fail to remove lock.
         */
        FailToRemoveLock: PlainDescriptor<undefined>;
        /**
         * Balance not zero.
         */
        BalanceZero: PlainDescriptor<undefined>;
        /**
         * IncentiveLockBlocksNotSet
         */
        IncentiveLockBlocksNotSet: PlainDescriptor<undefined>;
        /**
         * VtokenIssuanceNotSet
         */
        VtokenIssuanceNotSet: PlainDescriptor<undefined>;
    };
    Slp: {
        /**
        
         */
        OperateOriginNotSet: PlainDescriptor<undefined>;
        /**
        
         */
        NotAuthorized: PlainDescriptor<undefined>;
        /**
        
         */
        NotSupportedCurrencyId: PlainDescriptor<undefined>;
        /**
        
         */
        FailToAddDelegator: PlainDescriptor<undefined>;
        /**
        
         */
        OverFlow: PlainDescriptor<undefined>;
        /**
        
         */
        UnderFlow: PlainDescriptor<undefined>;
        /**
        
         */
        NotExist: PlainDescriptor<undefined>;
        /**
        
         */
        LowerThanMinimum: PlainDescriptor<undefined>;
        /**
        
         */
        GreaterThanMaximum: PlainDescriptor<undefined>;
        /**
        
         */
        AlreadyBonded: PlainDescriptor<undefined>;
        /**
        
         */
        AccountNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        DelegatorNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        XcmFailure: PlainDescriptor<undefined>;
        /**
        
         */
        DelegatorNotBonded: PlainDescriptor<undefined>;
        /**
        
         */
        ExceedActiveMaximum: PlainDescriptor<undefined>;
        /**
        
         */
        ProblematicLedger: PlainDescriptor<undefined>;
        /**
        
         */
        NotEnoughToUnbond: PlainDescriptor<undefined>;
        /**
        
         */
        ExceedUnlockingRecords: PlainDescriptor<undefined>;
        /**
        
         */
        RebondExceedUnlockingAmount: PlainDescriptor<undefined>;
        /**
        
         */
        DecodingError: PlainDescriptor<undefined>;
        /**
        
         */
        EncodingError: PlainDescriptor<undefined>;
        /**
        
         */
        VectorEmpty: PlainDescriptor<undefined>;
        /**
        
         */
        ValidatorSetNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        ValidatorNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        InvalidTimeUnit: PlainDescriptor<undefined>;
        /**
        
         */
        AmountZero: PlainDescriptor<undefined>;
        /**
        
         */
        AmountNotZero: PlainDescriptor<undefined>;
        /**
        
         */
        AlreadyExist: PlainDescriptor<undefined>;
        /**
        
         */
        ValidatorStillInUse: PlainDescriptor<undefined>;
        /**
        
         */
        TimeUnitNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        FeeSourceNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        WeightAndFeeNotExists: PlainDescriptor<undefined>;
        /**
        
         */
        MinimumsAndMaximumsNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        QueryNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        DelaysNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        Unexpected: PlainDescriptor<undefined>;
        /**
        
         */
        QueryResponseRemoveError: PlainDescriptor<undefined>;
        /**
        
         */
        InvalidHostingFee: PlainDescriptor<undefined>;
        /**
        
         */
        InvalidAccount: PlainDescriptor<undefined>;
        /**
        
         */
        IncreaseTokenPoolError: PlainDescriptor<undefined>;
        /**
        
         */
        TuneExchangeRateLimitNotSet: PlainDescriptor<undefined>;
        /**
        
         */
        CurrencyLatestTuneRecordNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        InvalidTransferSource: PlainDescriptor<undefined>;
        /**
        
         */
        ValidatorNotProvided: PlainDescriptor<undefined>;
        /**
        
         */
        Unsupported: PlainDescriptor<undefined>;
        /**
        
         */
        ValidatorNotBonded: PlainDescriptor<undefined>;
        /**
        
         */
        AlreadyRequested: PlainDescriptor<undefined>;
        /**
        
         */
        RequestNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        AlreadyLeaving: PlainDescriptor<undefined>;
        /**
        
         */
        DelegatorNotLeaving: PlainDescriptor<undefined>;
        /**
        
         */
        RequestNotDue: PlainDescriptor<undefined>;
        /**
        
         */
        LeavingNotDue: PlainDescriptor<undefined>;
        /**
        
         */
        DelegatorSetNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        DelegatorLeaving: PlainDescriptor<undefined>;
        /**
        
         */
        DelegatorAlreadyLeaving: PlainDescriptor<undefined>;
        /**
        
         */
        ValidatorError: PlainDescriptor<undefined>;
        /**
        
         */
        AmountNone: PlainDescriptor<undefined>;
        /**
        
         */
        InvalidDelays: PlainDescriptor<undefined>;
        /**
        
         */
        OngoingTimeUnitUpdateIntervalNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        LastTimeUpdatedOngoingTimeUnitNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        TooFrequent: PlainDescriptor<undefined>;
        /**
        
         */
        DestAccountNotValid: PlainDescriptor<undefined>;
        /**
        
         */
        WhiteListNotExist: PlainDescriptor<undefined>;
        /**
        
         */
        DelegatorAlreadyTuned: PlainDescriptor<undefined>;
        /**
        
         */
        FeeTooHigh: PlainDescriptor<undefined>;
        /**
        
         */
        NotEnoughBalance: PlainDescriptor<undefined>;
        /**
        
         */
        VectorTooLong: PlainDescriptor<undefined>;
        /**
        
         */
        MultiCurrencyError: PlainDescriptor<undefined>;
        /**
        
         */
        NotDelegateValidator: PlainDescriptor<undefined>;
        /**
        
         */
        DividedByZero: PlainDescriptor<undefined>;
        /**
        
         */
        SharePriceNotValid: PlainDescriptor<undefined>;
        /**
        
         */
        InvalidAmount: PlainDescriptor<undefined>;
        /**
        
         */
        ValidatorMultilocationNotvalid: PlainDescriptor<undefined>;
        /**
        
         */
        AmountNotProvided: PlainDescriptor<undefined>;
        /**
        
         */
        FailToConvert: PlainDescriptor<undefined>;
        /**
        
         */
        ExceedMaxLengthLimit: PlainDescriptor<undefined>;
        /**
         * Transfer to failed
         */
        TransferToError: PlainDescriptor<undefined>;
        /**
        
         */
        StablePoolNotFound: PlainDescriptor<undefined>;
        /**
        
         */
        StablePoolTokenIndexNotFound: PlainDescriptor<undefined>;
        /**
        
         */
        ExceedLimit: PlainDescriptor<undefined>;
        /**
        
         */
        InvalidPageNumber: PlainDescriptor<undefined>;
        /**
        
         */
        NoMoreValidatorBoostListForCurrency: PlainDescriptor<undefined>;
        /**
         * Hyperbridge price feed failed.
         */
        HandleHyperbridgeOracleError: PlainDescriptor<undefined>;
    };
    XcmInterface: {
        /**
         * Failed to send XCM message.
         */
        XcmSendFailed: PlainDescriptor<undefined>;
        /**
         * The weight and fee for the operation does not exist.
         */
        OperationWeightAndFeeNotExist: PlainDescriptor<undefined>;
        /**
         * Failed to convert currency id.
         */
        FailToConvert: PlainDescriptor<undefined>;
        /**
         * The message is unweighable.
         */
        UnweighableMessage: PlainDescriptor<undefined>;
    };
    TokenConversion: {
        /**
        
         */
        NotEnoughBalance: PlainDescriptor<undefined>;
        /**
        
         */
        NotSupportTokenType: PlainDescriptor<undefined>;
        /**
        
         */
        CalculationOverflow: PlainDescriptor<undefined>;
    };
    Farming: {
        /**
         * The field tokens_proportion cannot be empty.
         */
        NotNullable: PlainDescriptor<undefined>;
        /**
         * The pool does not exist.
         */
        PoolDoesNotExist: PlainDescriptor<undefined>;
        /**
         * The gauge pool does not exist.
         */
        GaugePoolNotExist: PlainDescriptor<undefined>;
        /**
         * The gauge info does not exist.
         */
        GaugeInfoNotExist: PlainDescriptor<undefined>;
        /**
         * The pool is not in the correct state.
         */
        InvalidPoolState: PlainDescriptor<undefined>;
        /**
         * claim_limit_time exceeded
         */
        CanNotClaim: PlainDescriptor<undefined>;
        /**
         * gauge pool max_block exceeded
         */
        GaugeMaxBlockOverflow: PlainDescriptor<undefined>;
        /**
         * withdraw_limit_time exceeded
         */
        WithdrawLimitCountExceeded: PlainDescriptor<undefined>;
        /**
         * User's personal share info does not exist
         */
        ShareInfoNotExists: PlainDescriptor<undefined>;
        /**
         * The current block height needs to be greater than the field after_block_to_start in
         * order to execute deposit.
         */
        CanNotDeposit: PlainDescriptor<undefined>;
        /**
         * Whitelist cannot be empty
         */
        WhitelistEmpty: PlainDescriptor<undefined>;
        /**
         * When starting a round, the field end_round needs to be 0 to indicate that the previous
         * round has ended.
         */
        RoundNotOver: PlainDescriptor<undefined>;
        /**
         * The round length needs to be set when starting a round
         */
        RoundLengthNotSet: PlainDescriptor<undefined>;
        /**
         * Whitelist maximum limit exceeded
         */
        WhitelistLimitExceeded: PlainDescriptor<undefined>;
        /**
         * No one voted for this pool.
         */
        NobodyVoting: PlainDescriptor<undefined>;
        /**
         * The pool is not in the whitelist
         */
        NotInWhitelist: PlainDescriptor<undefined>;
        /**
         * The total voting percentage of users cannot exceed 100%.
         */
        PercentOverflow: PlainDescriptor<undefined>;
        /**
         * The pool cannot be cleaned completely
         */
        PoolNotCleared: PlainDescriptor<undefined>;
        /**
         * Invalid remove amount
         */
        InvalidRemoveAmount: PlainDescriptor<undefined>;
        /**
         * User farming pool overflow
         */
        UserFarmingPoolOverflow: PlainDescriptor<undefined>;
    };
    SystemStaking: {
        /**
         * Invalid token config params
         */
        InvalidTokenConfig: PlainDescriptor<undefined>;
        /**
         * exceed max token len
         */
        ExceedMaxTokenLen: PlainDescriptor<undefined>;
        /**
         * exceed max poolid len
         */
        ExceedMaxFarmingPoolidLen: PlainDescriptor<undefined>;
        /**
         * Token info not found
         */
        TokenInfoNotFound: PlainDescriptor<undefined>;
        /**
         * payout error
         */
        PayoutFailed: PlainDescriptor<undefined>;
        /**
         * Error converting Vec to BoundedVec.
         */
        ConversionError: PlainDescriptor<undefined>;
    };
    FeeShare: {
        /**
         * Not support proportion
         */
        NotSupportProportion: PlainDescriptor<undefined>;
        /**
         * Existential deposit
         */
        ExistentialDeposit: PlainDescriptor<undefined>;
        /**
         * Distribution not exist
         */
        DistributionNotExist: PlainDescriptor<undefined>;
        /**
         * Price oracle not ready
         */
        PriceOracleNotReady: PlainDescriptor<undefined>;
        /**
         * Price is zero
         */
        PriceIsZero: PlainDescriptor<undefined>;
        /**
         * Interval is zero
         */
        IntervalIsZero: PlainDescriptor<undefined>;
        /**
         * Value is zero
         */
        ValueIsZero: PlainDescriptor<undefined>;
        /**
         * Tokens proportions not cleared
         */
        TokensProportionsNotCleared: PlainDescriptor<undefined>;
    };
    CrossInOut: {
        /**
         * Indicates that the balance is not sufficient for the requested operation.
         */
        NotEnoughBalance: PlainDescriptor<undefined>;
        /**
         * Indicates that the specified item does not exist.
         */
        NotExist: PlainDescriptor<undefined>;
        /**
         * Indicates that the operation is not allowed for the current context.
         */
        NotAllowed: PlainDescriptor<undefined>;
        /**
         * Indicates that the currency does not support crossing in and out.
         */
        CurrencyNotSupportCrossInAndOut: PlainDescriptor<undefined>;
        /**
         * Indicates that there is no mapping for the specified multilocation.
         */
        NoMultilocationMapping: PlainDescriptor<undefined>;
        /**
         * Indicates that the item already exists.
         */
        AlreadyExist: PlainDescriptor<undefined>;
        /**
         * Indicates that there is no minimum crossing amount set for the operation.
         */
        NoCrossingMinimumSet: PlainDescriptor<undefined>;
        /**
         * Indicates that the specified amount is lower than the required minimum.
         */
        AmountLowerThanMinimum: PlainDescriptor<undefined>;
        /**
         * Indicates that the list has reached its maximum capacity.
         */
        ListOverflow: PlainDescriptor<undefined>;
    };
    BbBNC: {
        /**
         * Not enough balance
         */
        NotEnoughBalance: PlainDescriptor<undefined>;
        /**
         * Block number is expired
         */
        Expired: PlainDescriptor<undefined>;
        /**
         * Below minimum mint
         */
        BelowMinimumMint: PlainDescriptor<undefined>;
        /**
         * Lock does not exist
         */
        LockNotExist: PlainDescriptor<undefined>;
        /**
         * Lock already exists
         */
        LockExist: PlainDescriptor<undefined>;
        /**
         * Arguments error
         */
        ArgumentsError: PlainDescriptor<undefined>;
        /**
         * Exceeds max positions
         */
        ExceedsMaxPositions: PlainDescriptor<undefined>;
        /**
         * No controller
         */
        NoController: PlainDescriptor<undefined>;
    };
    Slpx: {
        /**
         * Contract Account already exists in the whitelist
         */
        AccountAlreadyExists: PlainDescriptor<undefined>;
        /**
         * Currency already exists in the whitelist
         */
        CurrencyAlreadyExists: PlainDescriptor<undefined>;
        /**
         * Contract Account is not in the whitelist
         */
        AccountNotFound: PlainDescriptor<undefined>;
        /**
         * Currency is not in the whitelist
         */
        CurrencyNotFound: PlainDescriptor<undefined>;
        /**
         * The maximum number of whitelist addresses is 10
         */
        WhitelistOverflow: PlainDescriptor<undefined>;
        /**
         * Execution fee not set
         */
        NotSetExecutionFee: PlainDescriptor<undefined>;
        /**
         * Insufficient balance to execute the fee
         */
        FreeBalanceTooLow: PlainDescriptor<undefined>;
        /**
         * The maximum number of order is 500
         */
        OrderQueueOverflow: PlainDescriptor<undefined>;
        /**
         * The maximum number of currency id is 10
         */
        CurrencyListOverflow: PlainDescriptor<undefined>;
        /**
         * Convert vtoken error
         */
        ErrorConvertVtoken: PlainDescriptor<undefined>;
        /**
         * Error encode
         */
        ErrorEncode: PlainDescriptor<undefined>;
        /**
        
         */
        ErrorValidating: PlainDescriptor<undefined>;
        /**
        
         */
        ErrorDelivering: PlainDescriptor<undefined>;
        /**
        
         */
        ErrorVtokenMiting: PlainDescriptor<undefined>;
        /**
        
         */
        ErrorTransferTo: PlainDescriptor<undefined>;
        /**
        
         */
        ErrorChargeFee: PlainDescriptor<undefined>;
        /**
        
         */
        ErrorArguments: PlainDescriptor<undefined>;
        /**
        
         */
        Unsupported: PlainDescriptor<undefined>;
        /**
         * Async Mint execution too frequent
         */
        AsyncMintTooFrequent: PlainDescriptor<undefined>;
        /**
         * Async Mint issuance ratio too high
         */
        AsyncMintIssuanceRatioTooHigh: PlainDescriptor<undefined>;
        /**
         * Async Mint configuration not set
         */
        AsyncMintConfigNotSet: PlainDescriptor<undefined>;
        /**
         * Duplicate accounts in the exempt list
         */
        DuplicateAccount: PlainDescriptor<undefined>;
    };
    FellowshipCollective: {
        /**
         * Account is already a member.
         */
        AlreadyMember: PlainDescriptor<undefined>;
        /**
         * Account is not a member.
         */
        NotMember: PlainDescriptor<undefined>;
        /**
         * The given poll index is unknown or has closed.
         */
        NotPolling: PlainDescriptor<undefined>;
        /**
         * The given poll is still ongoing.
         */
        Ongoing: PlainDescriptor<undefined>;
        /**
         * There are no further records to be removed.
         */
        NoneRemaining: PlainDescriptor<undefined>;
        /**
         * Unexpected error in state.
         */
        Corruption: PlainDescriptor<undefined>;
        /**
         * The member's rank is too low to vote.
         */
        RankTooLow: PlainDescriptor<undefined>;
        /**
         * The information provided is incorrect.
         */
        InvalidWitness: PlainDescriptor<undefined>;
        /**
         * The origin is not sufficiently privileged to do the operation.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * The new member to exchange is the same as the old member
         */
        SameMember: PlainDescriptor<undefined>;
        /**
         * The max member count for the rank has been reached.
         */
        TooManyMembers: PlainDescriptor<undefined>;
    };
    FellowshipReferenda: {
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
    StableAsset: {
        /**
         * The pool is existed, cannot create again.
         */
        InconsistentStorage: PlainDescriptor<undefined>;
        /**
         * The pool asset is invalid.
         */
        InvalidPoolAsset: PlainDescriptor<undefined>;
        /**
         * The arguments are mismatch, not match the expected length.
         */
        ArgumentsMismatch: PlainDescriptor<undefined>;
        /**
         * The arguments are error.
         */
        ArgumentsError: PlainDescriptor<undefined>;
        /**
         * The pool is not found, cannot modify.
         */
        PoolNotFound: PlainDescriptor<undefined>;
        /**
         * make mistakes in calculation.
         */
        Math: PlainDescriptor<undefined>;
        /**
         * The new invariant of the pool is invalid.
         */
        InvalidPoolValue: PlainDescriptor<undefined>;
        /**
         * The actual output amount is less than the expected minimum output amount when add
         * liquidity.
         */
        MintUnderMin: PlainDescriptor<undefined>;
        /**
         * The actual output amount is less than the expected minimum output amount when swap.
         */
        SwapUnderMin: PlainDescriptor<undefined>;
        /**
         * The actual output amount is less than the expected minimum output amount when redeem.
         */
        RedeemUnderMin: PlainDescriptor<undefined>;
        /**
         * The actual input amount is more than the expected maximum input amount when redeem
         * multi.
         */
        RedeemOverMax: PlainDescriptor<undefined>;
        /**
         * The old token rate is not cleared.
         */
        TokenRateNotCleared: PlainDescriptor<undefined>;
    };
    StablePool: {
        /**
         * A swap occurred, but the result is below the minimum swap amount.
         */
        SwapUnderMin: PlainDescriptor<undefined>;
        /**
         * A minting operation occurred, but the minted amount is below the minimum mint amount.
         */
        MintUnderMin: PlainDescriptor<undefined>;
        /**
         * Cannot mint tokens, possibly due to invalid parameters or illegal state.
         */
        CantMint: PlainDescriptor<undefined>;
        /**
         * The redeemed amount exceeds the allowed maximum.
         */
        RedeemOverMax: PlainDescriptor<undefined>;
        /**
         * The token rate is not set, preventing related operations.
         */
        TokenRateNotSet: PlainDescriptor<undefined>;
    };
    VtokenVoting: {
        /**
         * XCM execution Failure
         */
        XcmFailure: PlainDescriptor<undefined>;
        /**
         * The given currency is not supported.
         */
        VTokenNotSupport: PlainDescriptor<undefined>;
        /**
         * Derivative index occupied.
         */
        DerivativeIndexOccupied: PlainDescriptor<undefined>;
        /**
         * Another vote is pending.
         */
        PendingVote: PlainDescriptor<undefined>;
        /**
         * Another update referendum status is pending.
         */
        PendingUpdateReferendumStatus: PlainDescriptor<undefined>;
        /**
         * No data available in storage.
         */
        NoData: PlainDescriptor<undefined>;
        /**
         * Poll is not ongoing.
         */
        NotOngoing: PlainDescriptor<undefined>;
        /**
         * Poll is not completed.
         */
        NotCompleted: PlainDescriptor<undefined>;
        /**
         * Poll is not killed.
         */
        NotKilled: PlainDescriptor<undefined>;
        /**
         * Poll is not expired.
         */
        NotExpired: PlainDescriptor<undefined>;
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
         * Too high a balance was provided that the account cannot afford.
         */
        InsufficientFunds: PlainDescriptor<undefined>;
        /**
         * Maximum number of votes reached.
         */
        MaxVotesReached: PlainDescriptor<undefined>;
        /**
         * Maximum number of items reached.
         */
        TooMany: PlainDescriptor<undefined>;
        /**
         * The given vote is not Standard vote.
         */
        NotStandardVote: PlainDescriptor<undefined>;
        /**
         * The given conviction is not valid.
         */
        InvalidConviction: PlainDescriptor<undefined>;
        /**
         * The given value is out of range.
         */
        OutOfRange: PlainDescriptor<undefined>;
        /**
        
         */
        InvalidCallDispatch: PlainDescriptor<undefined>;
        /**
        
         */
        CallDecodeFailed: PlainDescriptor<undefined>;
        /**
         * Delegation to oneself makes no sense.
         */
        Nonsense: PlainDescriptor<undefined>;
        /**
         * The account currently has votes attached to it and the operation cannot succeed until
         * these are removed through `remove_vote`.
         */
        AlreadyVoting: PlainDescriptor<undefined>;
        /**
         * The account is not currently delegating.
         */
        NotDelegating: PlainDescriptor<undefined>;
        /**
         * Try access poll Failure
         */
        AccessPollFailure: PlainDescriptor<undefined>;
        /**
         * Too many votes for a delegate.
         */
        TooManyVotes: PlainDescriptor<undefined>;
        /**
         * The parameter needs to pass in pollIndex.
         */
        NeedPollIndex: PlainDescriptor<undefined>;
    };
    LendMarket: {
        /**
         * Insufficient liquidity to borrow more or disable collateral
         */
        InsufficientLiquidity: PlainDescriptor<undefined>;
        /**
         * Insufficient deposit to redeem
         */
        InsufficientDeposit: PlainDescriptor<undefined>;
        /**
         * Repay amount greater than allowed
         */
        TooMuchRepay: PlainDescriptor<undefined>;
        /**
         * Asset already enabled/disabled collateral
         */
        DuplicateOperation: PlainDescriptor<undefined>;
        /**
         * No deposit asset
         */
        NoDeposit: PlainDescriptor<undefined>;
        /**
         * Repay amount more than collateral amount
         */
        InsufficientCollateral: PlainDescriptor<undefined>;
        /**
         * Liquidator is same as borrower
         */
        LiquidatorIsBorrower: PlainDescriptor<undefined>;
        /**
         * Deposits are not used as a collateral
         */
        DepositsAreNotCollateral: PlainDescriptor<undefined>;
        /**
         * Insufficient shortfall to repay
         */
        InsufficientShortfall: PlainDescriptor<undefined>;
        /**
         * Insufficient reserves
         */
        InsufficientReserves: PlainDescriptor<undefined>;
        /**
         * Invalid rate model params
         */
        InvalidRateModelParam: PlainDescriptor<undefined>;
        /**
         * Market not activated
         */
        MarketNotActivated: PlainDescriptor<undefined>;
        /**
         * Oracle price not ready
         */
        PriceOracleNotReady: PlainDescriptor<undefined>;
        /**
         * Oracle price is zero
         */
        PriceIsZero: PlainDescriptor<undefined>;
        /**
         * Invalid asset id
         */
        InvalidCurrencyId: PlainDescriptor<undefined>;
        /**
         * Invalid lend token id
         */
        InvalidLendTokenId: PlainDescriptor<undefined>;
        /**
         * Market does not exist
         */
        MarketDoesNotExist: PlainDescriptor<undefined>;
        /**
         * Market already exists
         */
        MarketAlreadyExists: PlainDescriptor<undefined>;
        /**
         * New markets must have a pending state
         */
        NewMarketMustHavePendingState: PlainDescriptor<undefined>;
        /**
         * Upper bound of supplying is exceeded
         */
        SupplyCapacityExceeded: PlainDescriptor<undefined>;
        /**
         * Upper bound of borrowing is exceeded
         */
        BorrowCapacityExceeded: PlainDescriptor<undefined>;
        /**
         * Insufficient cash in the pool
         */
        InsufficientCash: PlainDescriptor<undefined>;
        /**
         * The factor should be greater than 0% and less than 100%
         */
        InvalidFactor: PlainDescriptor<undefined>;
        /**
         * The supply cap cannot be zero
         */
        InvalidSupplyCap: PlainDescriptor<undefined>;
        /**
         * The exchange rate should be greater than 0.02 and less than 1
         */
        InvalidExchangeRate: PlainDescriptor<undefined>;
        /**
         * Amount cannot be zero
         */
        InvalidAmount: PlainDescriptor<undefined>;
        /**
         * Payer cannot be signer
         */
        PayerIsSigner: PlainDescriptor<undefined>;
        /**
         * Codec error
         */
        CodecError: PlainDescriptor<undefined>;
        /**
         * Collateral is reserved and cannot be liquidated
         */
        CollateralReserved: PlainDescriptor<undefined>;
        /**
         * Market bond does not exist
         */
        MarketBondDoesNotExist: PlainDescriptor<undefined>;
        /**
         * Error converting Vec to BoundedVec.
         */
        ConversionError: PlainDescriptor<undefined>;
    };
    Oracle: {
        /**
         * Sender does not have permission
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * Feeder has already fed at this block
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
    LeverageStaking: {
        /**
         * Arguments error, old rate is equal to new rate
         */
        ArgumentsError: PlainDescriptor<undefined>;
        /**
         * Not support token type
         */
        NotSupportTokenType: PlainDescriptor<undefined>;
    };
    ChannelCommission: {
        /**
         * Overflow error, indicating that a mathematical operation exceeded the allowed numeric range.
         */
        Overflow: PlainDescriptor<undefined>;
        /**
         * Error indicating that the provided channel name exceeds the maximum allowed length.
         */
        ChannelNameTooLong: PlainDescriptor<undefined>;
        /**
         * Conversion error, indicating a failure during a type conversion operation.
         */
        ConversionError: PlainDescriptor<undefined>;
        /**
         * Error indicating that the specified channel does not exist in storage.
         */
        ChannelNotExist: PlainDescriptor<undefined>;
        /**
         * Transfer error, indicating that a fund transfer operation has failed.
         */
        TransferError: PlainDescriptor<undefined>;
        /**
         * Error indicating that the vToken is not configured for commission calculations.
         */
        VtokenNotConfiguredForCommission: PlainDescriptor<undefined>;
        /**
         * Invalid commission rate, indicating that the provided commission rate is out of range or malformed.
         */
        InvalidCommissionRate: PlainDescriptor<undefined>;
        /**
         * Error indicating that the commission token has already been set and cannot be reconfigured.
         */
        CommissionTokenAlreadySet: PlainDescriptor<undefined>;
        /**
         * Invalid vToken, indicating that the provided vToken is invalid or unrecognized.
         */
        InvalidVtoken: PlainDescriptor<undefined>;
        /**
         * Error indicating that no changes were made during a modification operation.
         * This means that a modification request was issued but did not result in any actual changes.
         */
        NoChangesMade: PlainDescriptor<undefined>;
        /**
         * Error indicating a division operation encountered a divisor of zero.
         * This is a critical error, as division by zero is undefined and cannot be performed.
         */
        DivisionByZero: PlainDescriptor<undefined>;
        /**
         * Error indicating that the removal operation was not successfully completed.
         * This means an attempt to remove a resource or record did not succeed.
         */
        RemovalNotComplete: PlainDescriptor<undefined>;
        /**
         * Error indicating a failure during token-to-vToken conversion via exchange rate calculation.
         * This can occur when the conversion formula encounters an unexpected condition or invalid input.
         */
        TokenToVtokenConversionFailed: PlainDescriptor<undefined>;
    };
    CloudsConvert: {
        /**
        
         */
        NotEnoughBalance: PlainDescriptor<undefined>;
        /**
        
         */
        CalculationOverflow: PlainDescriptor<undefined>;
        /**
        
         */
        LessThanExpected: PlainDescriptor<undefined>;
        /**
        
         */
        LessThanExistentialDeposit: PlainDescriptor<undefined>;
    };
    BuyBack: {
        /**
         * Insufficient balance.
         */
        NotEnoughBalance: PlainDescriptor<undefined>;
        /**
         * Currency does not exist.
         */
        CurrencyIdNotExists: PlainDescriptor<undefined>;
        /**
         * Currency is not supported.
         */
        CurrencyIdError: PlainDescriptor<undefined>;
        /**
         * Duration can't be zero.
         */
        ZeroDuration: PlainDescriptor<undefined>;
        /**
         * Field min_swap_value can't be zero.
         */
        ZeroMinSwapValue: PlainDescriptor<undefined>;
    };
    SlpV2: {
        /**
         * Delegator index has exceeded the maximum allowed value of 65535.
         */
        DelegatorIndexOverflow: PlainDescriptor<undefined>;
        /**
         * The maximum number of validators has been reached.
         */
        ValidatorsOverflow: PlainDescriptor<undefined>;
        /**
         * UnlockRecordOverflow
         */
        UnlockRecordOverflow: PlainDescriptor<undefined>;
        /**
         * The staking protocol is not supported.
         */
        UnsupportedStakingProtocol: PlainDescriptor<undefined>;
        /**
         * The delegator index was not found.
         */
        DelegatorIndexNotFound: PlainDescriptor<undefined>;
        /**
         * The Configuration was not found.
         */
        ConfigurationNotFound: PlainDescriptor<undefined>;
        /**
         * The delegator was not found.
         */
        DelegatorNotFound: PlainDescriptor<undefined>;
        /**
         * The ledger was not found.
         */
        LedgerNotFound: PlainDescriptor<undefined>;
        /**
         * The validator was not found.
         */
        ValidatorNotFound: PlainDescriptor<undefined>;
        /**
         * Missing XCM fee value.
         */
        XcmFeeNotFound: PlainDescriptor<undefined>;
        /**
         * Missing pending status.
         */
        PendingStatusNotFound: PlainDescriptor<undefined>;
        /**
         * The specified time unit does not exist.
         */
        TimeUnitNotFound: PlainDescriptor<undefined>;
        /**
         * The delegator already exists.
         */
        DelegatorAlreadyExists: PlainDescriptor<undefined>;
        /**
         * The delegator index already exists.
         */
        DelegatorIndexAlreadyExists: PlainDescriptor<undefined>;
        /**
         * The validator already exists.
         */
        ValidatorAlreadyExists: PlainDescriptor<undefined>;
        /**
         * Failed to derive the derivative account ID.
         */
        DerivativeAccountIdFailed: PlainDescriptor<undefined>;
        /**
         * Error during validation.
         */
        ValidatingFailed: PlainDescriptor<undefined>;
        /**
         * Error during delivery.
         */
        DeliveringFailed: PlainDescriptor<undefined>;
        /**
         * calculate protocol fee failed.
         */
        CalculateProtocolFeeFailed: PlainDescriptor<undefined>;
        /**
         * IncreaseTokenPoolFailed
         */
        IncreaseTokenPoolFailed: PlainDescriptor<undefined>;
        /**
         * The update interval is too short.
         */
        UpdateIntervalTooShort: PlainDescriptor<undefined>;
        /**
         * The specified token exchange rate amount is too large.
         */
        UpdateTokenExchangeRateAmountTooLarge: PlainDescriptor<undefined>;
        /**
         * Invalid parameter.
         */
        InvalidParameter: PlainDescriptor<undefined>;
        /**
         * Not authorized.
         */
        NotAuthorized: PlainDescriptor<undefined>;
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
    Indices: {
        /**
         * The deposit needed for reserving an index.
         */
        Deposit: PlainDescriptor<bigint>;
    };
    ParachainSystem: {
        /**
         * Returns the parachain ID we are running with.
         */
        SelfParaId: PlainDescriptor<number>;
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
    Aura: {
        /**
         * The slot duration Aura should run with, expressed in milliseconds.
         * The effective value of this type should not change while the chain is running.
         *
         * For backwards compatibility either use [`MinimumPeriodTimesTwo`] or a const.
         */
        SlotDuration: PlainDescriptor<bigint>;
    };
    ParachainStaking: {
        /**
         * Minimum number of blocks per round
         */
        MinBlocksPerRound: PlainDescriptor<number>;
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
         * Minimum stake required for any candidate to be in `SelectedCandidates` for the round
         */
        MinCollatorStk: PlainDescriptor<bigint>;
        /**
         * Minimum stake required for any account to be a collator candidate
         */
        MinCandidateStk: PlainDescriptor<bigint>;
        /**
         * Minimum stake for any registered on-chain account to delegate
         */
        MinDelegation: PlainDescriptor<bigint>;
        /**
         * Minimum stake for any registered on-chain account to be a delegator
         */
        MinDelegatorStk: PlainDescriptor<bigint>;
        /**
         * Allow inflation or not
         */
        AllowInflation: PlainDescriptor<boolean>;
        /**
         * Fix payment in one round if no inflation
         */
        PaymentInRound: PlainDescriptor<bigint>;
        /**
         * Invulnables to migrate
         */
        ToMigrateInvulnables: PlainDescriptor<Anonymize<Ia2lhg7l2hilo3>>;
        /**
         * Invulnables init stake
         */
        InitSeedStk: PlainDescriptor<bigint>;
        /**
         * PalletId
         */
        PalletId: PlainDescriptor<FixedSizeBinary<8>>;
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
         * A list of tracks.
         *
         * Note: if the tracks are dynamic, the value in the static metadata might be inaccurate.
         */
        Tracks: PlainDescriptor<Anonymize<Ibafpkl9hhno69>>;
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
    PolkadotXcm: {
        /**
         * This chain's Universal Location.
         */
        UniversalLocation: PlainDescriptor<XcmV5Junctions>;
        /**
         * The latest supported version that we advertise. Generally just set it to
         * `pallet_xcm::CurrentXcmVersion`.
         */
        AdvertisedXcmVersion: PlainDescriptor<number>;
        /**
         * The maximum number of local XCM locks that a single account may have.
         */
        MaxLockers: PlainDescriptor<number>;
        /**
         * The maximum number of consumers a single remote lock may have.
         */
        MaxRemoteLockConsumers: PlainDescriptor<number>;
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
    Utility: {
        /**
         * The limit on the number of batched calls.
         */
        batched_calls_limit: PlainDescriptor<number>;
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
    Vesting: {
        /**
         * The minimum amount transferred to call `vested_transfer`.
         */
        MinVestedTransfer: PlainDescriptor<bigint>;
        /**
        
         */
        MaxVestingSchedules: PlainDescriptor<number>;
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
        /**
         * Gets this pallet's derived pot account.
         */
        pot_account: PlainDescriptor<SS58String>;
    };
    EVMAccounts: {
        /**
         * Fee multiplier for the binding of addresses.
         */
        FeeMultiplier: PlainDescriptor<number>;
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
    Tokens: {
        /**
        
         */
        MaxLocks: PlainDescriptor<number>;
        /**
         * The maximum number of named reserves that can exist on an account.
         */
        MaxReserves: PlainDescriptor<number>;
    };
    Currencies: {
        /**
        
         */
        GetNativeCurrencyId: PlainDescriptor<Anonymize<Iebirugq1dbhv6>>;
    };
    ZenlinkProtocol: {
        /**
         * This pallet id.
         */
        PalletId: PlainDescriptor<FixedSizeBinary<8>>;
    };
    TokenGateway: {
        /**
         * BoundedVec maximum length
         */
        MaxLengthLimit: PlainDescriptor<number>;
    };
    FlexibleFee: {
        /**
         * Get TreasuryAccount
         */
        TreasuryAccount: PlainDescriptor<SS58String>;
        /**
         * Maximum number of CurrencyId's to support handling fees.
         */
        MaxFeeCurrencyOrderListLen: PlainDescriptor<number>;
        /**
         * When this number is reached, the DOT is sent to AssetHub
         */
        MinAssetHubExecutionFee: PlainDescriptor<bigint>;
        /**
         * When this number is reached, the DOT is sent to Relaychain
         */
        MinRelaychainExecutionFee: PlainDescriptor<bigint>;
        /**
         * The currency id of the RelayChain
         */
        RelaychainCurrencyId: PlainDescriptor<Anonymize<Iebirugq1dbhv6>>;
        /**
        
         */
        ParachainId: PlainDescriptor<number>;
        /**
        
         */
        PalletId: PlainDescriptor<FixedSizeBinary<8>>;
        /**
         * The `AllowVBNCAsFee` constant determines whether VBNC is allowed as a fee currency.
         */
        AllowVBNCAsFee: PlainDescriptor<boolean>;
    };
    Salp: {
        /**
         * ModuleID for the crowdloan module. An appropriate value could be
         * ```ModuleId(*b"py/cfund")```
         */
        PalletId: PlainDescriptor<FixedSizeBinary<8>>;
        /**
         * The minimum amount that may be contributed into a crowdloan. Should almost certainly be
         * at least ExistentialDeposit.
         */
        MinContribution: PlainDescriptor<bigint>;
        /**
        
         */
        RelayChainToken: PlainDescriptor<Anonymize<Iebirugq1dbhv6>>;
        /**
         * The number of blocks over which a single period lasts.
         */
        LeasePeriod: PlainDescriptor<number>;
        /**
        
         */
        VSBondValidPeriod: PlainDescriptor<number>;
        /**
         * The time interval from 1:1 redeem-pool to bancor-pool to release.
         */
        ReleaseCycle: PlainDescriptor<number>;
        /**
         * The release ratio from the 1:1 redeem-pool to the bancor-pool per cycle.
         *
         * **NOTE: THE RELEASE RATIO MUST BE IN [0, 1].**
         */
        ReleaseRatio: PlainDescriptor<number>;
        /**
        
         */
        RemoveKeysLimit: PlainDescriptor<number>;
        /**
        
         */
        SlotLength: PlainDescriptor<number>;
        /**
        
         */
        TreasuryAccount: PlainDescriptor<SS58String>;
        /**
        
         */
        BuybackPalletId: PlainDescriptor<FixedSizeBinary<8>>;
    };
    VtokenMinting: {
        /**
         * Maximum unlock id of user
         */
        MaximumUnlockIdOfUser: PlainDescriptor<number>;
        /**
         * Maximum unlock id of time unit
         */
        MaximumUnlockIdOfTimeUnit: PlainDescriptor<number>;
        /**
         * Maximum unlocked vtoken records minted in an incentive mode
         */
        MaxLockRecords: PlainDescriptor<number>;
        /**
         * Currency receive account
         */
        EntranceAccount: PlainDescriptor<FixedSizeBinary<8>>;
        /**
         * Currency exit account
         */
        ExitAccount: PlainDescriptor<FixedSizeBinary<8>>;
        /**
         * Fee account
         */
        FeeAccount: PlainDescriptor<SS58String>;
        /**
         * Redeem fee account
         */
        RedeemFeeAccount: PlainDescriptor<SS58String>;
        /**
        
         */
        IncentivePoolAccount: PlainDescriptor<FixedSizeBinary<8>>;
        /**
        
         */
        RelayChainToken: PlainDescriptor<Anonymize<Iebirugq1dbhv6>>;
        /**
        
         */
        MoonbeamChainId: PlainDescriptor<number>;
    };
    Slp: {
        /**
        
         */
        MaxTypeEntryPerBlock: PlainDescriptor<number>;
        /**
        
         */
        MaxRefundPerBlock: PlainDescriptor<number>;
        /**
        
         */
        MaxLengthLimit: PlainDescriptor<number>;
        /**
        
         */
        TreasuryAccount: PlainDescriptor<SS58String>;
    };
    XcmInterface: {
        /**
        
         */
        ParachainId: PlainDescriptor<number>;
    };
    TokenConversion: {
        /**
        
         */
        RelayCurrencyId: PlainDescriptor<Anonymize<Iebirugq1dbhv6>>;
        /**
        
         */
        TreasuryAccount: PlainDescriptor<SS58String>;
        /**
        
         */
        VsbondAccount: PlainDescriptor<FixedSizeBinary<8>>;
    };
    Farming: {
        /**
        
         */
        TreasuryAccount: PlainDescriptor<SS58String>;
        /**
         * ModuleID for creating sub account
         */
        Keeper: PlainDescriptor<FixedSizeBinary<8>>;
        /**
        
         */
        RewardIssuer: PlainDescriptor<FixedSizeBinary<8>>;
        /**
        
         */
        FarmingBoost: PlainDescriptor<FixedSizeBinary<8>>;
        /**
        
         */
        WhitelistMaximumLimit: PlainDescriptor<number>;
        /**
        
         */
        GaugeRewardIssuer: PlainDescriptor<FixedSizeBinary<8>>;
    };
    SystemStaking: {
        /**
        
         */
        BenefitReceivingAccount: PlainDescriptor<SS58String>;
        /**
         * Max token length 500
         */
        MaxTokenLen: PlainDescriptor<number>;
        /**
         * Max farming poolid length
         */
        MaxFarmingPoolIdLen: PlainDescriptor<number>;
        /**
         * ModuleID for creating sub account
         */
        PalletId: PlainDescriptor<FixedSizeBinary<8>>;
        /**
         * The number of blocks per round, as defined in the runtime.
         *
         * This value is set to 1500 in the runtime configuration.
         */
        BlocksPerRound: PlainDescriptor<number>;
    };
    FeeShare: {
        /**
        
         */
        FeeSharePalletId: PlainDescriptor<FixedSizeBinary<8>>;
    };
    CrossInOut: {
        /**
        
         */
        MaxLengthLimit: PlainDescriptor<number>;
    };
    BbBNC: {
        /**
        
         */
        TokenType: PlainDescriptor<Anonymize<Iebirugq1dbhv6>>;
        /**
        
         */
        IncentivePalletId: PlainDescriptor<FixedSizeBinary<8>>;
        /**
        
         */
        BuyBackAccount: PlainDescriptor<FixedSizeBinary<8>>;
        /**
        
         */
        Week: PlainDescriptor<number>;
        /**
        
         */
        MaxBlock: PlainDescriptor<number>;
        /**
        
         */
        Multiplier: PlainDescriptor<bigint>;
        /**
        
         */
        VoteWeightMultiplier: PlainDescriptor<bigint>;
        /**
         * The maximum number of positions that should exist on an account.
         */
        MaxPositions: PlainDescriptor<number>;
        /**
         * Maximum number of users per refresh.
         */
        MarkupRefreshLimit: PlainDescriptor<number>;
        /**
        
         */
        OneYear: PlainDescriptor<number>;
        /**
        
         */
        FiveYears: PlainDescriptor<number>;
    };
    Slpx: {
        /**
         * TreasuryAccount
         */
        TreasuryAccount: PlainDescriptor<SS58String>;
        /**
         * ParaId of the parachain
         */
        ParachainId: PlainDescriptor<number>;
        /**
         * The maximum number of order
         */
        MaxOrderSize: PlainDescriptor<number>;
        /**
         * The maximum number of user order
         */
        MaxUserOrderSize: PlainDescriptor<number>;
        /**
        
         */
        PalletId: PlainDescriptor<FixedSizeBinary<8>>;
    };
    FellowshipReferenda: {
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
         * A list of tracks.
         *
         * Note: if the tracks are dynamic, the value in the static metadata might be inaccurate.
         */
        Tracks: PlainDescriptor<Anonymize<Ibafpkl9hhno69>>;
    };
    StableAsset: {
        /**
        
         */
        PalletId: PlainDescriptor<FixedSizeBinary<8>>;
        /**
        
         */
        FeePrecision: PlainDescriptor<bigint>;
        /**
        
         */
        SwapExactOverAmount: PlainDescriptor<bigint>;
        /**
        
         */
        APrecision: PlainDescriptor<bigint>;
        /**
        
         */
        PoolAssetLimit: PlainDescriptor<number>;
    };
    VtokenVoting: {
        /**
        
         */
        ParachainId: PlainDescriptor<number>;
        /**
         * The maximum number of concurrent votes an account may have.
         */
        MaxVotes: PlainDescriptor<number>;
        /**
        
         */
        QueryTimeout: PlainDescriptor<number>;
        /**
        
         */
        ReferendumCheckInterval: PlainDescriptor<number>;
        /**
         * Relay currency
         */
        RelayVCurrency: PlainDescriptor<Anonymize<Iebirugq1dbhv6>>;
        /**
         * The PalletId used to derive the dedicated account for the delegation system.
         * This account acts as the system-level address for managing delegated voting.
         */
        PalletId: PlainDescriptor<FixedSizeBinary<8>>;
        /**
         * The maximum number of proposals a delegator can vote on.
         */
        MaxVotesPerDelegate: PlainDescriptor<number>;
    };
    LendMarket: {
        /**
         * The loan's module id, keep all collaterals of CDPs.
         */
        PalletId: PlainDescriptor<FixedSizeBinary<8>>;
        /**
         * Reward asset id.
         */
        RewardAssetId: PlainDescriptor<Anonymize<Iebirugq1dbhv6>>;
        /**
        
         */
        LiquidationFreeAssetId: PlainDescriptor<Anonymize<Iebirugq1dbhv6>>;
        /**
        
         */
        MaxLengthLimit: PlainDescriptor<number>;
    };
    Prices: {
        /**
         * Relay currency
         */
        RelayCurrency: PlainDescriptor<Anonymize<Iebirugq1dbhv6>>;
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
    ChannelCommission: {
        /**
        
         */
        ClearingDuration: PlainDescriptor<number>;
        /**
        
         */
        NameLengthLimit: PlainDescriptor<number>;
    };
    CloudsConvert: {
        /**
         * locked blocks for veBNC converted from clouds
         */
        LockedBlocks: PlainDescriptor<number>;
    };
    BuyBack: {
        /**
        
         */
        TreasuryAccount: PlainDescriptor<SS58String>;
        /**
        
         */
        BuyBackAccount: PlainDescriptor<FixedSizeBinary<8>>;
        /**
        
         */
        LiquidityAccount: PlainDescriptor<FixedSizeBinary<8>>;
    };
    SlpV2: {
        /**
         * The query timeout.
         */
        QueryTimeout: PlainDescriptor<number>;
        /**
         * Commission master Pallet Id to get the commission master account
         */
        CommissionPalletId: PlainDescriptor<FixedSizeBinary<8>>;
        /**
         * Bifrost parachain id.
         */
        ParachainId: PlainDescriptor<number>;
        /**
         * Maximum validators
         */
        MaxValidators: PlainDescriptor<number>;
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
     * The `BlockBuilder` api trait that provides the required functionality for building a block.
     */
    BlockBuilder: {
        /**
         * Apply the given extrinsic.
         *
         * Returns an inclusion outcome which specifies if this extrinsic is included in
         * this block or not.
         */
        apply_extrinsic: RuntimeDescriptor<[extrinsic: Binary], Anonymize<Ifvjmhsdtkl8pc>>;
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
     * The API to query account nonce.
     */
    AccountNonceApi: {
        /**
         * Get current account nonce of given `AccountId`.
         */
        account_nonce: RuntimeDescriptor<[account: SS58String], number>;
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
        call: RuntimeDescriptor<[from: FixedSizeBinary<20>, to: FixedSizeBinary<20>, data: Binary, value: Anonymize<I4totqt881mlti>, gas_limit: Anonymize<I4totqt881mlti>, max_fee_per_gas: Anonymize<Ic4rgfgksgmm3e>, max_priority_fee_per_gas: Anonymize<Ic4rgfgksgmm3e>, nonce: Anonymize<Ic4rgfgksgmm3e>, estimate: boolean, access_list: Anonymize<I3dj14b7k3rkm5>, authorization_list: Anonymize<Ic5egmm215ml6k>], Anonymize<Iaouq7pgukugju>>;
        /**
        
         */
        create: RuntimeDescriptor<[from: FixedSizeBinary<20>, data: Binary, value: Anonymize<I4totqt881mlti>, gas_limit: Anonymize<I4totqt881mlti>, max_fee_per_gas: Anonymize<Ic4rgfgksgmm3e>, max_priority_fee_per_gas: Anonymize<Ic4rgfgksgmm3e>, nonce: Anonymize<Ic4rgfgksgmm3e>, estimate: boolean, access_list: Anonymize<I3dj14b7k3rkm5>, authorization_list: Anonymize<Ic5egmm215ml6k>], Anonymize<I4u44goi3tb79g>>;
        /**
         * Return the current block.
         */
        current_block: RuntimeDescriptor<[], Anonymize<I5fvdd841odbi3>>;
        /**
         * Return the current receipt.
         */
        current_receipts: RuntimeDescriptor<[], Anonymize<I35vouom6s9r2>>;
        /**
         * Return the current transaction status.
         */
        current_transaction_statuses: RuntimeDescriptor<[], Anonymize<Ie6kgk6f04rsvk>>;
        /**
        
         */
        current_all: RuntimeDescriptor<[], Anonymize<Ifgqf2rskq94om>>;
        /**
         * Receives a `Vec<OpaqueExtrinsic>` and filters all the ethereum transactions.
         */
        extrinsic_filter: RuntimeDescriptor<[xts: Anonymize<Itom7fk49o0c9>], Anonymize<Ie30stbbeaul1o>>;
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
        pending_block: RuntimeDescriptor<[xts: Anonymize<Itom7fk49o0c9>], Anonymize<I7aold6s47n103>>;
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
        convert_transaction: RuntimeDescriptor<[transaction: Anonymize<Ibjuap2vk03rp6>], Binary>;
    };
    /**
     * The API to query EVM account conversions.
     */
    EvmAccountsApi: {
        /**
         * get the EVM address from the substrate address.
         */
        evm_address: RuntimeDescriptor<[account_id: SS58String], FixedSizeBinary<20>>;
        /**
         * Return the Substrate address bound to the EVM account. If not bound, returns `None`.
         */
        bound_account_id: RuntimeDescriptor<[evm_address: FixedSizeBinary<20>], Anonymize<Ihfphjolmsqq1>>;
        /**
         * Get the Substrate address from the EVM address.
         * Returns the truncated version of the address if the address wasn't bind.
         */
        account_id: RuntimeDescriptor<[evm_address: FixedSizeBinary<20>], SS58String>;
    };
    /**
     * Required runtime APIs needed for client subsystems like the RPC
     */
    IsmpRuntimeApi: {
        /**
         * Should return the host's state machine identifier
         */
        host_state_machine: RuntimeDescriptor<[], Anonymize<Icctse4hug509d>>;
        /**
         * Fetch all ISMP events
         */
        block_events: RuntimeDescriptor<[], Anonymize<Idh5kbd0b4k677>>;
        /**
         * Fetch all ISMP events and their extrinsic metadata
         */
        block_events_with_metadata: RuntimeDescriptor<[], Anonymize<I8aqlkvv092ag5>>;
        /**
         * Return the scale encoded consensus state
         */
        consensus_state: RuntimeDescriptor<[id: FixedSizeBinary<4>], Anonymize<Iabpgqcjikia83>>;
        /**
         * Return the timestamp this client was last updated in seconds
         */
        state_machine_update_time: RuntimeDescriptor<[id: Anonymize<Ifm3n51g640vse>], Anonymize<I35p85j063s0il>>;
        /**
         * Return the challenge period timestamp
         */
        challenge_period: RuntimeDescriptor<[id: Anonymize<Ieitt970a26jef>], Anonymize<I35p85j063s0il>>;
        /**
         * Return the latest height of the state machine
         */
        latest_state_machine_height: RuntimeDescriptor<[id: Anonymize<Ieitt970a26jef>], Anonymize<I35p85j063s0il>>;
        /**
         * Fetch the requests for the given commitments.
         */
        requests: RuntimeDescriptor<[request_commitments: Anonymize<Ic5m5lp1oioo8r>], Anonymize<Icad0fteo3kki0>>;
        /**
         * Fetch the responses for the given commitments.
         */
        responses: RuntimeDescriptor<[response_commitments: Anonymize<Ic5m5lp1oioo8r>], Anonymize<Idh09c22dpqo2s>>;
    };
    /**
     * Ismp Parachain consensus client runtime APIs
     */
    IsmpParachainApi: {
        /**
         * Return all the para_ids this runtime is interested in. Used by the inherent provider
         */
        para_ids: RuntimeDescriptor<[], Anonymize<Icgljjb6j82uhn>>;
        /**
         * Return the current relay chain state.
         */
        current_relay_chain_state: RuntimeDescriptor<[], Anonymize<I67smi4kj2jg4u>>;
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
     *
     * Changes:
     * - Version 2: Update to `can_build_upon` to take a relay chain `Slot` instead of a parachain `Slot`.
     */
    AuraUnincludedSegmentApi: {
        /**
         * Whether it is legal to extend the chain, assuming the given block is the most
         * recently included one as-of the relay parent that will be built against, and
         * the given relay chain slot.
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
        dry_run_call: RuntimeDescriptor<[origin: Anonymize<Ifohkba1aph7uu>, call: Anonymize<I92ov8h8197b4h>, result_xcms_version: number], Anonymize<I5tl4ceupnessr>>;
        /**
         * Dry run XCM program
         */
        dry_run_xcm: RuntimeDescriptor<[origin_location: XcmVersionedLocation, xcm: XcmVersionedXcm], Anonymize<Ib2lgkapsudh06>>;
    };
    /**
     * API for useful conversions between XCM `Location` and `AccountId`.
     */
    LocationToAccountApi: {
        /**
         * Converts `Location` to `AccountId`.
         */
        convert_location: RuntimeDescriptor<[location: XcmVersionedLocation], Anonymize<Ieh6nis3hdbtgi>>;
    };
    /**
    
     */
    FlexibleFeeRuntimeApi: {
        /**
         * get flexible fee token and amount to be deducted
         */
        get_fee_token_and_amount: RuntimeDescriptor<[who: SS58String, fee: bigint, utx: Binary], Anonymize<Ifrnnpj83g127a>>;
    };
    /**
    
     */
    ZenlinkProtocolApi: {
        /**
        
         */
        get_balance: RuntimeDescriptor<[asset_id: Anonymize<Icu3qllmbdnj89>, owner: SS58String], bigint>;
        /**
        
         */
        get_pair_by_asset_id: RuntimeDescriptor<[asset_0: Anonymize<Icu3qllmbdnj89>, asset_1: Anonymize<Icu3qllmbdnj89>], Anonymize<I42esqb0jrl6ka>>;
        /**
        
         */
        get_amount_in_price: RuntimeDescriptor<[supply: bigint, path: Anonymize<Idhafor8sovqeu>], bigint>;
        /**
        
         */
        get_amount_out_price: RuntimeDescriptor<[supply: bigint, path: Anonymize<Idhafor8sovqeu>], bigint>;
        /**
        
         */
        get_estimate_lptoken: RuntimeDescriptor<[asset_0: Anonymize<Icu3qllmbdnj89>, asset_1: Anonymize<Icu3qllmbdnj89>, amount_0_desired: bigint, amount_1_desired: bigint, amount_0_min: bigint, amount_1_min: bigint], bigint>;
        /**
        
         */
        calculate_remove_liquidity: RuntimeDescriptor<[asset_0: Anonymize<Icu3qllmbdnj89>, asset_1: Anonymize<Icu3qllmbdnj89>, amount: bigint], Anonymize<I5vv5n03oo8gas>>;
    };
    /**
    
     */
    SalpRuntimeApi: {
        /**
        
         */
        get_contribution: RuntimeDescriptor<[index: number, who: SS58String], Anonymize<I1lb0fd61s4rqa>>;
    };
    /**
    
     */
    FarmingRuntimeApi: {
        /**
        
         */
        get_farming_rewards: RuntimeDescriptor<[who: SS58String, pid: number], Anonymize<I2dbamvpq4935>>;
        /**
        
         */
        get_gauge_rewards: RuntimeDescriptor<[who: SS58String, pid: number], Anonymize<I2dbamvpq4935>>;
    };
    /**
    
     */
    BbBNCRuntimeApi: {
        /**
        
         */
        balance_of: RuntimeDescriptor<[who: SS58String, t: Anonymize<I4arjljr6dpflb>], bigint>;
        /**
        
         */
        total_supply: RuntimeDescriptor<[t: Anonymize<I4arjljr6dpflb>], bigint>;
        /**
        
         */
        find_block_epoch: RuntimeDescriptor<[block: number, max_epoch: Anonymize<I4totqt881mlti>], Anonymize<I4totqt881mlti>>;
        /**
        
         */
        bonus: RuntimeDescriptor<[who: SS58String, currency_id: Anonymize<Iebirugq1dbhv6>, value: bigint], bigint>;
        /**
        
         */
        query_pending_rewards: RuntimeDescriptor<[who: SS58String], Anonymize<I2dbamvpq4935>>;
    };
    /**
    
     */
    LendMarketApi: {
        /**
        
         */
        get_account_liquidity: RuntimeDescriptor<[account: SS58String], Anonymize<I4jpedvba08hch>>;
        /**
        
         */
        get_market_status: RuntimeDescriptor<[asset_id: Anonymize<Iebirugq1dbhv6>], Anonymize<I52umdgcif5b75>>;
        /**
        
         */
        get_liquidation_threshold_liquidity: RuntimeDescriptor<[account: SS58String], Anonymize<I4jpedvba08hch>>;
    };
    /**
    
     */
    StablePoolRuntimeApi: {
        /**
        
         */
        get_swap_output: RuntimeDescriptor<[pool_id: number, currency_id_in: number, currency_id_out: number, amount: bigint], bigint>;
        /**
        
         */
        add_liquidity_amount: RuntimeDescriptor<[pool_id: number, amounts: Anonymize<Iafqnechp3omqg>], bigint>;
    };
    /**
    
     */
    VtokenMintingRuntimeApi: {
        /**
        
         */
        get_v_currency_amount_by_currency_amount: RuntimeDescriptor<[currency_id: Anonymize<Iebirugq1dbhv6>, v_currency_id: Anonymize<Iebirugq1dbhv6>, currency_amount: bigint], bigint>;
        /**
        
         */
        get_currency_amount_by_v_currency_amount: RuntimeDescriptor<[currency_id: Anonymize<Iebirugq1dbhv6>, v_currency_id: Anonymize<Iebirugq1dbhv6>, v_currency_amount: bigint], bigint>;
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
export type BifrostDispatchError = Anonymize<I46mg5gru1rk0a>;
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
export type BifrostApis = ApisFromDef<IRuntimeCalls>;
export type BifrostQueries = QueryFromPalletsDef<PalletsTypedef>;
export type BifrostCalls = TxFromPalletsDef<PalletsTypedef>;
export type BifrostEvents = EventsFromPalletsDef<PalletsTypedef>;
export type BifrostErrors = ErrorsFromPalletsDef<PalletsTypedef>;
export type BifrostConstants = ConstFromPalletsDef<PalletsTypedef>;
export type BifrostViewFns = ViewFnsFromPalletsDef<PalletsTypedef>;
export type BifrostCallData = Anonymize<I92ov8h8197b4h> & {
    value: {
        type: string;
    };
};
export type BifrostWhitelistEntry = PalletKey | ApiKey<IRuntimeCalls> | `query.${NestedKey<PalletsTypedef['__storage']>}` | `tx.${NestedKey<PalletsTypedef['__tx']>}` | `event.${NestedKey<PalletsTypedef['__event']>}` | `error.${NestedKey<PalletsTypedef['__error']>}` | `const.${NestedKey<PalletsTypedef['__const']>}` | `view.${NestedKey<PalletsTypedef['__view']>}`;
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
