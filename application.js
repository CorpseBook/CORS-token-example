// $(document).ready(function(){
  // $.ajax({
  //   url: "http://localhost:3000/token",
  //   type: "POST",
  //   data: {user:
  //             {email: "user3@example.com",
  //                 password: "password"
  //               }
  //         },
  //   success: function(data, status){
  //     console.log(data)
  //   },
  //   failure: function(data,status){
  //     console.log(data, status)
  //   }
  // })
// });

// $(document).ready(function(){

//   $.ajax({
//     url: "http://localhost:3000/token",
//     type: "POST",
//     data: {user:
//               {email: "user3@example.com",
//                   password: "password"
//                 }
//           },
//     success: function(data, status){
//       console.log(data)
//       var token = data.token
//       $.ajaxSetup({
//           headers: { 'Authorization': "Token token="+token }
//       });
      // $.ajax({
      //   url: "http://localhost:3000/sign_out",
      //   type: "POST",
      //   // data: {story:
      //   //         {title: "soemthing"}
      //   //       },
      //   success: function(data, status){
      //     console.log(data, status)
      //   },
      //   failure: function(data, status){
      //     console.log(data, status)
      //   }
      // })
//     },
    // failure: function(data,status){
    //   console.log(data, status)
    // }
//   })
// });

$(document).ready(function(){
  $("#main").on('submit', '.form',function(e){
    e.preventDefault();
    console.log($(this).serialize());
    var form = $(this).serialize();
    $.ajax({
        url: "http://localhost:3000/token",
        type: "POST",
        data: form,
        success: function(data, status){
          console.log(data)
          var token = data.token
          $("#main").empty();
          $.ajaxSetup({
              headers: { 'Authorization': "Token token="+token }
          });
        },
        failure: function(data,status){
          console.log(data, status)
        }
      });
    });

  $("body").on('click', '#signOut', function(e){
    e.preventDefault();
    $.ajax({
      url: "http://localhost:3000/sign_out",
      type: "POST",
      success: function(data, status){
        console.log(data, status)
        var form = "Another login form here"
        $("#main").append(form)
        $.ajaxSetup({
            headers: { 'Authorization': "Token token=0" }
        });
      },
      failure: function(data, status){
        console.log(data, status)
      }
    })
  });

  $("#testGet").on('click', function(e){
    e.preventDefault();
    $.ajax({
      url: "http://localhost:3000/stories",
      type: "GET",
      success: function(data, status){
        console.log(data, status)
      },
      failure: function(data, status){
        console.log(data, status)
      }
    })
  });
});



// $.ajax({
//      url: "http://localhost:3000/stories/15/in_range",
//      type: "GET",
//      data: {search:
//               {lat: 2,
//                 lng: 3}
//             },
//      success: function(data, status){
//        console.log(data, status)
//      },
//      failure: function(data, status){
//        console.log(data, status)
//      }
//     });
