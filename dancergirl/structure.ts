import {StructureBuilder} from 'sanity/structure'
import {
  DocumentTextIcon,
  UserIcon,
  TagIcon,
  StarIcon,
  TrendUpwardIcon as TrendingUpIcon,
  PlayIcon,
  CalendarIcon,
  BulbOutlineIcon,
  SparklesIcon,
} from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('DancerGirl Content Studio')
    .items([
      // STORIES
      S.listItem()
        .title('Stories & Articles')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Stories & Articles')
            .items([
              S.listItem()
                .title('All Stories')
                .icon(DocumentTextIcon)
                .child(S.documentTypeList('article').title('All Stories')),
              S.listItem()
                .title('Featured Stories')
                .icon(StarIcon)
                .child(
                  S.documentList()
                    .title('Featured Stories')
                    .filter('_type == "article" && featured == true')
                ),
              S.listItem()
                .title('Featured Story (Homepage)')
                .icon(StarIcon)
                .child(S.documentTypeList('featuredStory').title('Featured Story')),
              S.divider(),
              S.listItem()
                .title('Choreographers Corner')
                .icon(SparklesIcon)
                .child(
                  S.documentList()
                    .title('Choreographers Corner Articles')
                    .filter('_type == "article" && "choreographers-corner" in categories[]->slug.current')
                ),
              S.listItem()
                .title('Dancer: Speak Up')
                .icon(BulbOutlineIcon)
                .child(
                  S.documentList()
                    .title('Dancer: Speak Up Articles')
                    .filter('_type == "article" && "dancer-speak-up" in categories[]->slug.current')
                ),
            ])
        ),

      // PEOPLE
      S.listItem()
        .title('People & Profiles')
        .icon(UserIcon)
        .child(
          S.list()
            .title('People & Profiles')
            .items([
              S.listItem()
                .title('Dancers')
                .icon(UserIcon)
                .child(S.documentTypeList('artist').title('All Dancers')),
              S.listItem()
                .title('Choreographers')
                .icon(SparklesIcon)
                .child(S.documentTypeList('choreographer').title('All Choreographers')),
              S.listItem()
                .title('Dancer of the Month')
                .icon(StarIcon)
                .child(S.documentTypeList('dancerOfTheMonth').title('Dancer of the Month Archive')),
              S.divider(),
              S.listItem()
                .title('Authors')
                .icon(UserIcon)
                .child(S.documentTypeList('author').title('All Authors')),
              S.listItem()
                .title('Founder')
                .icon(UserIcon)
                .child(S.documentTypeList('founder').title('Founder Profile')),
            ])
        ),

      // EVENTS
      S.listItem()
        .title('Events')
        .icon(CalendarIcon)
        .child(S.documentTypeList('event').title('All Events')),

      // EDITOR LETTERS
      S.listItem()
        .title('Editor Letters')
        .icon(DocumentTextIcon)
        .child(S.documentTypeList('editorLetter').title('All Editor Letters')),

      S.divider(),

      // MEDIA
      S.listItem()
        .title('Media')
        .icon(PlayIcon)
        .child(
          S.list()
            .title('Media')
            .items([
              S.listItem()
                .title('Videos')
                .icon(PlayIcon)
                .child(S.documentTypeList('video').title('All Videos')),
              S.listItem()
                .title('Playlists')
                .icon(PlayIcon)
                .child(S.documentTypeList('playlist').title('All Playlists')),
            ])
        ),

      // SITE CONTENT
      S.listItem()
        .title('Site Content')
        .icon(BulbOutlineIcon)
        .child(
          S.list()
            .title('Site Content')
            .items([
              S.listItem()
                .title('Quotes')
                .icon(BulbOutlineIcon)
                .child(S.documentTypeList('quote').title('All Quotes')),
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .child(S.documentTypeList('category').title('All Categories')),
            ])
        ),

      S.divider(),

      // RECENT ACTIVITY
      S.listItem()
        .title('Recent Activity')
        .icon(TrendingUpIcon)
        .child(
          S.documentList()
            .title('Recently Updated')
            .filter('_type in ["article", "artist", "choreographer", "event", "dancerOfTheMonth", "editorLetter", "video", "playlist", "featuredStory"]')
            .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
        ),
    ])
