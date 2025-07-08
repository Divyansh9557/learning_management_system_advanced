
import { pgTable,  text,  timestamp, integer, decimal, boolean, pgEnum } from "drizzle-orm/pg-core";
import {nanoid} from "nanoid"

export const userStatus = pgEnum("status", ["active", "banned", "pending"]);
export const courseStatus = pgEnum("course_status", ["draft", "published", "pending_approval", "rejected"]);
export const difficulty = pgEnum("difficulty", ["beginner", "intermediate", "advanced"]);
export const lessonType = pgEnum("lesson_type", ["video", "pdf", "external", "quiz"]);
export const paymentStatus = pgEnum("payment_status", ["pending", "success", "failed"]);


export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
     role: text("role").default("student").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});


export const courses = pgTable("courses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  price: integer("price").default(0).notNull(),
  difficulty: difficulty("difficulty"),
  category: text("category"),
  instructorId: text("instructor_id").references(() => user.id),
  status: courseStatus("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});



export const lessons = pgTable("lessons", {
  id: text("id").primaryKey().$defaultFn(()=> nanoid() ),
  courseId: text("course_id").references(() => courses.id,{onDelete:"cascade"}),
  title: text("title").notNull(),
  videoUrl: text("video_url"),
  duration: integer("duration"),
  type: lessonType("type").default("video")
});

export const quizzes = pgTable("quizzes", {
  id: text("id").primaryKey().$defaultFn(()=> nanoid() ),
  creater: text("creater").references(() => user.id,{onDelete:"cascade"}),
  timeLimit:integer("time_limit").default(10),
  questions:text("questions"),
  title: text("title"),
  description: text("description")
});

export const enrollments = pgTable("enrollments", {
  id: text("id").primaryKey().$defaultFn(()=> nanoid() ),
  userId: text("user_id").references(() => user.id,{onDelete:"cascade"}),
  courseId: text("course_id").references(() => courses.id,{onDelete:"cascade"}),
  progress: decimal("progress").default("0"),
  completed: boolean("completed").default(false),
  certificateUrl: text("certificate_url"),
  enrolledAt: timestamp("enrolled_at").defaultNow()
});
export const payments = pgTable("payments", {
  id: text("id").primaryKey().$defaultFn(()=> nanoid() ),
  userId: text("user_id").references(() => user.id,{onDelete:"cascade"}),
  courseId: text("course_id").references(() => courses.id,{onDelete:"cascade"}),
  paymentId: text("payment_id").notNull(),
  price:text("price").notNull(),
  status: paymentStatus("payment_status").default("pending"),
  createdAt: timestamp("created_at").defaultNow()
});

export const progressTracker = pgTable("progress_tracker", {
  id: text("id").primaryKey().$defaultFn(()=> nanoid() ),
  userId: text("user_id").references(() => user.id,{onDelete:"cascade"}),
  lessonId: text("lesson_id").references(() => lessons.id,{onDelete:"cascade"}),
  status: text("status").default("in_progress"),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const certificates = pgTable("certificates", {
  id: text("id").primaryKey().$defaultFn(()=> nanoid() ),
  userId: text("user_id").references(() => user.id,{onDelete:"cascade"}),
  courseId: text("course_id").references(() => courses.id),
  certificateUrl: text("certificate_url"),
  issuedAt: timestamp("issued_at").defaultNow()
});

export const quizzesAttempted = pgTable("attempted_quizzes", {
  id: text("id").primaryKey().$defaultFn(()=> nanoid() ),
  userId: text("user").references(() => user.id,{onDelete:"cascade"}),
  quizId: text("quiz_id").references(() => quizzes.id,{onDelete:"cascade"}),
});