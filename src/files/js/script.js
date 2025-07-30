 let currentStep = 1;
        const steps = ['step1', 'step2', 'step3', 'step4'];
        let servicoEscolhido = '';
        let tipoTattooEscolhido = '';
        let saibaMaisEscolhido = '';
        let iti;

        function showStep(id) {
            steps.forEach(s => {
                document.getElementById(s)?.classList.add('hidden');
            });
            document.getElementById(id)?.classList.remove('hidden');
        }

        function nextStep(id) {
            if (id === 'step4') showServiceDetail();
            showStep(id);
        }

        function voltarDoStep2() {
            showStep('step1');
        }

        function voltarDoStep3() {
            showStep('step2');
        }

        function voltarDoStep4() {
            if (servicoEscolhido === 'piercing') {
                showStep('step2');
            } else {
                showStep('step3');
            }
        }

        function showServiceDetail() {
            document.getElementById('nova-tattoo-detalhes')?.classList.add('hidden');
            document.getElementById('cobertura-detalhes')?.classList.add('hidden');
            document.getElementById('tattoo-indolor-detalhes')?.classList.add('hidden');
            document.getElementById('piercing-detalhes')?.classList.add('hidden');

            if (servicoEscolhido === 'piercing') {
                document.getElementById('piercing-detalhes')?.classList.remove('hidden');
            } else {
                if (tipoTattooEscolhido === 'novaTattoo') {
                    document.getElementById('nova-tattoo-detalhes')?.classList.remove('hidden');
                } else if (tipoTattooEscolhido === 'cobertura') {
                    document.getElementById('cobertura-detalhes')?.classList.remove('hidden');
                } else if (tipoTattooEscolhido === 'tattooIndolor') {
                    document.getElementById('tattoo-indolor-detalhes')?.classList.remove('hidden');
                }
            }
        }

        function abrirModal(contentId) {
            const contentMap = {
                'SaibaMaisNovaTattoo': 'modal-conteudo-nova-tattoo',
                'SaibaMaisCobertura': 'modal-conteudo-cobertura',
                'SaibaMaisTattooIndolor': 'modal-conteudo-indolor',
                'SaibaMaisPiercing': 'modal-conteudo-piercing'
            };
            document.querySelectorAll('.modal-conteudo').forEach(el => el.classList.add('hidden'));
            const targetId = contentMap[contentId];
            if (targetId) {
                document.getElementById(targetId)?.classList.remove('hidden');
                document.getElementById('modalSaibaMais')?.classList.remove('hidden');
            }
        }

        function fecharModal() {
            document.getElementById('modalSaibaMais')?.classList.add('hidden');
        }

        function validarStep1() {
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!nome || nome.length < 3) {
                alert('Por favor, insira um nome válido.');
                return false;
            }
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return false;
            }
            if (!iti.isValidNumber()) {
                alert('Por favor, insira um número de telefone válido.');
                return false;
            }
            return true;
        }

        function handleStep1() {
            if (validarStep1()) {
                const nomeCompleto = document.getElementById('nome').value.trim();
                const primeiroNome = nomeCompleto.split(' ')[0] || '';
                document.getElementById('PrimeiroNomeDoUsuario').textContent = primeiroNome;
                document.getElementById('step1').classList.add('hidden');
                document.getElementById('step2').classList.remove('hidden');
            }
        }

        function aplicarMascaraTelefone(input) {
    input.addEventListener('input', function(e) {
        let v = input.value.replace(/\D/g, "");
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length > 0) v = "(" + v;
        if (v.length > 3) v = v.slice(0, 3) + ") " + v.slice(3);
        if (v.length > 4) v = v.slice(0, 6) + " " + v.slice(6);
        if (v.length > 10) v = v.slice(0, 11) + "-" + v.slice(11);
        input.value = v;
    });
}

        document.addEventListener('DOMContentLoaded', () => {
            const telefoneInput = document.getElementById('telefone');
            iti = window.intlTelInput(telefoneInput, {
                initialCountry: "br",
                nationalMode: true,
                separateDialCode: true,
                formatOnDisplay: true,
                autoHideDialCode: false,
                utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js"
            });
               aplicarMascaraTelefone(telefoneInput);

            showStep('step1');

            document.querySelectorAll('input[name="servico"]').forEach(input => {
                input.closest('label')?.addEventListener('click', () => {
                    setTimeout(() => {
                        if (input.checked) {
                            servicoEscolhido = input.value;
                            if (servicoEscolhido === 'tattoo') {
                                nextStep('step3');
                            } else {
                                nextStep('step4');
                            }
                        }
                    }, 0);
                });
            });

            document.querySelectorAll('input[name="opcaoServico"]').forEach(input => {
                input.closest('label')?.addEventListener('click', () => {
                    setTimeout(() => {
                        if (input.checked) {
                            tipoTattooEscolhido = input.value;
                            nextStep('step4');
                        }
                    }, 0);
                });
            });

            document.querySelectorAll('input[name="saibaMais"]').forEach(input => {
                input.closest('label')?.addEventListener('click', () => {
                    setTimeout(() => {
                        if (input.checked) {
                            saibaMaisEscolhido = input.value;
                            abrirModal(saibaMaisEscolhido);
                        }
                    }, 0);
                });
            });
        });