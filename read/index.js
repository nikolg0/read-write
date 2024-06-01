const fs = require("fs");
const path = require("path");

function saveData(filePath, outputFolderName, overwrite = true) {
  const fullPath = path.join(__dirname, filePath);
  console.log(fullPath);

  fs.readFile(fullPath, "utf-8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      fs.mkdir(outputFolderName, function (err) {
        if (err) {
          console.log(err);
        }
      });

      const peopleCollection = JSON.parse(data);

      peopleCollection.forEach(function (person) {
        console.log(person.id);
        const fileName = `${person.id}-${person.name
          .toLowerCase()
          .split(" ")
          .join("-")}.txt`;
        const outputPath = path.join(__dirname, outputFolderName, fileName);

        const firstName = person.name.split(" ")[0];
        const lastName = person.name.split(" ")[1];

        const content =
          `Name: ${firstName} \n` +
          `Surname: ${lastName} \n` +
          `Street: ${person.address.street} \n` +
          `Zip Code: ${person.address.zipcode} \n` +
          `City: ${person.address.city} \n` +
          `Phone: ${person.phone} \n`;

        peopleCollection.forEach((person) => {
          person.name = person.name.replace(".", "");
        });

        if (fs.existsSync(outputPath)) {
          if (overwrite) {
            fs.writeFile(outputPath, content, function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log(`Plik nadpisany.`);
              }
            });
          } else {
            console.log(`Plik już istnieje. Nie nadpisano.`);
          }
        } else {
          fs.writeFile(outputPath, content, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log(`Stworzono plik.`);
            }
          });
        }
      });
    }
  });
}

saveData("/data.json", "output", false);
