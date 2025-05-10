document.addEventListener('DOMContentLoaded', () => {
  let reportesPorAlerta = {};
  let tipoAlertaActual = "";

  const alertaContainer = document.getElementById("alertas");

  document.querySelectorAll('.alert-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tipoAlertaActual = btn.dataset.type;
      document.getElementById('formConfirmar').reset();
      const modal = new bootstrap.Modal(document.getElementById('modalReporte'));
      modal.show();
    });
  });

  document.getElementById('formConfirmar').addEventListener('submit', e => {
    e.preventDefault();
    const tipo = tipoAlertaActual;

    // Inicializar contadores si no existen
    if (!reportesPorAlerta[tipo]) reportesPorAlerta[tipo] = 0;
    reportesPorAlerta[tipo]++;

    // Crear alerta si aún no existe
    let alertaElemento = document.getElementById(`alerta-${tipo}`);
    if (!alertaElemento) {
      alertaElemento = document.createElement("div");
      alertaElemento.id = `alerta-${tipo}`;
      alertaElemento.className = "alerta-iniciada mt-5";
      alertaElemento.innerHTML = `
        <div id="fondo-cinta"><h5 class="text-danger fw-bold alert-title">⚠️ Alerta Iniciada - ${tipo} ⚠️</h5>
        <div class="progress my-3" style="height: 25px;">
          <div class="progress-bar bg-danger fw-bold" id="barra-${tipo}" style="width: 1%;">1 de 100</div>
        </div>
        <div class="d-flex justify-content-center gap-3 mb-4" id="datos-alertas">
          <span class="badge bg-danger"><i class="bi bi-exclamation-triangle"></i> Tipo: ${tipo}</span>
          <span class="badge bg-warning text-dark"><i class="bi bi-flag"></i> Prioridad: Alta</span>
          <span class="badge bg-primary"><i class="bi bi-people-fill"></i> Reportes: <span id="num-${tipo}">1</span></span>
        </div></div>
      `;
      alertaContainer.appendChild(alertaElemento);
    }

    // Actualizar progreso
    const reportes = reportesPorAlerta[tipo];
    const barra = document.getElementById(`barra-${tipo}`);
    const num = document.getElementById(`num-${tipo}`);

    // Cambiar el contenido de texto de la barra progresiva para que esté dentro de un span con un id
    if (reportes === 1) {
      barra.style.width = "1%";
      barra.innerHTML = '<span id="texto-barra-p1">1 de 100</span>';
      num.textContent = "1";
    } else if (reportes === 2) {
      barra.style.width = "100%";
      barra.innerHTML = '<span id="texto-barra-p2">100 de 100</span>';
      num.textContent = "100";

      // Mostrar modal de solicitud enviada
      const modalTexto = document.getElementById("modalTexto");
      modalTexto.textContent = "Se ha alcanzado el número necesario de reportes, y se ha enviado una solicitud de aprobación al administrador para autorizar el envío de la alerta a la ciudadanía sobre la amenaza. Si no se recibe respuesta dentro del tiempo estipulado, la alerta será enviada automáticamente a todos los ciudadanos vía SMS.";
      const modal = new bootstrap.Modal(document.getElementById('modalInfo'));
      modal.show();
    }

    // Cerrar modal de confirmación
    bootstrap.Modal.getInstance(document.getElementById('modalReporte')).hide();
  });

  // Sección de registro de numero telefonico
  document.getElementById("formRegistro").addEventListener("submit", e => {
    e.preventDefault();
    const telefono = document.getElementById("telefono").value.trim();

    if (/^3\d{9}$/.test(telefono)) {
      const alerta = document.getElementById("alertaExito");
      alerta.classList.remove("d-none");
      alerta.classList.add("show");
      e.target.reset();
    }
  });

  // Scción historial de alertas
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el);
  });

  // Panel de Administración ---------------------- >

});
