<?php
$target_dir = "uploads/uploadimage.jpg";
$target_file = $target_dir;
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  if($check !== false) {
    echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }
}


// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
  echo "Sorry, your file is too large.";
  $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
  echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}


?>


<!-- <?php


$maxDim = 1024;
$target_dir = "uploads/uploadimage.jpg";
$target_file = $target_dir;

$file_name = $_FILES['fileToUpload']['tmp_name'];
list($width, $height, $type, $attr) = getimagesize( $file_name );
if ( $width > $maxDim || $height > $maxDim ) {
    $target_filename = $file_name;
    $ratio = $width/$height;
    if( $ratio > 1) {
        $new_width = $maxDim;
        $new_height = $maxDim/$ratio;
    } else {
        $new_width = $maxDim*$ratio;
        $new_height = $maxDim;
    }
    $src = imagecreatefromstring( file_get_contents( $file_name ) );
    $dst = imagecreatetruecolor( $new_width, $new_height );
    imagecopyresampled( $dst, $src, 0, 0, 0, 0, $new_width, $new_height, $width, $height );
    imagedestroy( $src );
    imagepng( $dst, $target_filename ); // adjust format as needed
    imagedestroy( $dst );
}
move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $target_file);
?> -->