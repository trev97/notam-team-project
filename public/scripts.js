document.addEventListener("DOMContentLoaded", () => {
    const selectElement = document.getElementById("options");
    const label1 = document.getElementById("label1");
    const label2 = document.getElementById("label2")
    const radiusInput = document.getElementById("radius")
    chooseLabels();
    selectElement.addEventListener("change", () => {
        chooseLabels()
    });

    function chooseLabels(){
        if(selectElement.value == "Dlocation" || selectElement.value == "ICAOlocation"){
            label1.textContent = "Enter Starting Location..."
            label2.textContent = "Enter Destination Location..."
            label3.textContent = ""
            radiusInput.type = "hidden"
        }
        else if(selectElement.value == "L&L"){
            label1.textContent = "Enter Longitude..."
            label2.textContent = "Enter Latitude..."
            label3.textContent = "Enter flight radius..."
            radiusInput.type = "text"
        }
    }
  });


 