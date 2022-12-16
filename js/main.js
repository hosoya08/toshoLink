"use scrict"

// =============
// TAB
// =============
const tab = document.querySelectorAll(".tab li")
const tab_content = document.querySelectorAll(".tab_content_li")
function tabBtn() {
  for (let i = 0; i < tab.length; i++) {
    tab[i].addEventListener("click", swithFun)
  }
}

function swithFun() {
  for (let i = 0; i < tab.length; i++) {
    tab[i].classList.remove("active")
  }

  for (let i = 0; i < tab_content.length; i++) {
    tab_content[i].classList.remove("open")
  }

  this.classList.add("active")

  const aryTabs = Array.prototype.slice.call(tab)

  const index = aryTabs.indexOf(this)

  tab_content[index].classList.add("open")
  console.log(tab_content[index])
}
tabBtn()
// ===============
//  円グラフ
// ===============
var chartEl2 = document.getElementById("chart01")
var chartEl3 = document.getElementById("chart02")

var chartFunc2 = function () {
  var ctx = chartEl2.getContext("2d")
  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["出荷済み", "未出荷"],
      datasets: [
        {
          data: [70, 30],
          backgroundColor: ["#5DAEB1", "#E89A7B"],
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0,0.16)",
          bavelWidth: 3,
          borderColor: "transparent",
          borderWidth: 3,
        },
      ],
    },
    options: {
      cutoutPercentage: 55,
      layout: {
        padding: {
          top: 20,
          left: 20,
          right: 20,
          bottom: 20,
        },
      },
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      datasets: {
        data: false,
      },
      tooltips: {
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 10,
        shadowColor: "rgb(0, 0, 0)",
        bevelWidth: 3,
        bevelHighlightColor: "rgba(255, 255, 255, 0.75)",
        bevelShadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
    },
  })
}
var chartFunc3 = function () {
  var ctx = chartEl3.getContext("2d")
  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["出荷済み", "未出荷"],
      datasets: [
        {
          data: [60, 40],
          backgroundColor: ["#EAC855", "#7A94D6"],
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0,0.16)",
          bavelWidth: 3,
          borderColor: "#eaecec",
          borderWidth: 0,
        },
      ],
    },
    options: {
      animateScale: true,
      cutoutPercentage: 55,
      layout: {
        padding: {
          top: 20,
          left: 20,
          right: 20,
          bottom: 20,
        },
      },
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      datasets: {
        data: false,
      },
      tooltips: {
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 10,
        shadowColor: "rgb(0, 0, 0)",
        bevelWidth: 3,
        bevelHighlightColor: "rgba(255, 255, 255, 0.75)",
        bevelShadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
    },
  })
}

chartFunc2()
chartFunc3()

// ================
// COUNT UP
// ================
$(function () {
  $(window).on("load scroll", function () {
    $(".fadein").each(function () {
      var txtPos = $(this).offset().top
      var scroll = $(window).scrollTop()
      var windowHeight = $(window).height()
      if (scroll > txtPos - windowHeight + windowHeight / 5) {
        $(this).css({
          opacity: "1",
          transform: "translateX(0)",
        })
        if ($(".num", this).attr("data-num").indexOf(".") > -1) {
          var rounding = 1
        } else {
          var rounding = 0
        }
        $(".num", this).numerator({
          easing: "linear",
          duration: 500,
          toValue: $(".num", this).attr("data-num"),
          rounding: rounding,
        })
      }
    })
  })
})

// ==================
// TAB CLOSE BTN
// ==================
document.getElementById("tabCloseBtn").addEventListener("click", function () {
  document.getElementById("tabMenu").classList.toggle("open")
})

// ====================
// SELECT
// ====================
// $(function () {
//   $("select").on("change", function () {
//     if ($(this).val() == "placeholder") {
//       $(this).css("color", "red")
//     } else {
//       $(this).css("color", "blue")
//     }
//   })
// })

function changeColor(hoge) {
  if (hoge.value == 0) {
    hoge.style.color = ""
  } else {
    hoge.style.color = "#707070"
  }
}
