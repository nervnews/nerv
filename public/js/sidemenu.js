function openMenu() {
  document.getElementById("mySideMenu").style.display = "block";
  }

  function closeMenu() {
    document.getElementById("mySideMenu").style.display = "none";
    }

document.getElementById("burger").addEventListener("click", function(){
  openMenu();
});

document.getElementById("close").addEventListener("click", function(){
  closeMenu();
});
