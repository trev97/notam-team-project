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
    loader.style.display = "none";
    //var ldata = call1.data.concat(call2.data);
    //const notamDataArray = call1.map((jsonObject) => {
    //  const notamData = jsonObject.properties.coreNOTAMData.notamTranslation[0].formattedText
    //  return notamData ? notamData.replace(/\n/g, "") : null
    //})
      
    
    //const textData = notamDataArray.join("\n");
    //const downloadLink = document.createElement("a");
    //downloadLink.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(textData))
    //downloadLink.setAttribute("download", "notam_data.csv")
    //document.body.appendChild(downloadLink)
    //downloadLink.click();
    
    loader.style.display = "none";
    // Create a new DataTable object
    table = $("#departureNOTAMS").DataTable({
      lengthMenu: [
        [15, 50, 100, -1],
        [15, 50, 100, "All"],
      ],
      pagingType: "simple",
      scrollY: 400,
      scrollCollapse: true,
      order: [],
      data: call1.data,
      columns: [
        {
          data: "properties.coreNOTAMData.notam.text",
          render: function(data, type, row) {
            if (data.includes("CANCELED")) {
              return '<span class="text-canceled">' + data + '</span>';
            } else {
              return data;
            }
          }
        },
        { data: "category" },
        {
          data: function(row) {
            return row.properties.coreNOTAMData.notam.effectiveStart.substring(0, 10);
          }
        },
        {
          data: function(row) {
            return row.properties.coreNOTAMData.notam.effectiveEnd.substring(0, 10);
          }
        },
        {
          data: function(row) {
            return row.properties.coreNOTAMData.notam.id.split('_').pop();
          }
        },
      ],
    });

    table = $("#arrivalNOTAMS").DataTable({
      lengthMenu: [
        [15, 50, 100, -1],
        [15, 50, 100, "All"],
      ],
      pagingType: "simple",
      scrollY: 400,
      scrollCollapse: true,
      order: [],
      data: call2.data,
      columns: [
        // { data: "properties.coreNOTAMData.notamTranslation[0].formattedText" },
        // { data: 'properties.coreNOTAMData.notam.text' },
        {
          data: "properties.coreNOTAMData.notam.text",
          render: function(data, type, row) {
            if (data.includes("CANCELED")) {
              return '<span class="text-canceled">' + data + '</span>';
            } else {
              return data;
            }
          }
        },
        { data: "category" },
        {
          data: function(row) {
            return row.properties.coreNOTAMData.notam.effectiveStart.substring(0, 10);
          }
        },
        {
          data: function(row) {
            return row.properties.coreNOTAMData.notam.effectiveEnd.substring(0, 10);
          }
        },
        // { data: "properties.coreNOTAMData.notam.effectiveStart".replace('T*', "") },
        // { data: "properties.coreNOTAMData.notam.effectiveEnd" },
        // { data: "properties.coreNOTAMData.notam.id" },
        {
          data: function(row) {
            return row.properties.coreNOTAMData.notam.id.split('_').pop();
          }
        },
      ],
    });
    //  notamTranslation[0].formattedText
  });
