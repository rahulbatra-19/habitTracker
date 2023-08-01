class ToggleStatus {
    constructor(toggleElement) {
        this.toggler = toggleElement;
        this.toggleStatusChange();
    }
    toggleStatusChange() {
        let self = this.toggler;

        $(this.toggler).click((event) => {
            event.preventDefault();
            $.ajax({
                type: 'GET',
                url: $(self).attr('href'),
            }).done((data) => {
                let status = $(self).attr('data-value');
                if (status == 'none') {
                    status = 'done';
                    $(self).text(`✅`);
                } else if (status == 'not_done') {
                    status = 'none';
                    $(self).text(`⬛️`);

                } else if (status == 'done') {
                    status = 'not_done';
                    $(self).text(`❌`);

                };
                $(self).attr('data-value', status);

            });
        });
    }
}