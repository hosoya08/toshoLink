
// ================
// Plofile img
// ================
const imgBox = document.querySelector('.user_icon_img-box');
const clickBtn = document.querySelector('.header_secound_box-con img');

clickBtn.addEventListener('click',function(){
    imgBox.classList.toggle('active');
});
