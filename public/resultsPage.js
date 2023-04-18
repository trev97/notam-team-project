$(document).ready(async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const startingLocation = urlParams.get("startingLocation");
    const destinationLocation = urlParams.get("destinationLocation");
    const loader = document.getElementById("loader");
    console.log(startingLocation);
    console.log(destinationLocation);

    var call1 = await $.ajax({
      url: "/results/exampleData",
      data: { location: startingLocation },
    });
    var call2 = await $.ajax({
      url: "/results/exampleData",
      data: { location: destinationLocation },
    });

    var ldata = call1.data.concat(call2.data);
    const notamDataArray = ldata.map((jsonObject) => {
      const notamData = jsonObject.properties.coreNOTAMData.notamTranslation[0].formattedText
      return notamData ? notamData.replace(/\n/g, "") : null
    })
      
    
    const textData = notamDataArray.join("\n");
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(textData))
    downloadLink.setAttribute("download", "notam_data.csv")
    document.body.appendChild(downloadLink)
    downloadLink.click();

    loader.style.display = "none";
    // Create a new DataTable object
    table = $("#example").DataTable({
      lengthMenu: [
        [15, 50, 100, -1],
        [15, 50, 100, "All"],
      ],
      pagingType: "simple",
      scrollY: 400,
      scrollCollapse: true,
      order: [
        [0, "asc"],
        [3, "desc"],
      ],
      data: ldata,
      columns: [
        { data: "properties.coreNOTAMData.notamTranslation[0].formattedText" },
        { data: "properties.coreNOTAMData.notam.effectiveStart" },
        { data: "properties.coreNOTAMData.notam.effectiveEnd" },
        { data: "properties.coreNOTAMData.notam.id" },
      ],
    });
    //  notamTranslation[0].formattedText
  });