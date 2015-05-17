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

$(document).ready(function(){
  $.ajax({
    url: "http://localhost:3000/token",
    type: "POST",
    data: {user:
              {email: "user3@example.com",
                  password: "password"
                }
          },
    success: function(data, status){
      console.log(data)
      var token = data.token
      $.ajaxSetup({
          headers: { 'Authorization': "Token token="+token }
      });
      $.ajax({
        url: "http://localhost:3000/sign_out",
        type: "POST",
        // data: {story:
        //         {title: "soemthing"}
        //       },
        success: function(data, status){
          console.log(data, status)
        },
        failure: function(data, status){
          console.log(data, status)
        }
      })
    },
    failure: function(data,status){
      console.log(data, status)
    }
  })
});
