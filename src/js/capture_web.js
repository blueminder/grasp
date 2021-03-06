(function() {
  var fragment = window
    .getSelection()
    .getRangeAt(0)
    .cloneContents();

  var date = new Date();
  date.toISOString();

  var div = document.createElement("div");
  div.appendChild(fragment.cloneNode(true));

  var img_links = [];
  var imgs = div.querySelectorAll("img");
  imgs.forEach(function(img) {
    var img_link = {};
    img_link["src"] = img.src;
    // windows file paths do not support colons, changing to dots
    img_link["dest"] =
      "/capture_img/" +
      date.toISOString().replace(/:/g, ".") +
      "/" +
      img.src.split("/").pop();
    img_links.push(img_link);
    var newEl = document.createElement("div");
    newEl.innerText = "[[file:." + img_link["dest"] + "]]";
    img.parentNode.replaceChild(newEl, img);
  });

  var hrs = div.querySelectorAll("hr");
  hrs.forEach(function(hr) {
    var newEl = document.createElement("div");
    newEl.innerText = "-----";
    hr.parentNode.replaceChild(newEl, hr);
  });

  var bolds = div.querySelectorAll("b");
  bolds.forEach(function(bold) {
    var newEl = document.createElement("span");
    newEl.innerText = "*" + bold.innerText + "*";
    bold.parentNode.replaceChild(newEl, bold);
  });

  var italics = div.querySelectorAll("i");
  italics.forEach(function(italic) {
    var newEl = document.createElement("span");
    newEl.innerText = "/" + italic.innerText + "/";
    italic.parentNode.replaceChild(newEl, italic);
  });

  var underlines = div.querySelectorAll("u");
  underlines.forEach(function(underline) {
    var newEl = document.createElement("span");
    newEl.innerText = "_" + underline.innerText + "_";
    underline.parentNode.replaceChild(newEl, underline);
  });

  var strikes = div.querySelectorAll("s");
  strikes.forEach(function(strike) {
    var newEl = document.createElement("span");
    newEl.innerText = "+" + strike.innerText + "+";
    strike.parentNode.replaceChild(newEl, strike);
  });

  var blockquotes = div.querySelectorAll("blockquote");
  blockquotes.forEach(function(blockquote) {
    var newEl = document.createElement("span");
    newEl.innerText = "=" + blockquote.innerText + "=";
    blockquote.parentNode.replaceChild(newEl, blockquote);
  });

  var pres = div.querySelectorAll("pre");
  pres.forEach(function(pre) {
    var newEl = document.createElement("span");
    newEl.innerText = "~" + pre.innerText + "~";
    pre.parentNode.replaceChild(newEl, pre);
  });

  // strip whitespace and excessive newlines
  var lines = div.innerText.split("\n");
  var trimmed_lines = lines.map(line => line.trim());
  var filtered_lines = trimmed_lines.filter(Boolean);
  var output = filtered_lines.join("\n\n");

  var img_links_obj = Object.assign({}, img_links);

  return [output, img_links_obj];
})();
