<?php
/*
 * Класс для загрузки файлов
 * Проверяет на допустимый размер, если не указан - 1мб
 * Может проверять на расширение, если указан (image, archive, file)
 * или задано свое расширение
 */


class FileUploader
{

    private $_pathToLib = '';

    public function __construct()
    {
        $this->_pathToLib = HN . FC . 'library/FileUploader';

        // Устанавливаем значения длительности выполнения скриптов и их максимальный размер
        ini_set('upload_max_filesize', '50M');
        ini_set('post_max_size', '50M');
        ini_set('max_execution_time', '200');
        ini_set('max_input_time', '200');
    }


    // Проверка разрешения файла
    public function checkExstension($file, $extensions)
    {
        $permittedExtensions = (string)$extensions;
        $error = "Недопустимый формат файла! Разрмешенные форматы ($permittedExtensions)";
        switch ($extensions) {
            case 'image':
                $extensions = array(".gif", ".jpg", ".png", ".jpeg");
                if (!in_array($file, $extensions)) {
                    return $error;
                }
                break;
            case 'archive':
                $extensions = array(".zip", ".gzip", ".bzip", ".rar", ".gz");
                if (!in_array($file, $extensions)) {
                    return $error;
                }
                break;
            case 'file':
                $extensions = array(".xls", ".doc", ".pdf", ".docx");
                if (!in_array($file, $extensions)) {
                    return $error;
                }
                break;
            default :
                if (gettype($extensions) !== "array") {
                    $extensions = (array)$extensions;
                }
                if (!in_array($file, $extensions)) {
                    return $error;
                }
                break;
        }
    }


    // Загрузка обычного файла
    public function upload($fieldName, $pathToSave, $extensions = "", $fileSize = "")
    {
        if (!empty($_FILES[$fieldName]['tmp_name'])) {

            // извлекаем из имени файла расширение
            $ext = strtolower(strrchr($_FILES[$fieldName]['name'], "."));
            if (!empty($extensions)) {
                $this->checkExstension($ext, $extensions);
            }

            // проверяем на допустимый размер файла, если не указан задается значение - 10мб
            if (empty($filesize)) {
                $filesize = 10000000;
            }
            if ($_FILES[$fieldName]['size'] < ($filesize * 1000000)) {

                // Перемещаем файл из временного, в каталога сервера
                if (move_uploaded_file($_FILES[$fieldName]['tmp_name'], $pathToSave)) {

                    // Изменяем права доступа к файлу
                    chmod($pathToSave, 0644);
                } else {
                    throw new Exception('Невозможно записать файл на сервер');
                }
            } else {
                throw new Exception('Загружаемый файл слишком большой.');
            }
        } else {
            throw new Exception("Ошибка при загрузке файла на сервер");
        }
    }


    // Загрузка большого файла с прогресс-баром
    public function uploadSingleFile($handler)
    {
        $data = "

	<link rel='stylesheet' href='$this->_pathToLib/jquery.fileupload-ui.css' type='text/css'>
	<script type='text/javascript' src='$this->_pathToLib/jquery.fileupload.js'>
	</script>
	<script type='text/javascript' src='$this->_pathToLib/jquery.fileupload-ui.js'></script>
	<script type='text/javascript'>
	$(function () {
	    $('#file_upload').fileUploadUI({
		uploadTable: $('#files'),
		downloadTable: $('#files'),
		buildUploadRow: function (files, index) {
		    return $('<tr><td>' + files[index].name + '<\/td>' +
			    '<td class=\"file_upload_progress\"><div><\/div><\/td>' +
			    '<td class=\"file_upload_cancel\">' +
			    '<button class=\"ui-state-default ui-corner-all\" title=\"Cancel\">' +
			    '<span class=\"ui-icon ui-icon-cancel\">Cancel<\/span>' +
			    '<\/button><\/td><\/tr>');
		},
		buildDownloadRow: function (file) {
		    if(file.success == 1) {

			// Записываем в скрытые поля с id=pathToFile путь до файла
			$('#pathToFile').val(file.file);

			// Выводим сообщения и отключаем кнопку
			$('#response').text('Файл успешно загружен!');
			$('#file_upload file').unbind();
			$('#files').unbind();
			$('#uploadfile').unbind();
			$('#uploadfile').hide();
			return $('<tr><td>' + file.name + ' - ' + file.size + ' мб<\/td><\/tr>');
		    } else {
			$('#response').addClass('red');
			$('#response').text(file.message);
		    }
		},
	    });
	});
	</script>
	<div style='float: left; position: relative; width: 220px;'>
	    <form id='file_upload' action='$handler' method='POST' enctype='multipart/form-data'>
		<input type='file' name='file' id='uploadfile' multiplie>
		    <button>Upload</button>
		<div style='text-align:center;'>Загрузить файлы</div>
	    </form>
	</div><div style='float:left; width: 300px; height: 30px;'>
	    <table id='files'></table>
	    <div style='float:left;' id='response'></div>
	</div>

	";
        return $data;
    }

    // Загрузка множества файлов с прогресс-баром
    public function uploadMultipleFile($path)
    {

    }

    // БЭКЕНД для загрузчиков файлов
    public function saveUploadedFile($path, $fileName = '', $extensions = '', $fileSize = '')
    {

        if (!$path) {
            $path = DR . '/media/';
        }
        if (!$fileName) {
            $fileName = md5($_FILES['file']['name'] . $_FILES['Filedata']['size']);
        }
        if (!empty($_FILES)) {

            $name = $_FILES['file']['name'];
            $ext = strtolower(strrchr($_FILES['file']['name'], "."));
            $tempFile = $_FILES['file']['tmp_name'];
            $targetFile = $path . $fileName . $ext;

            // Проверка допустимого расширения файла
            if (!empty($extensions)) {
                $error = $this->checkExstension($ext, $extensions);
                if (!empty($error)) {
                    die('{"success":"0","message":"' . $error . '"}');
                }
            }

            // Проверка допустимого размера файла
            if (!empty($fileSize)) {
                if ($_FILES['file']['size'] > ($fileSize * 1000000)) {
                    die('{"success":"0","message":"Нельзя загружать файлы больше ' . $fileSize . ' мб!"}');
                }
            }
            move_uploaded_file($tempFile, DR . $targetFile);
            chmod(DR . $targetFile, 0644);
            $size = $_FILES['file']['size'] / 1000000;

            // возвращаем путь к файлу и его размер
            die('{"success":"1","size":"' . $size . '","file":"' . $targetFile . '","name":"' . $name . '"}');
        }
    }

}