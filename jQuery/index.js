(function() {
  var beers;

  $(document).ready(function() {
    $.get(
      'https://api.punkapi.com/v2/beers?page=1&per_page=10&brewed_after=11-2014&abv_gt=6',
      function(data) {
        beers = Object.values(data);

        $('#beers').html(generateHtml(beers));
      }
    );

    $('#btn').on('click', function() {
      beers.forEach(function(beer, index) {
        beers[index].abv = beers[index].attenuation_level + '% | ' + beers[index].abv;
      });

      $('#beers').html(generateHtml(beers));
    });
  });

  function generateHtml(beers) {
    let html = `<table class="table table-striped table-hover">
          <thead class="thead-dark">
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Alcohol By Volume</th>
            </thead>
            <tbody>`;

    beers.forEach(function(beer) {
      html += `<tr>
              <td><img src="${beer.image_url}" width="20" height="50"/></td>
              <td>${beer.name}</td>
              <td>${beer.description}</td>
              <td>${beer.abv}</td>
            </tr>`;
    });

    html += '</tbody></table>';

    return html;
  }
})();
