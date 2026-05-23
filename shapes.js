class ShapeManager {
    constructor(mapSize, count) {
        this.mapSize = mapSize;
        this.count = count;
        this.shapes = [];
        this.types = [
            { name: 'square', color: '#ffe46b', border: '#b29f4a', sides: 4, xp: 100, hp: 10, size: 20 },
            { name: 'triangle', color: '#fc7677', border: '#b05253', sides: 3, xp: 250, hp: 25, size: 22 },
            { name: 'pentagon', color: '#768dfc', border: '#5262b0', sides: 5, xp: 1000, hp: 100, size: 35 }
        ];
    }

    spawn() {
        while (this.shapes.length < this.count) {
            const rand = Math.random();
            const type = rand < 0.05 ? this.types[2] : (rand < 0.25 ? this.types[1] : this.types[0]);
            this.shapes.push({
                ...type,
                x: (Math.random() - 0.5) * this.mapSize,
                y: (Math.random() - 0.5) * this.mapSize,
                rot: Math.random() * Math.PI * 2,
                rotVel: (Math.random() - 0.5) * 0.03,
                hp: type.hp
            });
        }
    }

    drawPolygon(ctx, x, y, radius, sides, rotation) {
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = rotation + (i * 2 * Math.PI / sides);
            ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    updateAndDraw(ctx, bullets, onScoreGain) {
        this.spawn();

        for (let i = this.shapes.length - 1; i >= 0; i--) {
            const s = this.shapes[i];
            s.rot += s.rotVel;

            // Draw shape
            ctx.fillStyle = s.color;
            ctx.strokeStyle = s.border;
            ctx.lineWidth = 4;
            ctx.lineJoin = "round";
            this.drawPolygon(ctx, s.x, s.y, s.size, s.sides, s.rot);

            // Check bullet collisions
            for (let j = bullets.length - 1; j >= 0; j--) {
                const b = bullets[j];
                const dist = Math.hypot(b.x - s.x, b.y - s.y);

                if (dist < s.size + b.radius) {
                    s.hp -= 5; // Bullet damage
                    bullets.splice(j, 1); // Remove bullet

                    if (s.hp <= 0) {
                        onScoreGain(s.xp);
                        this.shapes.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
}
