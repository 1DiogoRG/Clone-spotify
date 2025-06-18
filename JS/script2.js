const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('menuToggle');

    if (
        sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target)
    ) {
        sidebar.classList.remove('active');
    }
});
