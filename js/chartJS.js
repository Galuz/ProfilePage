$(document).ready(function()
{
  var data = {
    "medianHomeValue" : [{
      "iOS"         : "1 Year",
      "Web Dev"     : "6 months",
      "Ionic Frame" : "6 months"
    }]
  };
  
  $("body").barChart(data);
});


// PLUGIN FUNCTION
// ======================================
$.fn.barChart = function(data)
  {
    var chart   = $(".chart");
    var y       = "<dl class='yAxis'></dl>";
    var x       = "<ol class='xAxis'></ol>";
    var yKey    = Object.keys(data.medianHomeValue[0]);
    var yValues = [];
    
    // create y axis
    chart.append(y);
    
    var yAxis  = $('.yAxis')
    for (var i = 0, l = yKey.length; i < l; i++)
    {
      yAxis.append("<dt>" + yKey[i] + "</dt>");
      for(var key in data)
      {
          yAxis.append("<dd>" + data.medianHomeValue[0][yKey[i]] + "</dd>");
          var value = parseFloat(data.medianHomeValue[0][yKey[i]].replace(',', ''));
          yValues.push(value);
      }
    }
    
    var maxValue = Math.max.apply(Math, yValues);
    var dd       = yAxis.find('dd');
    
    for ( var i = 0, l = dd.length; i < l; i++)
    {
      var ddValue     = parseFloat(dd.eq(i).text().replace(',', ''));
      var contWidth   = dd.eq(i).closest('.chart').width();
      var dtWidth     = dd.eq(i).prev().width();
      var dtPercent   = dtWidth / contWidth * 100;
      var newPercent  = ddValue / maxValue * 100 - dtPercent;
      var text        = dd.eq(i).text();
      
      dd.eq(i).attr("title", text).css('width', newPercent + "%");
    }
    
    // create x axis
    chart.append(x);
    
    var str     = maxValue.toString();
    var len     = str.charAt(0);
    var ddWidth = Math.round(parseFloat(yAxis.find('dd').width() / chart.width() * 100));
    var xAxis   = $('.xAxis')
  
    for(var i = 0; i < len; i++)
      xAxis.append("<li>" + (i + 1) + "</li>");
    for(var i = 0; i < len - 1; i++)
    {
      xAxis.find('li').eq(i).css('width', (100 - ddWidth) + '%');
      xAxis.find('li').eq(len - 1).addClass('last');
    }
  };

