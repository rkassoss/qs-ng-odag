
/********************************************************************************************************\
*                                                                                                        *
*  ./+++++++++++++++++++++/.                      `..                    `..     `..    `..              *
*  +ooooooooooooooo++/ooooo/                      -oo.                   +oo     /oo    -oo-             *
*  +ooooooooooooo`    /oooo/                       ``                    +oo     ```    -oo-             *
*  ++:---:ooooooo.    .oooo/     -:-`        .:-` .::`  `------------`   +oo     -:-    -oo-.-:://:-`    *
*  +/     oooo++o/     /ooo/     -oo/       `oo+  :oo.  `/////////ooo-   +oo     +oo    -oo++/:::/+oo-   * 
*  +/     o:.```-o.    .ooo/      :oo-     `+o+`  :oo.          ./o+-    +oo     +oo    -oo:      `/oo.  *
*  +/     o/     +/     /oo/       /oo.    /oo.   :oo.        ./o+-`     +oo     +oo    -oo-       -oo:  *
*  +/     oo`    -o.    .oo/       `+o+`  -oo-    :oo.      ./o+-`       +oo     +oo    -oo-       .oo:  *
*  +/     oo/     +/     +o/        .oo/ .oo:     :oo.    ./o+-`         +oo     +oo    -oo-       -oo-  *
*  +/     ooo`    -o.    .o/         -oo:+o/      :oo.  ./o+-`           +oo.    +oo    -oo-      .+o+`  *
*  +/     ooo:  `.-o/  `.-o/          :ooo+`      :oo.  /oooooooooooo+   .+oo+:  +oo    .ooo+///++oo/`   *
*  .//////++++//+++++//+++/.           `..        `..    `...........`     `..`  `..      `.-----.`  	 *
*                                                                                                        *
*                                            www.vizlib.com                                              *
*                                                                                                        *
*                         Copyright 2017-2018 © Vizlib Ltd. - All rights reserved                        *
\********************************************************************************************************/


requirejs.config({
  paths: {
    'vzb_VizlibFilter': ['https://vizlib-bouncer.herokuapp.com/get?key=bfx7e81hn20a1nhfr-6a1hksdm4itwewmi-w406twgbw08fgbke29-2baqkfb38udzsq0k9&type=js&extension=VizlibFilter&version=auto&end', '/extensions/VizlibFilter/resources/vizliberror']
  }
});

define(['vzb_VizlibFilter'],function(vizlib){
	return vizlib;
});
