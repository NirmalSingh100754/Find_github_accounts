const arr = [];
document.getElementById("search").addEventListener("click", function () {
  const handleName = document.getElementById("account").value;
  try {
    if (handleName == "") throw new Error("Account not found");
    console.log("Input Handle Name:", handleName);
    if (!arr.includes(handleName)) {
      arr.push(handleName);
      getUserData(handleName);
    }
  } catch (e) {
    alert(e.message);
  }
});
const gitapi = "https://api.github.com/users/";

async function getUserData(handlename) {
  const r = await fetch(gitapi + handlename);
  try {
    console.log(r);
    const d = await r.json();
    console.log(d);
    if (d.message == "Not Found") throw new Error("Account not found");
    const accounts = document.getElementsByClassName("accounts")[0];
    let name = d.name;
    if (name == null) name = "";
    let bio = d.bio;
    if (bio == null) bio = "No bio available";
    const ac = document.createElement("div");
    ac.className = "ac";
    ac.innerHTML = `<div class="ac1"><img src="${d.avatar_url}" alt="${name}" class="image">
                <div class="name">
                <h3>${name}</h3>
                <p>@${d.login}</p>
                </div>
            </div>
            <div class="ac2">
                <div class="ac2_">
                    <div class="value">${d.public_repos}</div>
                    <div class="var">REPOS</div>
                </div>
                <div class="ac2_">
                    <div class="value">${d.public_gists}</div>
                    <div class="var">GISTS</div>
                </div>
                <div class="ac2_">
                    <div class="value">${d.followers}</div>
                    <div class="var">FOLLOWERS</div>
                </div>
            </div>
            <div class="ac3"><div class="bio">${bio}</div></div>`;
    accounts.appendChild(ac);
  } catch (e) {
    alert(e.message);
  }
}
