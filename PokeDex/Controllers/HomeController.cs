using System.Diagnostics;
using System.Diagnostics.Metrics;
using Microsoft.AspNetCore.Mvc;
using PokeDEx.Models;
using PokeDEx.Util;

namespace PokeDEx.Controllers
{
    public class HomeController : Controller
    {
        private static int _counter = 0;
        private readonly ILogger<HomeController> _logger;

        private readonly PokeClient pokeClient;

        public HomeController(ILogger<HomeController> logger, PokeClient pokeClient)
        {
            _logger = logger;
            this.pokeClient = pokeClient;
        }

        public async Task<IActionResult> Index()
        {
            Generations Pokemon1 = await pokeClient.FirstGenPokemon();
            return View(Pokemon1);
        }
        /// <summary>
        /// funcion que devuelve un Pokemon por nombre
        /// </summary>
        /// <param name="nombre">Recibe del body de la petición un string nombre</param>
        /// <returns>Devuelve un pokemon o nulo o un mensaje</returns>

        [HttpPost]
        public async Task<IActionResult> UnicoPokemon([FromBody] string nombre)
        {
            if (_counter == 2)
            {
                return Json(new
                {
                    message = "Ha alcanzado el numero maximo de Tarjetas"
                });

            }
            else
            {
                _counter++;
            }
            Pokemon? Pokemon1 = await pokeClient.GetPokemon(nombre);
            return Json(new
            {
                pokemon = Pokemon1
            }
            );
        }
        /// <summary>
        /// Le resta uno al contador 
        /// </summary>
        /// <returns>Devuelve un mensaje</returns>
        public IActionResult AcompletandoTarjetas()
        {
            _counter = _counter - 1;

            return Json(new
            {
                message = "Todo bien"
            }
            );
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}