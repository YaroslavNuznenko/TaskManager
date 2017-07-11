    var par;
    var mas;
    var masNames;

    function setSelectProjects(){
        mas= $(".prName");
        masNames= document.getElementsByClassName("prName");
        var arr=[];
        for (var i = 0; i < mas.length; i++) {
            for(var key in mas[i]){
                if(arr.indexOf(mas[i].textContent)===-1){
                    arr.push(mas[i].textContent);
                    break;
                }
            }
        }
    selectProjects.innerText="";
    $('#selectProjects').append($('<option>', {
        value: "all",
        text: "Все"
    }));
    for (var i = 0; i < arr.length; i++) {

        $('#selectProjects').append($('<option>', {
        value: arr[i],
        text: arr[i]
    }));
    }
}

$("#newTask").on("click",function () {
    $("#newTask").css("display","none");
    $("#sortOfPriority").css("display","none");
    $("#selectProjects").css("display","none");
    $("#formAddTask").css("display","block");
});
$("#formCancel").on("click",function () {
    $("#newTask").css("display","block");
    $("#sortOfPriority").css("display","block");
    $("#selectProjects").css("display","block");
    $("#formAddTask").css("display","none");
});
$('body').on( 'click','.change',function () {
    par =$(this).parent();
    $("#nameTask").val($(par).find(".tName").text());
    $("#nameProject").val($(par).find(".prName").text());
    $("#description").val($(par).find(".descr").text());
    setSelectProjects();
});
$('body').on( 'click','.closed',function () {
    var parent=$(this).parent();
    $(parent).remove();
    setSelectProjects();
});
$('body').on( 'click','.collapse-expand',function () {
    var parent=$(this).parent();
    if($(this).text()=="Развернуть"){
        $(parent).find(".descr").toggleClass("hide");
        $(this).text("Свернуть");
    }
    else if($(this).text()=="Свернуть"){
        $(parent).find(".descr").toggleClass("hide");
        $(this).text("Развернуть");
    }
});

$("#saveChanges").on("click",function () {
    var str="";
    if(nameTask.value==="" || nameProject.value==="" ||description.value===""){
        alert("Пожайлуста, заполните все поля.");
        return;
    }
    if(par!==undefined){
        $(par).remove();
        par=undefined;
    }
    str='<div class="tasks panel panel-default"><h3><span class="tName">'+nameTask.value+'</span></h3>\
        Проект: <span class="prName">'+nameProject.value+'</span><span class="pr">Приоритет:<span class="priority">'+priority.value+'</span></span>\
        <p><span class="descr hide">'+description.value+'</span></p>\
        <button class="change btn btn-primary">Изменить</button>\
        <button class="closed btn btn-danger">Закрыть</button>\
        <button class="collapse-expand btn btn-warning">Развернуть</button></div>';
    $("#taskManager").append(str);
    nameTask.value="";
    nameProject.value="";
    description.value="";
    setSelectProjects();
});


$("#selectProjects").change(function(){

if($(this).val()==="all"){
    for (var i = 0; i < masNames.length; i++) {
        masNames[i].parentNode.style.display="block";
    }
    return;
}
    for (var i = 0; i < masNames.length; i++) {
            if(masNames[i].innerText===$(this).val().toString()){
                if(masNames[i].parentNode.style.display==="none"){
                    masNames[i].parentNode.style.display="block";
                }
                continue;
            }
                masNames[i].parentNode.style.display="none";
    }
});


$("#sortOfPriority").on("click",function () {
    var $el = $('#taskManager');
    var arr;
        arr = $el.children().sort(
            function( a, b){
              a = parseInt( $('.priority', a).text(), 10);
              b = parseInt( $('.priority', b).text(), 10);
              return (a>b ? 1 : (a===b ? 0 : -1));
            }
          );
    $el.append( arr);

});
