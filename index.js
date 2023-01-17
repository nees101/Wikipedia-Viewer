
$(".search-icon").click(function(){
      $(".search-icon,.click").css("display","none");
      $(".search-area,.close-icon,.go_btn").css("display","block");
      $(".search-area").val(null); 
    });

$(".close-icon").click(function(){
      $(".close-icon,.result-item,.search-area,.go_btn").css("display","none");
      $(".search-icon,.click,.random-link").css("display","block");    
    });
    

    //Form submit 
    $("#search").submit(function(event){
      event.preventDefault();
      const inputValue = $(".search-area").val();
      const searchQuery = inputValue.trim();  //to remove whitespaces
        
      try {
        searchWikipedia(searchQuery);
      } catch (err) {
        console.log(err);
        alert('Failed to search wikipedia');
      }
      $(".random-link,.go_btn,.logo").css("display","none");
         
    });
    

    function searchWikipedia(searchQuery) {
      const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
      fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {console.log(data);
                       displayResult(data);
                      });
    }
    

    function displayResult(results){
      // Iterate over the "search" array. 
      results.query.search.forEach(result => {
        const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
        
        // Append the search result to the DOM
        $(".search-bar").after(
          `<div class="result-item">
            <h3 class="result-title">
              <a class="title-url" href="${url}" target="_blank" rel="noopener">${result.title}</a>
            </h3>
            <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
            <span class="result-snippet">${result.snippet}</span><br>
          </div>`
        );
      });
    }
