import subprocess
import json
import datetime
import webbrowser
import os

print("Enter Location to check (press enter if this is the desired location already):")

loc = input("> ") or "."

print(loc)
print("...Starting with checksum generation")
print("...This can take some time depending on directory size and storage medium (SSD/HDD)")
print("...")
print("...")


checksumstr = subprocess.getoutput("find " + loc + " ! -empty -type f -exec md5sum {} +")

print("...Checksums have been created!")

timeOut = datetime.datetime.now().strftime("%Y%m%d%H%M%S")

f = open('rawout' + timeOut + '.txt', 'w')
f.write(checksumstr)
f.close()

print("...Checksums have been written to: rawout" + datetime.datetime.now().strftime("%Y%m%d%H%M%S") + '.txt')


checksumlist = checksumstr.splitlines()


pyoutpre = """

    <html>
        <head>
            <style>
                :root {
                    --indention: 1.8em;
                    --item-padding: 1px;
                    --file-column-spacing: 25em;
                    --font-size: 14px;

                    --item-base-height: 19px;
                }
                
                body {
                    margin: 0;
                    /* font-family: 'Courier New', Courier, monospace; */
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: var(--font-size);
                    background-color: rgb(150, 154, 165);
                    /* background-color: rgb(146, 146, 146); */
                    cursor: default;
                    /* color: white; */
                }


                
                .file {
                    padding: var(--item-padding);
                    display: flex;
                    flex-wrap: no-wrap;
                    gap: 1em;
                    padding-left: var(--indention);
                    

                }
                .folder {
                    padding-left: var(--indention);

                }
                .file div {
                    min-width: var(--file-column-spacing);
                }
                .file div:first-child {
                    min-width: calc(var(--file-column-spacing) / 2);
                }

                .folder-name {
                    padding: var(--item-padding) 0;
                    cursor: pointer;
                }
                

                .folder-name::before {
                    content: "├─ 🞃 ";
                    position: absolute;
                    translate: -3em 0;
                }

                .folder-name-collapsed::before {
                    content: "├─ 🞂 ";
                    position: absolute;
                }

                .file::before {
                    /* content: "┣━━━"; */
                    content: "├──";
                    position: absolute;
                    translate: -3em 0;
                }
                
                .file:last-child::before {
                    content: "└──";
                    position: absolute;
                    translate: -3em 0;
                }




                .settings div {
                    display: inline-block;
                }
                .settings {
                    font-size: 16px;
                    position: sticky;
                    top: 0;
                    left: 0;
                    z-index: 2;
                    background-color: rgb(150, 154, 165);

                }

                .start-folder-container {
                    min-width: 100vw;
                    width: max-content;
                    box-sizing: border-box;

                    background: repeating-linear-gradient(
                        180deg,
                        #ececec,
                        #ececec var(--item-base-height),
                        #bbbbbb var(--item-base-height),
                        #bbbbbb calc(var(--item-base-height) * 2)
                    );
                }

            </style>
        </head>
        <body>

        <div class="settings" id="Settings">
            <!-- <div>Indention: <input type="number" style="width: 4em;" value="9" onchange="
                document.documentElement.style.setProperty('--indention', this.value / 5 + 'em');
                
            "></div> -->
            <div>| Directory Duplicate Explorer | </div>
            <div>Item Padding: <input type="number" style="width: 4em;" value="1" onchange="
                document.documentElement.style.setProperty('--item-padding', this.value + 'px');
                document.documentElement.style.setProperty('--item-base-height', document.querySelector('.top-folder').clientHeight + 'px');
                
            "></div>
            <div>Font Size: <input type="number" style="width: 4em;" value="14" onchange="
                document.documentElement.style.setProperty('--font-size', this.value + 'px');
                document.documentElement.style.setProperty('--item-base-height', document.querySelector('.top-folder').clientHeight + 'px');
                
            "></div>
            <div>File Column Spacing: <input type="number" style="width: 4em;" value="25" onchange="
                document.documentElement.style.setProperty('--file-column-spacing', this.value + 'em');
            "></div>
            <div><button onclick="document.querySelectorAll('.folder-name:not(.top-folder)').forEach(function(element) {
                element.nextSibling.style.display = 'none'; 
                element.classList.add('folder-name-collapsed');
            });">Collapse All</button></div>
            <div><button onclick="document.querySelectorAll('.folder-name').forEach(function(element) {
                element.nextSibling.style.display = 'block'
                element.classList.remove('folder-name-collapsed');
            });">Show All</button></div>
        </div>

                        <!-- document.getElementById("BG_lines").appendChild(document.createElement("div"));
                        <div class="bg-lines"></div> -->

        <div id="Output_Table">

        </div>

        

        <script>

"""

pyoutvar = "var checksumlist = JSON.parse('{0}');".format(json.dumps(checksumlist))

pyoutpost = """


        var escChars = [
            [" ", "___EXCAPECHAR_WHITESPACE_963852741___"],
            ["/", "___EXCAPECHAR_SLASH_963852741___"],
            [".", "___EXCAPECHAR_DOT_963852741___"],
            [",", "___EXCAPECHAR_COMMA_963852741___"],
        ]

        function escapeChars(inp) {
            var out = inp;
            for (let i = 0; i < escChars.length; i++) {
                out = out.replaceAll(escChars[i][0], escChars[i][1])
            }

            return out;

        }

        var sameFiles = 0;
        


        for (let i=0; i < checksumlist.length; i++) {
            checksumlist[i] = [checksumlist[i].slice(0, 32), checksumlist[i].slice(34)]
        }

        console.log(checksumlist);

        var startFolder = document.createElement("div")
        startFolder.id = escapeChars(checksumlist[0][1].split("/")[0]);
        startFolder.classList.add("folder");
        startFolder.classList.add("start-folder-container");


        nfName = document.createElement("div");
        nfName.classList.add("folder-name");
        nfName.classList.add("top-folder");
        nfName.innerText = checksumlist[0][1].split("/")[0];
        startFolder.appendChild(nfName);

        nfContent = document.createElement("div");
        nfContent.classList.add("folder-content");
        startFolder.appendChild(nfContent);
        
        document.getElementById("Output_Table").appendChild(startFolder);


        var dirList = [checksumlist[0][1].split("/")[0]];

        for (let i = 0; i < checksumlist.length; i++) {
           
            var currFile = checksumlist[i][1].split("/");

            for (let j = 0; j < currFile.length; j++) {

                if (j < currFile.length - 1) {
                    // --- for all folders (not the file itself)

                    if (!dirList.includes(currFile.slice(0, j + 1).join("/"))) {
                        // --- Create a new folder element if the folder is not in the directory list yet
                        dirList.push(currFile.slice(0, j + 1).join("/"));

                        var newFolder = document.createElement("div");
                        newFolder.id = escapeChars(currFile.slice(0, j + 1).join("___EXCAPECHAR_SLASH_963852741___"));
                        newFolder.classList.add("folder");

                        nfName = document.createElement("div");
                        nfName.classList.add("folder-name");
                        nfName.classList.add("visible-item");
                        nfName.innerText = currFile[j];
                        newFolder.appendChild(nfName);

                        nfContent = document.createElement("div");
                        nfContent.classList.add("folder-content");
                        newFolder.appendChild(nfContent);

                        document.getElementById(escapeChars(currFile.slice(0, j).join("___EXCAPECHAR_SLASH_963852741___"))).querySelector(".folder-content").appendChild(newFolder);

                    }
                } else {
                    // --- Add Files

                    var newFile = document.createElement("div");
                    newFile.id = escapeChars(currFile.slice(0, j + 1).join("___EXCAPECHAR_SLASH_963852741___"));
                    newFile.classList.add("file");
                    newFile.classList.add("visible-item");

                    nfName = document.createElement("div");
                    nfName.classList.add("file-name");
                    nfName.innerText = currFile[j];
                    nfName.setAttribute("title", checksumlist[i].join(" | "))
                    newFile.appendChild(nfName);

                    // --- Find Duplicates
                    var compareHash = checksumlist[i][0];
                    for (let k = 0; k < checksumlist.length; k++) {
                        
                        if (compareHash == checksumlist[k][0] && k != i) {
                            duplicate = document.createElement("div");
                            duplicate.classList.add("duplicate");
                            duplicate.setAttribute("title", checksumlist[k].join(" | "))
                            duplicate.innerText = checksumlist[k][1];
                            newFile.appendChild(duplicate);

                            sameFiles++
                        }   
                    }
                    document.getElementById(escapeChars(currFile.slice(0, j).join("___EXCAPECHAR_SLASH_963852741___"))).querySelector(".folder-content").appendChild(newFile);
                }
            }
        }


        document.querySelectorAll('.folder-name').forEach(function(element) {
            element.addEventListener('click', function() {
                if (element.nextSibling.style.display != "none") {
                    
                    element.classList.add("folder-name-collapsed");
                    element.nextSibling.style.display = "none";
                } else {
                    element.classList.remove("folder-name-collapsed");
                    element.nextSibling.style.display = "block";
                }
            });
        });


        
        document.documentElement.style.setProperty('--item-base-height', document.querySelector('.top-folder').clientHeight + 'px');

        if (sameFiles == 0) {
            alert("No same Files found. All files are different");
        }



        </script>
        </body>
    </html>


"""

pyout = pyoutpre + pyoutvar + pyoutpost;


f = open('DirDupeExplorer-out-' + timeOut + '.html', 'w')
f.write(pyout)
f.close()

print("...Your Output is ready!")
print("...If the broser does not open automatically, open DirDupeExplorer-out-" + timeOut + '.html')

webbrowser.open('file://' + os.path.realpath('DirDupeExplorer-out-' + timeOut + '.html'))





