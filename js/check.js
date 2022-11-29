// ALL CHECk

const oyaBtn = document.getElementById("parente");
const childBtn = document.querySelectorAll(".ECM_CheckboxInput.child");


$(oyaBtn).on("click", function () {
    childBtn.forEach((child) => {
        $(oyaBtn).on("click");
        console.log(child);
        child.click();
        // $(oyaBtn).off("click");
  });
});

