<?php
    function __autoload($className) {
        require_once "../Utils/{$className}.inc";
    }

    $info_in2 = trim(file_get_contents("../Seed/info.txt"));
    $info = explode("-", $info_in2);
    $pins_in2 = trim(file_get_contents("../Seed/pins.txt"));
    $pins = explode("-", $pins_in2);
    $flag=trim(file_get_contents("../flags/flag5.txt"));
    $a=0;
    $title = "Two-Factor Pin Management";

    #header
    include_once('../Utils/header.inc');

	if (!isset($correct)) {
    		$correct=false;
	}

	if ($correct==true){
        	echo '<h4 class="alert_success">Congratulations. '.$flag.'</h4>';
	}else{
     		echo '<h4 class="alert_info">info: you are currently in Read-Only Mode enter todays pin for Administrative access</h4>';
	}
      ?>
        <article class="module width_full">
            <header>
                <h3 class="tabs_involved">Two-Factor Pin Manager</h3>
            </header>
            <div class="tab_container">
                <div class="tab_content">
                    <table class="tablesorter" cellspacing="0">
                        <thead>
                            <tr>
                                <th></th>
                                <th>User Name</th>
                                <th>Seed</th>
                                <th>Multiplier</th>
                                <th>Increment</th>
                                <th>Modulus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="checkbox">
                                </td>
                                <td>davedavington@ecwi.cysca</td>
                                <td><?php
                                        if ($correct==true){
                                            echo  $info[0];
                                        }else{
                                            echo '{error:Read Only-Access}';
                                        }
                                    ?></td>
                                <td><?php echo $info[1]; ?></td>
                                <td><?php echo $info[2]; ?></td>
                                <td><?php echo $info[3]; ?></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- end of #tab1 -->
            </div>
        </article>
        <!-- end of two-factor -->
        <article class="module width_3_quarter">
            <header>
                <h3 class="tabs_involved">Dave Davington - Pin History</h3>
	</header>
            <div class="tab_container">
                <table class="tablesorter" cellspacing="0">
                    <thead>
                        <tr><th></th>
                            <th>Pin</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="checkbox">
                            </td>
                            <td>
                                    <?php
                                        if ($correct==true){
                                            echo  $valid_pin;
                                        }else{
                                            echo '{error:Read Only-Access}';
                                        }
                                    ?>
                            </td>
                            <td><?php echo date('d/m/Y');  ?></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox">
                            </td>
                            <td>
                                <?php echo $pins[8]; ?>
                            </td>
                            <td><?php echo date('d/m/Y', strtotime("-1 days"));?>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox">
                            </td>
                            <td>
                                <?php echo $pins[7]; ?>
                            </td>
                            <td><?php echo date('d/m/Y', strtotime("-2 days"));?></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox">
                            </td>
                            <td>
                                <?php echo $pins[6]; ?>
                            </td>
                            <td><?php echo date('d/m/Y', strtotime("-3 days"));?></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox">
                            </td>
                            <td>
                                <?php echo $pins[5]; ?>
                            </td>
                            <td><?php echo date('d/m/Y', strtotime("-4 days"));?></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox">
                            </td>
                            <td>
                                <?php echo $pins[4]; ?>
                            </td>
                            <td><?php echo date('d/m/Y', strtotime("-5 days"));?></td>
                        </tr>
                        <tr>

                            <td>
                                <input type="checkbox">
                            </td>
                            <td>
                                <?php echo $pins[3]; ?>
                            </td>
                            <td><?php echo date('d/m/Y', strtotime("-6 days"));?></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox">
                            </td>
                            <td>
                                <?php echo $pins[2]; ?>
                            </td>
                            <td><?php echo date('d/m/Y', strtotime("-7 days"));?></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox">
                            </td>
                            <td>
                                <?php echo $pins[1]; ?>
                            </td>
                            <td><?php echo date('d/m/Y', strtotime("-8 days"));?></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox">
                            </td>
                            <td>
                                <?php echo $pins[0]; ?>
                            </td>
                            <td><?php echo date('d/m/Y', strtotime("-9 days"));?></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- end of .tab_container -->
        </article>
        <!-- end of pin management history -->
        <article class="module width_quarter">
            <header>
                <h3>Messages</h3></header>
            <div class="message_list">
                <div class="module_content">
                    <div class="message">
                        <p><strong>Message From: Angelina agoffin@ecwi.cysca</strong></p>
                        <p><strong>Subject: Generator Settings</strong></p>
                    </div>
                 <p>Hi Dave,</p><br>
                    <P> Without todays pin everyone is only getting read-only access to the two-factor pin management page.
		</p><P> Do you think you could try and figure out what todays pin is?</p>
			<br>
                    <p>Regards,</p>
                    <P>Angelina.</P>
                </div>
            </div>

        </article>
        <!-- end of messages article -->

        <!-- end of main -->
        <?php include_once('../Utils/footer.inc'); ?>
