import { shared } from "@appblocks/node-sdk";
const username_verify = async (req, res) => {
  const { prisma, getBody, sendResponse } = await shared.getShared();
  // health check
  if (req.params["health"] === "health") {
    res.write(JSON.stringify({ success: true, msg: "Health check success" }));
    res.end();
  }
  // console.log(process.env);
  // console.log(key, prisma, getBody, sendResponse);
  // Add your code here
  try {
    const { username } = await getBody(req);

    if (!username) throw new Error("Invalid request");

    const userData = await prisma.users.findFirst({
      where: { user_name: username },
    });

    return sendResponse(res, 200, { status: "ok", available: !userData });
    // return res.status(200).json({ status: "ok", available: !userData });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 400, { message: error.message });

    // return res.status(400).json({ message: error.message });
  }
  // res.write(JSON.stringify({success: true, msg: `Hello username_verify`}))
  // res.end()
};

export default username_verify;
