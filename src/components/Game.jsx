/* eslint-disable default-case */
import React, { useRef, useEffect } from "react";

export default function Game() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        class Player {
            constructor({position, velocity}) {
                this.position = position;
                this.velocity = velocity;
                this.height = 50;
                this.horizontal = "";
                this.vertical = "";
            }

            draw() {
                context.fillStyle = 'blue';
                context.fillRect(this.position.x, this.position.y, 50, this.height);
            }

            update() {
                this.draw();
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
            }
        }

        class Projectile {
            constructor(x, y, velocity) {
                this.x = x;
                this.y = y;
                this.velocity = velocity;
            }

            draw() {
                context.fillStyle = 'red';
                context.fillRect(this.x, this.y, 5, 5);
            }

            update() {
                this.x = this.x + this.velocity.x;
                this.y = this.y + this.velocity.y;
                this.draw();
            }
        }

        const player = new Player({
            position: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 0,
                y: 0
            },
        });

        const projectiles = [];

        console.log(player);

        const keys = {
            w: {
                pressed: false
            },
            a: {
                pressed: false
            },
            s: {
                pressed: false
            },
            d: {
                pressed: false
            }
        }

        function animate() {
            window.requestAnimationFrame(animate)
            context.clearRect(0, 0, 1024, 576);
            player.update();

            player.velocity.x = 0;
            player.velocity.y = 0;

            if (keys.w.pressed && player.vertical === 'w') {
                player.velocity.y = -1;
            } else if (keys.s.pressed && player.vertical === 's'){
                player.velocity.y = 1;
            }
            if (keys.a.pressed && player.horizontal === 'a'){
                player.velocity.x = -1;
            } else if (keys.d.pressed && player.horizontal === 'd'){
                player.velocity.x = 1;
            }

            projectiles.forEach((projectile) => {
                projectile.update();
            });
        }
        animate();

        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'w':
                    keys.w.pressed = true;
                    player.vertical = 'w';
                    console.log("w");
                    break;
                case 'a':
                    keys.a.pressed = true;
                    player.horizontal = 'a';
                    break;
                case 's':
                    keys.s.pressed = true;
                    player.vertical = 's';
                    break;
                case 'd':
                    keys.d.pressed = true;
                    player.horizontal = 'd';
                    break;
            }
        });

        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'w':
                    keys.w.pressed = false;
                    break;
                case 'a':
                    keys.a.pressed = false;
                    break;
                case 's':
                    keys.s.pressed = false;
                    break;
                case 'd':
                    keys.d.pressed = false;
                    break;
            }
        });

        window.addEventListener('click', (event) => {
            const angle = Math.atan2(event.clientY - player.position.y, event.clientX - player.position.x);
            const velocity = {x: Math.cos(angle), y: Math.sin(angle)};

            projectiles.push(new Projectile(player.position.x + 25, player.position.y + 25, velocity));
        });
    }, [])

    return (
        <canvas ref={canvasRef} id="canvas" width="1024px" height="576px"></canvas>
    );
}