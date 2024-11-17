var bookmakerNameinput=document.getElementById('bookmakerName');
var bookmakerUrlinput=document.getElementById('bookmakerUrl');
var addBtn=document.getElementById('addBtn');
var updateBtn=document.getElementById('updateBtn');
var bookmakerContainer=[];
if(localStorage.getItem('websites')!==null){
   bookmakerContainer=JSON.parse( localStorage.getItem('websites'))
   displayBookmark();
}
function submitWebsite(){
    if(bookmakerNameinput.classList.contains('is-valid')&&bookmakerUrlinput.classList.contains('is-valid')){
        var website={
            name:bookmakerNameinput.value,
            URL:`https://${bookmakerUrlinput.value}`
           }
           clearForm()
            bookmakerContainer.push(website);
           localStorage.setItem('websites',JSON.stringify(bookmakerContainer))
            displayBookmark()
            
        }
        else{
        alert(`Site Name or Url is not valid, Please follow the rules below :
            Site name must contain at least 3 characters
             Site URL must begin with https
             or may be the name of site is repeated.`
        )
        }
    }


function displayBookmark(){
    var cartona='';
for(var i=0;i<bookmakerContainer.length;i++){
     cartona+=` <tr>
        <td>${i+1}</td>
        <td>${bookmakerContainer[i].name}</td>
        <td><button onclick="visitWebsite(${i})" class="btn btn-success"><i class="fa-regular fa-eye pe-2"></i>Visit</button></td>
        <td><button onclick="deleteBookmark(${i})" class="btn btn-danger"><i class="fa-regular fa-trash-can pe-2"></i>Delete</button></td>
        <td><button onclick="setFormForUpdate(${i})" class="btn btn-warning"><i class="fa-regular fa-trash-can pe-2"></i>Update</button></td>
    </tr>`
}
document.getElementById('tableContent').innerHTML =cartona
}
function clearForm(){
bookmakerNameinput.value=null; //set value
bookmakerUrlinput.value=null ;//set value
}
function deleteBookmark(deletedindex){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            bookmakerContainer.splice(deletedindex,1);
            displayBookmark();
            localStorage.setItem('websites',JSON.stringify(bookmakerContainer))
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
}
function visitWebsite(visitedindex){
    window.open(bookmakerContainer[visitedindex].URL,'_blank') 
}
var updatedWebsite;
function setFormForUpdate(i){
    updatedWebsite=i;
bookmakerNameinput.value=bookmakerContainer[i].name;
bookmakerUrlinput.value=bookmakerContainer[i].URL;
addBtn.classList.add('d-none');
updateBtn.classList.remove('d-none');
}
function updateWebsite(){
    if(bookmakerNameinput.classList.contains('is-valid')&&bookmakerUrlinput.classList.contains('is-valid')){
        bookmakerContainer[updatedWebsite].name=bookmakerNameinput.value;
        bookmakerContainer[updatedWebsite].URL=bookmakerUrlinput.value;
        localStorage.setItem('websites',JSON.stringify(bookmakerContainer))
        displayBookmark();
        addBtn.classList.remove('d-none');
        updateBtn.classList.add('d-none');
        clearForm();
    }
    else{
        alert(`Site Name or Url is not valid, Please follow the rules below :
            Site name must contain at least 3 characters
             Site URL must begin with https
             or may be the name of site is repeated.`
        )
        }
    }
    function validateinputs(element){
var regex ={
    bookmakerName:/[a-z]{3,}/,
    bookmakerUrl:/^(https):\/\/www\.[a-z]{3,}\.com$/
}
if(regex[element.id].test(element.value)==true){
    element.classList.add('is-valid');
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add('d-none');
}
else{
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
    element.nextElementSibling.classList.remove('d-none');
}
    }