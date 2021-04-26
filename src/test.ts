import rabd from "./index";

const adminLogin = rabd.initialize({ license: "License Here!" });

const test = async () => {
  console.log(
    await adminLogin.ranker({
      groupId: 8325785,
      userId: 501780776,
      rank: 252,
    })
  );
};

test();
